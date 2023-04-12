import { useQuery, UseQueryResult } from 'react-query';
import { PublicKey } from '@solana/web3.js';
import { metaplexGetByOwner, NFTData } from '~/utils/metaplexGetByOwner';

// Define PromiseFulfilledResult type
type PromiseFulfilledResult<T> = {
  status: 'fulfilled';
  value: T;
};

export function useNftDataByOwner(
  publicKey: PublicKey | null
): UseQueryResult<NFTData[], Error> {
  return useQuery(
    ['nftDataByOwner', publicKey],
    () => getNftDataByOwner(publicKey),
    {
      enabled: !!publicKey,
      cacheTime: 1000 * 60 * 5,
      retry: 0, // Prevent multiple retry attempts
    }
  );
}

async function getNftDataByOwner(
  publicKey: PublicKey | null
): Promise<NFTData[]> {
  if (!publicKey) {
    throw new Error('Public key is required to fetch NFT data.');
  }

  try {
    const nftUris = await metaplexGetByOwner(publicKey);

    const promises = nftUris.map(async (item: string) => fetch(item));
    console.log('getting nfts - ', promises);

    const nftsData = await Promise.allSettled(promises);
    const fulfilledNftsData = nftsData.filter(
      (result) => result.status === 'fulfilled'
    ) as PromiseFulfilledResult<Response>[];

    const nftsDataJsonPromises = fulfilledNftsData.map(async (item) =>
      item.value.json()
    );
    const nftsDataJson = await Promise.all(nftsDataJsonPromises);

    console.log('nft data - ', nftsDataJson);
    return nftsDataJson;
  } catch (error: any) {
    throw new Error('Error fetching NFT data: ' + error.message);
  }
}