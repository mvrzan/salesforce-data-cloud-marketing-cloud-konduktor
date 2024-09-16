import { Box } from "@twilio-paste/core/box";
import { Flex } from "@twilio-paste/core/flex";
import { Text } from "@twilio-paste/text";
import { Stack } from "@twilio-paste/core/stack";

import { Avatar } from "@twilio-paste/core/avatar";
import expertsLogo from "../../assets/experts-logo.png";
import wadeAvatar from "../../assets/wade-avatar.jpeg";

const Heading = () => {
  return (
    <Box backgroundColor="colorBackground" top={0}>
      <Flex hAlignContent="between" vAlignContent="center">
        <Flex hAlignContent="center" vAlignContent="center">
          <Box margin="space40">
            <img src={expertsLogo} alt="Experts Logo" height="50px" />
          </Box>
          <Text as="span" color="colorText" fontSize="fontSize80" fontWeight="fontWeightExtrabold" marginLeft="space50">
            Konduktor
          </Text>
        </Flex>
        <Box marginRight="space40">
          <Stack orientation="horizontal" spacing="space40">
            <Avatar name="Wade Shiflett" src={wadeAvatar} size="sizeIcon100" />
            <Text as="span" color="colorTextWeak" fontSize="fontSize60" fontWeight="fontWeightExtrabold">
              Wade Shiflett
            </Text>
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
};

export default Heading;
