import { useState } from "react";

import { Flex } from "@twilio-paste/core";
import { Box } from "@twilio-paste/core/box";
import { Input } from "@twilio-paste/core/input";
import { Heading } from "@twilio-paste/core/heading";
import { Toaster, useToaster } from "@twilio-paste/core/toast";
import { useUID } from "@twilio-paste/core/uid-library";
import { Tab, Tabs, TabList, TabPanel, TabPanels, useTabState } from "@twilio-paste/core/tabs";

import GeneralTab from "../Tabs/General/GeneralTab";
import LayoutAndContentTab from "../Tabs/Layout/LayoutAndContentTab";

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
    <Box margin="space60" width="60%">
      <Toaster {...toaster} />
      <Box overflow="auto" padding="space80" width="100%" boxShadow="shadow" borderRadius="borderRadius30">
        <Heading>Konduktor operations</Heading>
        <Tabs selectedId={randomComponentId} baseId="options" orientation="horizontal" state={tab}>
          <TabList aria-label="Vertical product tabs">
            <Tab id={randomComponentId}>Setup</Tab>
            <Tab>Layout & Content</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Heading as="h3" variant="heading30">
                General
              </Heading>
              <GeneralTab tab={tab} />
            </TabPanel>
            <TabPanel>
              <Flex hAlignContent="between" vAlignContent="center" marginBottom="space50">
                <Heading as="h3" variant="heading30">
                  Layout & Content
                </Heading>
                <Box>
                  <Input
                    id="layout-and-content"
                    placeholder="Email name"
                    required
                    onChange={(e) => {
                      setEmailName(e.currentTarget.value);
                    }}
                  />
                </Box>
              </Flex>
              <LayoutAndContentTab emailName={emailName} emailCreatedToast={emailCreatedToast} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};

export default Body;
