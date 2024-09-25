import { Box } from "@twilio-paste/core/box";
import { Flex } from "@twilio-paste/core/flex";
import { Text } from "@twilio-paste/core/text";
import { Label } from "@twilio-paste/core/label";
import { Stack } from "@twilio-paste/core/stack";
import { Truncate } from "@twilio-paste/core/truncate";
import { Separator } from "@twilio-paste/core/separator";

const Segment = ({ segment }) => {
  return (
    <Box
      backgroundColor="colorBackground"
      marginY="space40"
      borderRadius="borderRadius30"
      height="180px"
      display="grid"
      width="100%"
    >
      <Text as="h3" fontSize="fontSize50" color="colorTextLinkStronger" paddingTop="space30" paddingLeft="space40">
        {segment.name}
      </Text>
      <Flex hAlignContent="between" vAlignContent="center" padding="space60">
        <Box
          backgroundColor="colorBackgroundPrimaryWeakest"
          boxShadow="shadow"
          borderRadius="borderRadius30"
          padding="space40"
          maxWidth="200px"
        >
          <Stack orientation="vertical" spacing="space30">
            <Stack orientation="vertical" spacing="space10">
              <Text as="span" fontSize="fontSize30" fontWeight="fontWeightExtrabold" color="colorTextLinkStronger">
                Segment Name
              </Text>
              <Text as="span" fontSize="fontSize20" fontWeight="fontWeightExtrabold" fontStyle="italic">
                <Truncate title={segment.name}>{segment.name}</Truncate>
              </Text>
            </Stack>
            <Stack orientation="vertical" spacing="space10">
              <Text as="span" fontSize="fontSize30" fontWeight="fontWeightExtrabold" color="colorTextLinkStronger">
                Segment API Name
              </Text>
              <Text as="span" fontSize="fontSize20" fontWeight="fontWeightExtrabold" fontStyle="italic">
                <Truncate title={segment.apiName}> {segment.apiName}</Truncate>
              </Text>
            </Stack>
          </Stack>
        </Box>

        <Box
          backgroundColor="colorBackgroundPrimaryWeakest"
          boxShadow="shadow"
          borderRadius="borderRadius30"
          padding="space40"
          maxWidth="200px"
        >
          <Stack orientation="vertical" spacing="space30">
            <Stack orientation="vertical" spacing="space10">
              <Text as="span" fontSize="fontSize30" fontWeight="fontWeightExtrabold" color="colorTextLinkStronger">
                Segment ID
              </Text>
              <Text as="span" fontSize="fontSize20" fontWeight="fontWeightExtrabold" fontStyle="italic">
                {segment.segmentId}
              </Text>
            </Stack>
            <Stack orientation="vertical" spacing="space10">
              <Text as="span" fontSize="fontSize30" fontWeight="fontWeightExtrabold" color="colorTextLinkStronger">
                Segment Definition ID
              </Text>
              <Text as="span" fontSize="fontSize20" fontWeight="fontWeightExtrabold" fontStyle="italic">
                {segment.segmentDefinitionId}
              </Text>
            </Stack>
          </Stack>
        </Box>

        <Box
          backgroundColor="colorBackgroundPrimaryWeakest"
          boxShadow="shadow"
          borderRadius="borderRadius30"
          padding="space40"
          maxWidth="200px"
        >
          <Stack orientation="vertical" spacing="space30">
            <Stack orientation="vertical" spacing="space10">
              <Text as="span" fontSize="fontSize30" fontWeight="fontWeightExtrabold" color="colorTextLinkStronger">
                Data Space
              </Text>
              <Text as="span" fontSize="fontSize20" fontWeight="fontWeightExtrabold" fontStyle="italic">
                {segment.dataSpace}
              </Text>
            </Stack>
            <Stack orientation="vertical" spacing="space10">
              <Text as="span" fontSize="fontSize30" fontWeight="fontWeightExtrabold" color="colorTextLinkStronger">
                Segment Type
              </Text>
              <Text as="span" fontSize="fontSize20" fontWeight="fontWeightExtrabold" fontStyle="italic">
                {segment.segmentType}
              </Text>
            </Stack>
          </Stack>
        </Box>

        <Box
          backgroundColor="colorBackgroundPrimaryWeakest"
          boxShadow="shadow"
          borderRadius="borderRadius30"
          padding="space40"
          maxWidth="200px"
        >
          <Stack orientation="vertical" spacing="space30">
            <Stack orientation="vertical" spacing="space10">
              <Text as="span" fontSize="fontSize30" fontWeight="fontWeightExtrabold" color="colorTextLinkStronger">
                Segment Status
              </Text>
              <Text as="span" fontSize="fontSize20" fontWeight="fontWeightExtrabold" fontStyle="italic">
                {segment.segmentStatus}
              </Text>
            </Stack>
            <Stack orientation="vertical" spacing="space10">
              <Text as="span" fontSize="fontSize30" fontWeight="fontWeightExtrabold" color="colorTextLinkStronger">
                Publish Status
              </Text>
              <Text as="span" fontSize="fontSize20" fontWeight="fontWeightExtrabold" fontStyle="italic">
                {segment.publishStatus === undefined ? "Not Published" : segment.publishStatus}
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
};

export default Segment;
