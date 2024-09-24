import { useState } from "react";
import { useUID } from "@twilio-paste/core/uid-library";

import {
  Sidebar,
  SidebarBody,
  SidebarHeader,
  SidebarHeaderLabel,
  SidebarHeaderIconButton,
  SidebarFooter,
  SidebarCollapseButton,
  SidebarNavigation,
  SidebarNavigationItem,
  SidebarPushContentWrapper,
} from "@twilio-paste/core/sidebar";
import { Box } from "@twilio-paste/core/box";
import { Flex } from "@twilio-paste/core/flex";

import { CodeIcon } from "@twilio-paste/icons/esm/CodeIcon";
import { WebCapableIcon } from "@twilio-paste/icons/esm/WebCapableIcon";
import { DocumentationIcon } from "@twilio-paste/icons/esm/DocumentationIcon";
import { ProductContactCenterAdminIcon } from "@twilio-paste/icons/esm/ProductContactCenterAdminIcon";

import Body from "../components/Body/Body";
import Heading from "../components/Heading/Heading";

const Operations = () => {
  const [pushSidebarCollapsed, setPushSidebarCollapsed] = useState(true);
  const sidebarNavigationSkipLinkID = useUID();
  const topbarSkipLinkID = useUID();
  const mainContentSkipLinkID = useUID();

  return (
    <Box>
      <Sidebar
        sidebarNavigationSkipLinkID={sidebarNavigationSkipLinkID}
        topbarSkipLinkID={topbarSkipLinkID}
        mainContentSkipLinkID={mainContentSkipLinkID}
        collapsed={pushSidebarCollapsed}
        variant="compact"
      >
        <SidebarHeader>
          <SidebarHeaderIconButton as="button" onClick={() => setPushSidebarCollapsed(!pushSidebarCollapsed)}>
            <ProductContactCenterAdminIcon size="sizeIcon20" decorative={false} title="Go to Flex product homepage" />
          </SidebarHeaderIconButton>
          <SidebarHeaderLabel>Konduktor</SidebarHeaderLabel>
        </SidebarHeader>
        <SidebarBody>
          <SidebarBody>
            <SidebarNavigation aria-label="main">
              <SidebarNavigationItem
                href="https://google.com"
                icon={<DocumentationIcon decorative={false} title="Documentation" />}
              >
                Documentation
              </SidebarNavigationItem>
              <SidebarNavigationItem
                href="https://google.com"
                icon={<CodeIcon decorative={false} title="Architecture" />}
              >
                Architecture
              </SidebarNavigationItem>
              <SidebarNavigationItem
                href="https://google.com"
                icon={<WebCapableIcon decorative={false} title="Demo" />}
              >
                Demo
              </SidebarNavigationItem>
            </SidebarNavigation>
          </SidebarBody>
        </SidebarBody>
        <SidebarFooter>
          <SidebarCollapseButton
            onClick={() => setPushSidebarCollapsed(!pushSidebarCollapsed)}
            i18nCollapseLabel="Close sidebar"
            i18nExpandLabel="Open sidebar"
          />
        </SidebarFooter>
      </Sidebar>

      {/* Must wrap content area */}
      <SidebarPushContentWrapper collapsed={pushSidebarCollapsed} variant="default">
        <main id={mainContentSkipLinkID}>
          <Flex hAlignContent="center" vAlignContent="center">
            <Body>
              <Heading as="h3" variant="heading30">
                Operations
              </Heading>
            </Body>
          </Flex>
        </main>
      </SidebarPushContentWrapper>
    </Box>
  );
};

export default Operations;
