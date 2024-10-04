import { Box } from "@twilio-paste/core/box";
import { Flex } from "@twilio-paste/core/flex";
import { Text } from "@twilio-paste/core/text";
import { Stack } from "@twilio-paste/core/stack";
import { Button } from "@twilio-paste/core/button";
import { Heading } from "@twilio-paste/core/heading";

import { useNavigate } from "react-router-dom";
import konduktorLogo from "../assets/konduktor-logo.png";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <Flex vAlignContent="center" hAlignContent="center" height="100vh">
      <Box
        height="60%"
        width="100vh"
        display="flex"
        justifyContent="center"
        alignContent="center"
        margin="auto"
        boxShadow="shadowCard"
        borderRadius="borderRadius40"
        backgroundColor="colorBackgroundDecorative20Weakest"
      >
        <Flex vertical vAlignContent="center" hAlignContent="center">
          <Stack orientation="vertical" spacing="space60">
            <Heading as="h1" variant="heading10">
              Welcome to{" "}
              <Text as="span" fontSize="fontSize90" color="colorTextDecorative40" fontWeight="fontWeightBold">
                Konduktor!
              </Text>
            </Heading>
            <Text textAlign="center" color="colorTextLinkStronger">
              Your AI 🤖 ... Just kidding, there is no AI here.
            </Text>
            <Flex hAlignContent="center">
              <img src={konduktorLogo} alt="Konduktor Logo" height="200px" />
            </Flex>
          </Stack>
          <Flex vertical vAlignContent="center" hAlignContent="center" marginBottom="space80">
            <Heading as="h2" variant="heading20">
              What is{" "}
              <Text as="span" fontSize="fontSize70" color="colorTextDecorative40" fontWeight="fontWeightBold">
                {" "}
                Konduktor?
              </Text>
            </Heading>
            <Text textAlign="center" paddingX="space200" color="colorTextLinkStronger">
              Konduktor is a simple application that helps you fetch your Segments from{" "}
              <Text as="span" color="colorTextDecorative20" fontWeight="fontWeightBold">
                Data Cloud{" "}
              </Text>
              , find associated{" "}
              <Text as="span" color="colorTextDecorative50" fontWeight="fontWeightBold">
                Data Extensions
              </Text>{" "}
              within{" "}
              <Text as="span" color="colorTextIconBusy" fontWeight="fontWeightBold">
                Marketing Cloud
              </Text>
              , and send a{" "}
              <Text as="span" color="colorTextDecorative50" fontWeight="fontWeightBold">
                User-Initiated email
              </Text>
              .{" "}
            </Text>
          </Flex>
          <Stack orientation="vertical" spacing="space90">
            <Stack orientation="horizontal" spacing="space60">
              <Button
                as="a"
                variant="primary"
                href="https://github.com/mvrzan/salesforce-data-cloud-marketing-cloud-konduktor"
              >
                Documentation
              </Button>
              <Button variant="primary">Demo</Button>
              <Button variant="primary">Architecture</Button>
            </Stack>
            <Flex hAlignContent="center">
              <Button
                variant="reset"
                as="button"
                color="white"
                fontWeight="fontWeightBold"
                backgroundColor="colorBackgroundPrimaryStronger"
                borderRadius="4px"
                paddingX="space40"
                paddingY="space40"
                _hover={{
                  backgroundColor: "white",
                  color: "rgb(18, 28, 45)",
                  boxShadow: "rgb(2, 99, 224) 0px 0px 0px 1px",
                }}
                onClick={() => {
                  navigate("/operations");
                }}
              >
                Start Kondukting
              </Button>
            </Flex>
          </Stack>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Welcome;
