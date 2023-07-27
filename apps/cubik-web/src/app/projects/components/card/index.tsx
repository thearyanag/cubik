"use client";
import {
  LinkBox,
  Card,
  Center,
  HStack,
  Box,
  VStack,
  Stack,
  SlideFade,
  Avatar,
  Button,
  Wrap,
  useMediaQuery,
} from "@/utils/chakra";
import Link from "next/link";
import { ProjectJoinRoundStatus } from "@prisma/client";
import { Project } from "../index";
import Contributors from "./contributors";
import CustomTag from "@/app/components/common/tags/CustomTag";
import { useState } from "react";
// import { isPast } from "date-fns";

const ProjectCard = ({
  id,
  projectId,
  owner: { username },
  status,
  name,
  logo,
  description,
  amountRaised,
  contributors,
  industry,
}: Project) => {
  const [isLargerThan767] = useMediaQuery("(min-width: 767px)");
  const [isHovered, setIsHovered] = useState<boolean>(true);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <LinkBox
      as={Link}
      href={`/${username}/${projectId}/${
        status === ProjectJoinRoundStatus.APPROVED && id
      }`}
      w="full"
      maxW={{
        base: "92vw",
        sm: "87vw",
        md: "44vw",
        lg: "29.5vw",
        xl: "25.5rem",
      }}
      position={"relative"}
    >
      <Card
        role="group"
        //  border={addedToList ? '2px solid #659C95' : '2px solid transparent'}
        border="none"
        p="0"
        h={{ base: "fit-content", md: "23rem" }}
        cursor="pointer"
        w="100%"
        maxW={{
          base: "full",
          sm: "full",
          md: "44vw",
          lg: "29.5vw",
          xl: "25.5rem",
        }}
        gap="0"
        background={"#0C0D0D"}
        _hover={{
          border: "none",
          background: "neutral.3",
          //  borderColor: `surface.${colorScheme}.3`,
        }}
        // _active={{
        //   // border: '2px solid',
        //   background: 'neutral.3',
        //   borderColor: `surface.${colorScheme}.3`,
        // }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* card outline */}
        {/* {addedToList && (
          <Center
            position={'absolute'}
            w="1.6rem"
            h="1.6rem"
            rounded="full"
            bg="#659C95"
            right="-0.6rem"
            top="-0.6rem"
          >
            <HiCheck size={16} color="#001F1B" />
          </Center>
        )} */}
        {/* card Header */}
        {/* {isPast(startTime) && !isPast(endTime) && (
          // if project is participating in a round then make it visible else don't show it
          <Center
            display={status === ProjectJoinRoundStatus.APPROVED ? 'flex' : 'none'}
            w="full"
            bg={`surface.${colorScheme}.3`}
            borderTopRadius={'16px'}
          >
            <HStack
              w="full"
              gap="8px"
              borderColor="red"
              borderBottom={'red'}
              padding={'12px 24px'}
              borderTopRadius={'16px'}
              justifyContent="space-between"
            >
              <Box
                w="full"
                as="p"
                noOfLines={1}
                whiteSpace={'nowrap'}
                color={`surface.${colorScheme}.1`}
                textStyle={'overline4'}
                textTransform="uppercase"
                letterSpacing={'0.2em'}
                fontSize={{ base: '8px', md: '10px' }}
              >
                Participating In
              </Box>
              <Box
                as="p"
                w="fit-content"
                whiteSpace={'nowrap'}
                textStyle={{ base: 'title6', md: 'title5' }}
                color={`surface.${colorScheme}.1`}
              >
                {roundName}
              </Box>
            </HStack>
          </Center>
        )} */}
        {/* cards footer */}
        <VStack
          w="full"
          alignItems={"start"}
          justifyContent="space-between"
          h="full"
        >
          <VStack
            p={{ base: "14px", md: "24px" }}
            gap={{ base: "12px", md: "16px" }}
            w="full"
            alignItems={"start"}
          >
            <Stack
              spacing={{ base: "14px", md: "16px" }}
              direction={{ base: "row", md: "column" }}
              align={{ base: "center", md: "start" }}
              w="full"
              justifyContent={"space-between"}
            >
              <Avatar
                src={logo}
                name={name}
                borderRadius={"8px"}
                width={{ base: "3.4rem", md: "4rem" }}
                height={{ base: "3.4rem", md: "4rem" }}
              />
              <VStack spacing="4px" w="full">
                <HStack
                  w="full"
                  align="start"
                  gap="14px"
                  justify="space-between"
                >
                  <Box
                    as="p"
                    color="neutral.11"
                    textStyle={{ base: "title4", md: "title3" }}
                  >
                    {name}
                  </Box>
                  <Box
                    as="p"
                    color="#A8F0E6"
                    textStyle={{ base: "title4", md: "title3" }}
                  >
                    ${amountRaised}
                  </Box>
                </HStack>
                <HStack
                  w="full"
                  align="start"
                  gap="14px"
                  justify="space-between"
                >
                  <Center>
                    <Box
                      noOfLines={1}
                      textAlign="start"
                      as="p"
                      whiteSpace={"nowrap"}
                      textStyle={{ base: "title6", md: "title5" }}
                      color="neutral.7"
                      textTransform="lowercase"
                      w="full"
                    >
                      by @{username}
                    </Box>
                  </Center>
                  <Box
                    color="neutral.8"
                    as="p"
                    textStyle={{ base: "body6", md: "body5" }}
                  >
                    Est. Match
                  </Box>
                </HStack>
              </VStack>{" "}
            </Stack>
            <Box
              color="neutral.9"
              as="p"
              textStyle={{ base: "body5", md: "body4" }}
              sx={{
                noOfLines: { base: "4", md: "3" },
              }}
              alignContent="start"
              alignItems={"start"}
              textAlign={"start"}
            >
              {description}
            </Box>
          </VStack>

          <VStack
            marginTop={"0px !important"}
            p="8px 24px 24px 24px"
            w="full"
            position={"relative"}
          >
            <HStack
              display={isLargerThan767 && false ? "none" : "flex"}
              overflowX="hidden"
              w="full"
              justify="space-between"
            >
              <Box
                overflow="hidden"
                w="full"
                flex="4"
                minWidth="0"
                position="relative"
                _after={{
                  content: '""',
                  position: "absolute",
                  top: "45%",
                  right: "0%",
                  transform: "translateY(-50%)",
                  height: "2.2rem",
                  width: "3rem",
                  background:
                    "linear-gradient(90deg, #0C0D0D00 0%, #0C0D0D 80%)",
                }}
              >
                <HStack
                  overflow="clip"
                  w="200%"
                  mt="auto"
                  justify="start"
                  whiteSpace="nowrap" // Set whiteSpace to nowrap
                >
                  {industry.map((tag: any, key: any) => {
                    return (
                      <CustomTag color={tag.label} key={key}>
                        {tag.label}
                      </CustomTag>
                    );
                  })}
                </HStack>
              </Box>
              <Contributors {...contributors} />
            </HStack>
            {isLargerThan767 && (
              <SlideFade in={false} offsetY="0px" reverse>
                <HStack
                  zIndex={"9"}
                  w="full"
                  justifyContent="start"
                  position="absolute"
                  left="0"
                  p="8px 24px 24px 24px"
                  bottom="0px"
                  backgroundColor={isHovered ? "neutral.3" : "#0C0D0D"}
                  borderRadius="36px"
                  justify={"space-between"}
                >
                  <Button
                    as={Link}
                    // href={`/${ownerUsername}/${projectId}${
                    //   status === ProjectJoinRoundStatus.APPROVED
                    //     ? `/${joinRoundId}`
                    //     : ``
                    // }`}
                    href={"/"}
                    background={"#1D1F1E"}
                    color="white"
                    fontWeight={"700"}
                    borderColor="transparent"
                    outline="none"
                    //  w="calc(100% - 2.2rem)"
                    w="calc(100% )"
                    variant="connect_wallet"
                  >
                    View Details
                  </Button>
                  {/* <IconButton
                  background={'#1D1F1E'}
                  color="white"
                  fontWeight={'700'}
                  borderColor="transparent"
                  outline="none"
                  onClick={handleAddOrRemoveProject}
                  aria-label="link"
                  variant="connect_wallet"
                  icon={
                    addedToList ? <MdRemove size={26} /> : <BsPlus size={26} />
                  }
                /> */}
                </HStack>
              </SlideFade>
            )}
          </VStack>

          {/* <Contributors {...contributors} /> */}
        </VStack>
      </Card>
    </LinkBox>
  );
};

export default ProjectCard;