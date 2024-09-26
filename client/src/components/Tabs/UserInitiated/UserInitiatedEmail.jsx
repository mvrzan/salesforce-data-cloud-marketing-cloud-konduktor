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
import { Select, Option } from "@twilio-paste/core/select";

import useBearStore from "../../../hooks/useBearStore";

const UserInitiatedEmail = () => {
  const { segments } = useBearStore();

  return (
    <>
      <Stack orientation="vertical" spacing="space60">
        <Stack orientation="horizontal" spacing="space50">
          <Box>
            <Label htmlFor="segment-selection">Segment</Label>
            <Select id="segment-selection" name="segment-selection" required>
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
            <Label htmlFor="channel">Email Template</Label>
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
            />
          </Box>
        </Stack>
      </Stack>
      <Separator orientation="horizontal" verticalSpacing="space80" />
      <Flex hAlignContent="right" vAlignContent="center">
        <Stack orientation="horizontal" spacing="space50">
          <Button variant="primary" onClick={() => {}}>
            Submit to Marketing Cloud
          </Button>
          <Button variant="destructive_secondary">Cancel</Button>
        </Stack>
      </Flex>
    </>
  );
};

export default UserInitiatedEmail;
