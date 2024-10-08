import { useState, useEffect } from "react";
import useBearStore from "../../../hooks/useBearStore";
import { useFetchTemplates } from "../../../hooks/useFetchTemplates";
import { usePublishUserInitiatedEmail } from "../../../hooks/usePublishUserInitiatedEmail";

import { Box } from "@twilio-paste/core/box";
import { Flex } from "@twilio-paste/core/flex";
import { Input } from "@twilio-paste/core/input";
import { Stack } from "@twilio-paste/core/stack";
import { Label } from "@twilio-paste/core/label";
import { Button } from "@twilio-paste/core/button";
import { Toaster } from "@twilio-paste/core/toast";
import { Separator } from "@twilio-paste/core/separator";
import { Select, Option } from "@twilio-paste/core/select";

const UserInitiatedEmail = ({ emailName }) => {
  const { segments, emailTemplates, updateEmailTemplates } = useBearStore();
  const [selectedSegment, setSelectedSegment] = useState("");
  const [selectedEmailTemplate, setSelectedEmailTemplate] = useState("");
  const [interactionName, setInteractionName] = useState("");
  const { templates } = useFetchTemplates();
  const { isButtonDisabled, submitHandler, toaster } = usePublishUserInitiatedEmail(
    interactionName,
    selectedEmailTemplate,
    emailName,
    selectedSegment
  );

  useEffect(() => {
    updateEmailTemplates(templates);
    setSelectedEmailTemplate(templates[0]);

    if (segments.length > 0) {
      setSelectedSegment(segments[0]);
    }
  }, [templates]);

  return (
    <>
      <Toaster left={["space40", "unset", "unset"]} {...toaster} />
      <Stack orientation="vertical" spacing="space60">
        <Stack orientation="horizontal" spacing="space50">
          <Box>
            <Label htmlFor="segment-selection">Segment</Label>
            <Select
              id="segment-selection"
              name="segment-selection"
              required
              value={selectedSegment.name}
              onChange={(item) => {
                const filterSegment = segments.filter((segment) => segment.name === item.currentTarget.value);
                setSelectedSegment(...filterSegment);
              }}
            >
              {segments.length > 0 ? (
                segments?.map((segment) => {
                  return <Option key={segment.segmentId}>{segment.name}</Option>;
                })
              ) : (
                <Option value="no segments">No available segments</Option>
              )}
            </Select>
          </Box>
          <Box>
            <Label htmlFor="email-template-selection">Email Templates</Label>
            <Select
              id="email-template-selection"
              name="email-template-selection"
              required
              onChange={(item) => {
                const filteredEmail = emailTemplates.filter(
                  (emailTemplate) => emailTemplate.emailName === item.currentTarget.value
                );
                setSelectedEmailTemplate(...filteredEmail);
              }}
            >
              {emailTemplates.length > 0 ? (
                emailTemplates?.map((emailTemplate) => {
                  return (
                    <Option key={`${emailTemplate.emailId}+${emailTemplate.emailName}`}>
                      {emailTemplate.emailName}
                    </Option>
                  );
                })
              ) : (
                <Option value="no segments">No available Email Templates</Option>
              )}
            </Select>
          </Box>
          <Box>
            <Label htmlFor="name" required>
              Interaction Name
            </Label>
            <Input
              required
              autoComplete="off"
              aria-describedby="name_text"
              id="name"
              name="name"
              type="text"
              placeholder="Please select a name"
              onChange={(e) => setInteractionName(e.currentTarget.value)}
            />
          </Box>
        </Stack>
      </Stack>
      <Separator orientation="horizontal" verticalSpacing="space80" />
      <Flex hAlignContent="right" vAlignContent="center">
        <Stack orientation="horizontal" spacing="space50">
          <Button
            variant="primary"
            onClick={submitHandler}
            loading={isButtonDisabled}
            disabled={
              selectedEmailTemplate?.length === 0 || selectedSegment?.length === 0 || interactionName === ""
                ? true
                : false
            }
          >
            Submit to Marketing Cloud
          </Button>
          <Button variant="destructive_secondary">Cancel</Button>
        </Stack>
      </Flex>
    </>
  );
};

export default UserInitiatedEmail;
