import { Input } from "@twilio-paste/core/input";
import { Label } from "@twilio-paste/core/label";
import { Stack } from "@twilio-paste/core/stack";
import { Box } from "@twilio-paste/core/box";
import { Flex } from "@twilio-paste/core/flex";
import { Button } from "@twilio-paste/core/button";
import { Select, Option } from "@twilio-paste/core/select";
import { ProductAdminDomainsIcon } from "@twilio-paste/icons/esm/ProductAdminDomainsIcon";

const ExclusionSegment = ({ index, setExclusionSegments, segments }) => {
  const deleteExclusionHandler = () => {
    setExclusionSegments((prevState) => prevState.filter((_, i) => i !== index));
  };

  return (
    <Box
      backgroundColor="colorBackgroundPrimaryWeaker"
      margin="space50"
      boxShadow="shadow"
      borderRadius="borderRadius30"
      height="150px"
      display="grid"
    >
      <Flex hAlignContent="between" vAlignContent="center">
        <Stack orientation="horizontal" spacing="space50">
          <Box marginLeft="space40">
            <ProductAdminDomainsIcon decorative title="More options icon" />
          </Box>
          <Box width="250px">
            <Label htmlFor={`segment_exclusion_${index}`}>Segment</Label>
            <Select id={`segment_exclusion_${index}`} name={`segment_exclusion_${index}`} required>
              {segments.length > 0 ? (
                segments.map((segment) => <Option key={segment.segmentId}>{segment.name}</Option>)
              ) : (
                <Option value="option1">No available segments</Option>
              )}
            </Select>
          </Box>
          <Box width="400px">
            <Label htmlFor={`description_exclusion_${index}`}>Description</Label>
            <Input
              aria-describedby="description_text"
              id={`description_exclusion_${index}`}
              name={`description_exclusion_${index}`}
              type="text"
              placeholder="Add description for the segment"
            />
          </Box>
        </Stack>
        <Box marginRight="space80">
          <Button variant="destructive_secondary" onClick={deleteExclusionHandler}>
            Delete
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default ExclusionSegment;
