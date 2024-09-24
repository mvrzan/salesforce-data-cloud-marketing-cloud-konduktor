import { Flex } from "@twilio-paste/core/flex";
import { Text } from "@twilio-paste/core/text";
import { Stack } from "@twilio-paste/core/stack";
import { Button } from "@twilio-paste/core/button";
import { Heading } from "@twilio-paste/core/heading";

import konduktorLogo from "../assets/konduktor-logo.png";
import { Box } from "@twilio-paste/core/box";

const Welcome = () => {
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
              Welcome to Konduktor!
            </Heading>
            <Text textAlign="center">Your AI... Just kidding, there is no AI here.</Text>
            <Flex hAlignContent="center">
              <img src={konduktorLogo} alt="Konduktor Logo" height="200px" />
            </Flex>
          </Stack>
          <Flex vertical vAlignContent="center" hAlignContent="center" marginBottom="space80">
            <Heading as="h2" variant="heading20">
              What is Konduktor?
            </Heading>
            <Text textAlign="center" paddingX="space200">
              Konduktor is a simple application that helps you fetch your Segments from Data Cloud, find associated Data
              Extensions within Marketing cloud, and send a User-Initiated email.{" "}
            </Text>
            {/* <img src={konduktorLogo} alt="Konduktor Logo" /> */}
          </Flex>
          <Stack orientation="vertical" spacing="space90">
            <Stack orientation="horizontal" spacing="space60">
              <Button variant="primary">Documentation</Button>
              <Button variant="primary">Demo</Button>
              <Button variant="primary">Architecture</Button>
            </Stack>
            <Flex hAlignContent="center">
              <Button variant="destructive">Start Kondukting</Button>
            </Flex>
          </Stack>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Welcome;
