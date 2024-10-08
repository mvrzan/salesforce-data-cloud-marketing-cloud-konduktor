import { useState } from "react";

import { Flex } from "@twilio-paste/core/flex";
import { Box } from "@twilio-paste/core/box";
import { Text } from "@twilio-paste/core/text";
import { Input } from "@twilio-paste/core/input";
import { Stack } from "@twilio-paste/core/stack";
import { Tab, Tabs, TabList, TabPanel, TabPanels, useTabState } from "@twilio-paste/core/tabs";

import Segments from "./Tabs/Segments/Segments";
import konduktorLogo from "../assets/konduktor-logo.png";
import UserInitiatedEmail from "./Tabs/UserInitiated/UserInitiatedEmail";
import EmailTemplateEditor from "./Tabs/EmailTemplate/EmailTemplateEditor";

const TabsComponent = () => {
  const [emailName, setEmailName] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const { ...tabState } = useTabState();

  return (
    <Box margin="space60" width="70%">
      <Box overflow="auto" padding="space80" width="100%" boxShadow="shadow" borderRadius="borderRadius30">
        <Flex hAlignContent="center" vAlignContent="center">
          <img src={konduktorLogo} alt="Konduktor Logo" height="100px" />
          <Text as="h1" fontSize="fontSize90" color="colorTextLinkStronger">
            Konduktor Operations
          </Text>
        </Flex>
        <Tabs orientation="horizontal" state={tabState}>
          <TabList aria-label="Vertical product tabs">
            <Tab id={1}>Segments</Tab>
            <Tab id={2}>Template Editor</Tab>
            <Tab>User-Initiated Email</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Text as="h3" fontSize="fontSize50" marginBottom="space50" color="colorTextLinkStronger">
                Data Cloud Segment Information
              </Text>
              <Segments tab={tabState} />
            </TabPanel>
            <TabPanel>
              <Flex hAlignContent="between" vAlignContent="center" marginBottom="space50">
                <Text as="h3" fontSize="fontSize50" marginBottom="space50" color="colorTextLinkStronger">
                  Email Template Editor
                </Text>
                <Box>
                  <Stack orientation="horizontal" spacing="space40">
                    <Input
                      id="subject-line"
                      placeholder="Email subject"
                      required
                      onChange={(e) => {
                        setEmailSubject(e.currentTarget.value);
                      }}
                    />
                    <Input
                      id="email-template-editor"
                      placeholder="Email template name"
                      required
                      onChange={(e) => {
                        setEmailName(e.currentTarget.value);
                      }}
                    />
                  </Stack>
                </Box>
              </Flex>
              <EmailTemplateEditor emailName={emailName} emailSubject={emailSubject} />
            </TabPanel>
            <TabPanel>
              <Text as="h3" fontSize="fontSize50" marginBottom="space50" color="colorTextLinkStronger">
                User Initiated Email Interaction
              </Text>
              <Text as="h3" fontSize="fontSize90" marginBottom="space50" color="colorTextLinkStronger"></Text>
              <UserInitiatedEmail emailName={emailName} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};

export default TabsComponent;
