import { useState, useEffect } from "react";

import { Box } from "@twilio-paste/core/box";
import { Flex } from "@twilio-paste/core/flex";
import { Text } from "@twilio-paste/core/text";
import { Input } from "@twilio-paste/core/input";
import { Stack } from "@twilio-paste/core/stack";
import { Label } from "@twilio-paste/core/label";
import { Button } from "@twilio-paste/core/button";
import { Heading } from "@twilio-paste/core/heading";
import { Checkbox } from "@twilio-paste/core/checkbox";
import { Separator } from "@twilio-paste/core/separator";

import InclusionSegment from "./InclusionSegment";
import ExclusionSegment from "./ExclusionSegment";
import useBearStore from "../../../hooks/useBearStore";
import { getSegment } from "../../../utils/getSegment";

const GeneralTab = ({ tab }) => {
  const [inclusionSegments, setInclusionSegments] = useState([]);
  const [exclusionSegments, setExclusionSegments] = useState([]);
  const [segments, setSegments] = useState([]);
  const { generalFormInformation, updateGeneralFormInformation } = useBearStore();

  useEffect(() => {
    const fetchSegments = async () => {
      const fetchedSegments = await getSegment();
      setSegments(fetchedSegments);
    };
    fetchSegments();
  }, []);

  const addInclusionHandler = () => {
    setInclusionSegments([...inclusionSegments, { segment: `segment_${inclusionSegments.length + 1}` }]);
  };

  const addExclusionHandler = () => {
    setExclusionSegments([...exclusionSegments, { segment: `segment_${exclusionSegments.length + 1}` }]);
  };

  const nextButtonHandler = () => {
    tab.select(`${tab.baseId}-4`);

    updateGeneralFormInformation({
      intent: "intent",
      channel: "channel",
      name: "name",
      segments,
    });
  };

  return (
    <>
      <Stack orientation="vertical" spacing="space60">
        <Stack orientation="horizontal" spacing="space50">
          <Box>
            <Label htmlFor="intent">Intent</Label>
            <Input
              aria-describedby="intent_text"
              id="intent"
              name="intent"
              type="text"
              placeholder="Please select an intent"
            />
          </Box>
          <Box>
            <Label htmlFor="channel">Channel</Label>
            <Input
              aria-describedby="channel_text"
              id="channel"
              name="channel"
              type="text"
              placeholder="Please select a channel"
            />
          </Box>
          <Box>
            <Label htmlFor="name" required>
              Name
            </Label>
            <Input
              required
              autoComplete="off"
              aria-describedby="name_text"
              id="name"
              name="name"
              type="text"
              placeholder="Please select a name"
            />
          </Box>
        </Stack>
        <Stack orientation="horizontal" spacing="space50">
          <Box>
            <Label htmlFor="business_segment">Business Segment</Label>
            <Input
              aria-describedby="business_segment_text"
              id="business_segment"
              name="business_segment"
              type="text"
              placeholder="Please select a business segment"
            />
          </Box>
          <Box>
            <Label htmlFor="pods">Pods</Label>
            <Input aria-describedby="pods_text" id="pods" name="pods" type="text" placeholder="Please select a pod" />
          </Box>
          <Box>
            <Label htmlFor="pod_subgroups">Pod Subgroups/Sites</Label>
            <Input
              aria-describedby="pod_subgroups_text"
              id="pod_subgroups"
              name="pod_subgroups"
              type="text"
              placeholder="Please select pod subgroups"
            />
          </Box>
        </Stack>
        <Stack orientation="horizontal" spacing="space50">
          <Box>
            <Label htmlFor="locale">Locale</Label>
            <Input
              aria-describedby="locale_text"
              id="locale"
              name="locale"
              type="text"
              placeholder="Please select a locale"
            />
          </Box>
        </Stack>
        <Stack orientation="horizontal" spacing="space50">
          <Box>
            <Label htmlFor="send">Send</Label>
            <Input
              aria-describedby="send_text"
              id="send"
              name="send"
              type="text"
              placeholder="Please select the proper timing"
            />
          </Box>
          <Box>
            <Label htmlFor="schedule">Schedule</Label>
            <Input
              aria-describedby="schedule_text"
              id="schedule"
              name="schedule"
              type="text"
              placeholder="Please select a schedule"
            />
          </Box>
          <Box>
            <Label htmlFor="deployment_date">Deployment Date</Label>
            <Input
              aria-describedby="deployment_date_text"
              Date
              id="deployment_date"
              name="deployment_date"
              type="date"
            />
          </Box>
          <Box>
            <Label htmlFor="time">Time (EST)</Label>
            <Input aria-describedby="time_text" Date id="time" name="time" type="time" />
          </Box>
        </Stack>
        <Stack orientation="horizontal" spacing="space50">
          <Box>
            <Checkbox id="bonus_fancash" name="bonus_fancash">
              Bonus Fancash
            </Checkbox>
          </Box>
        </Stack>
      </Stack>
      <Separator orientation="horizontal" verticalSpacing="space50" />
      <Heading as="h3" variant="heading30">
        Audience
      </Heading>
      <Flex hAlignContent="between" vAlignContent="center">
        <Label htmlFor="send">Inclusions</Label>
        <Button variant="primary" onClick={addInclusionHandler}>
          Add Inclusion
        </Button>
      </Flex>
      {inclusionSegments.length > 0 ? (
        inclusionSegments.map((_segment, index) => (
          <InclusionSegment key={index} index={index} setInclusionSegments={setInclusionSegments} segments={segments} />
        ))
      ) : (
        <Box
          boxShadow="shadow"
          borderRadius="borderRadius30"
          width="35%"
          height="100px"
          marginLeft="auto"
          marginRight="auto"
          display="flex"
          justifyContent="center"
        >
          <Flex hAlignContent="center" vAlignContent="center">
            <Text fontSize="fontSize60" fontWeight="fontWeightExtrabold">
              No inclusions selected.
            </Text>
          </Flex>
        </Box>
      )}
      <Flex hAlignContent="between" vAlignContent="center">
        <Label htmlFor="send">Exclusions</Label>
        <Button variant="primary" onClick={addExclusionHandler}>
          Add Exclusion
        </Button>
      </Flex>
      {exclusionSegments.length > 0 ? (
        exclusionSegments.map((_segment, index) => (
          <ExclusionSegment key={index} index={index} setExclusionSegments={setExclusionSegments} segments={segments} />
        ))
      ) : (
        <Box
          boxShadow="shadow"
          borderRadius="borderRadius30"
          width="35%"
          height="100px"
          marginLeft="auto"
          marginRight="auto"
          display="flex"
          justifyContent="center"
        >
          <Flex hAlignContent="center" vAlignContent="center">
            <Text fontSize="fontSize60" fontWeight="fontWeightExtrabold">
              No exclusions selected.
            </Text>
          </Flex>
        </Box>
      )}
      <Separator orientation="horizontal" verticalSpacing="space80" />
      <Flex hAlignContent="right" vAlignContent="center">
        <Stack orientation="horizontal" spacing="space50">
          <Button variant="primary" onClick={nextButtonHandler}>
            Next
          </Button>
          <Button variant="destructive_secondary">Cancel</Button>
        </Stack>
      </Flex>
    </>
  );
};

export default GeneralTab;
