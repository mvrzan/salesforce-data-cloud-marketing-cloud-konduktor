import { useState } from "react";

import { Flex } from "@twilio-paste/core";
import { Box } from "@twilio-paste/core/box";
import { Text } from "@twilio-paste/core/text";
import { Input } from "@twilio-paste/core/input";
import { useUID } from "@twilio-paste/core/uid-library";
import { Toaster, useToaster } from "@twilio-paste/core/toast";
import { Tab, Tabs, TabList, TabPanel, TabPanels, useTabState } from "@twilio-paste/core/tabs";

import GeneralTab from "../Tabs/General/GeneralTab";
import konduktorLogo from "../../assets/konduktor-logo.png";
import Segments from "../Tabs/Segments/Segments";
import EmailTemplateEditor from "../Tabs/EmailTemplate/EmailTemplateEditor";

const Body = () => {
  const [emailName, setEmailName] = useState("");
  const randomComponentId = useUID();
  const { ...tab } = useTabState();
  const toaster = useToaster();

  const emailCreatedToast = () => {
    toaster.push({
      message: "Email created successfully!",
      variant: "success",
      dismissAfter: 5000,
    });
  };

  return (
    <Box margin="space60" width="70%">
      <Toaster {...toaster} />
      <Box overflow="auto" padding="space80" width="100%" boxShadow="shadow" borderRadius="borderRadius30">
        <Flex hAlignContent="center" vAlignContent="center">
          <img src={konduktorLogo} alt="Konduktor Logo" height="100px" />
          <Text as="h1" fontSize="fontSize90" color="colorTextLinkStronger">
            Konduktor Operations
          </Text>
        </Flex>
        <Tabs selectedId={randomComponentId} baseId="options" orientation="horizontal" state={tab}>
          <TabList aria-label="Vertical product tabs">
            <Tab id={randomComponentId}>Segments</Tab>
            <Tab>Template Editor</Tab>
            <Tab>General</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Text as="h3" fontSize="fontSize50" marginBottom="space50" color="colorTextLinkStronger">
                Data Cloud Segment Information
              </Text>
              <Segments tab={tab} />
            </TabPanel>
            <TabPanel>
              <Flex hAlignContent="between" vAlignContent="center" marginBottom="space50">
                <Text as="h3" fontSize="fontSize50" marginBottom="space50" color="colorTextLinkStronger">
                  Email Template Editor
                </Text>
                <Box>
                  <Input
                    id="email-template-editor"
                    placeholder="Email template name"
                    required
                    onChange={(e) => {
                      setEmailName(e.currentTarget.value);
                    }}
                  />
                </Box>
              </Flex>
              <EmailTemplateEditor tab={tab} emailName={emailName} />
            </TabPanel>
            <TabPanel>
              <Text as="h3" fontSize="fontSize50" marginBottom="space50" color="colorTextLinkStronger">
                Data Cloud Segment Information
              </Text>
              <Text as="h3" fontSize="fontSize90" marginBottom="space50" color="colorTextLinkStronger"></Text>
              <GeneralTab tab={tab} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};

export default Body;
