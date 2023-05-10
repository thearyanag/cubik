import {
  Box,
  Button,
  Center,
  Container,
  HStack,
  Skeleton,
  SkeletonText,
  VStack,
} from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { AiTwotoneCalendar } from 'react-icons/ai';
import { BiPlus } from 'react-icons/bi';
import { formatDate } from '~/utils/firnatDate';
import { formatNumberWithK } from '~/utils/formatWithK';
import { trpc } from '~/utils/trpc';

const Round = () => {
  const {
    data: rounds,
    isLoading,
    isError,
    error,
  } = trpc.round.findActive.useQuery();
  const { data } = useSession();
  console.log('rounds - ', rounds, data);
  return (
    <Container maxW="7xl" py="64px">
      <HStack w="full" align="start" justify="space-between" pb="32px">
        <VStack align={'start'} gap="8px">
          <Box
            color="neutral.11"
            as="p"
            textStyle={{ base: 'headline1', md: 'display3' }}
          >
            Grants Help the ecosystem grow.
          </Box>{' '}
          <Box
            color="neutral.9"
            as="p"
            textStyle={{ base: 'body3', md: 'body3' }}
          >
            Apply for a grant or contribute in a grants round
          </Box>
        </VStack>
        <Button variant="close_modal" rightIcon={<BiPlus />}>
          <Link href="/grants/new-grant">Create Grant Round</Link>
        </Button>
      </HStack>
      <VStack py="64px" w="full" align="start" spacing="32px">
        <Box
          color="neutral.11"
          as="p"
          textStyle={{ base: 'title3', md: 'title2' }}
        >
          Grants Rounds
        </Box>{' '}
        {isLoading ? (
          [0, 1, 2].map((index) => (
            <HStack
              key={index}
              border="2px solid"
              borderColor="#ffffff10"
              backgroundColor="#000000"
              p={{ base: '16px', md: '32px' }}
              w="full"
              gap="24px"
              rounded="16px"
              justify={'space-between'}
              align="center"
              direction={{ base: 'column', md: 'row' }}
            >
              <VStack align={'start'} width="full" spacing="24px">
                <VStack align="start" width="full" spacing="12px">
                  <Skeleton height="2rem" width="10rem" />
                  <SkeletonText
                    noOfLines={2}
                    skeletonHeight={2}
                    width={'full'}
                  />
                </VStack>
                <Skeleton py="24px" height="1rem" width="18rem" />
              </VStack>{' '}
            </HStack>
          ))
        ) : isError ? (
          <Container maxW="7xl">
            <Center
              gap="16px"
              flexDir={'column'}
              maxW="4xl"
              mx="auto"
              py="5rem"
            >
              <Box
                as="p"
                textStyle={'title1'}
                color="white"
                textTransform={'capitalize'}
              >
                {error.message}
              </Box>
            </Center>
          </Container>
        ) : (
          rounds?.map((round) => (
            <HStack
              key={round.id}
              border={'2px solid'}
              borderColor="#ffffff10"
              backgroundColor="#000000"
              p={{ base: '16px', md: '32px' }}
              w="full"
              gap="24px"
              rounded="20px"
              justify={'space-between'}
              align="center"
              direction={{ base: 'column', md: 'row' }}
              position="relative"
              overflow={'hidden'}
              _after={{
                content: '""',
                zIndex: '1',
                position: 'absolute',
                bottom: '50%',
                left: '0%',
                transform: 'translate(0%, -50%)',
                width: '8rem',
                height: '8rem',
                backgroundColor: '#31F579',
                filter: 'blur(100px)',
                borderRadius: 'full',
              }}
            >
              <VStack align={'start'} spacing="24px">
                <VStack align="start" w="full" spacing="12px">
                  <HStack align="start">
                    <Box
                      color="neutral.11"
                      as="p"
                      textStyle={{ base: 'title2', md: 'title1' }}
                    >
                      {round.roundName}
                      {''} Round
                    </Box>
                    <HStack
                      rounded="full"
                      backgroundColor="#1D1F1E"
                      p="8px 12px"
                      spacing="8px"
                      mx={1}
                    >
                      <AiTwotoneCalendar color="white" size={18} />
                      <Box
                        as="p"
                        whiteSpace="pre"
                        color="neutral.11"
                        textStyle={{ base: 'body6', md: 'body5' }}
                      >
                        {formatDate(round.startTime)}
                      </Box>
                    </HStack>
                  </HStack>
                  <Box as="p" textStyle={'body4'} color="neutral.9">
                    {round.short_description}
                  </Box>
                </VStack>
                <HStack
                  bg="#ffffff08"
                  rounded="8px"
                  shadow="0px 4px 24px rgba(0, 0, 0, 0.08)"
                  outline="1px solid #ffffff16"
                  p={{ base: '0.6rem 1.2rem', md: '0.8rem 1.5rem' }}
                >
                  <Box
                    color="#B4B0B2"
                    textTransform={'uppercase'}
                    as="p"
                    textStyle={{ base: 'body5', md: 'overline3' }}
                  >
                    Matching Pool
                  </Box>
                  <Box as="p" textStyle={{ base: 'body3', md: 'title4' }}>
                    : {formatNumberWithK(round.matchedPool)} USDC
                  </Box>
                </HStack>
              </VStack>
              <Center h="full">
                {data?.user.id === round.userId ? (
                  <Button variant="close_modal">
                    <Link href={`/grants/admin/${round.id}`}>Manage Grant</Link>
                  </Button>
                ) : (
                  <Button variant="apply_for_grant">Apply for Grant</Button>
                )}
              </Center>
            </HStack>
          ))
        )}
      </VStack>
    </Container>
  );
};

export default Round;