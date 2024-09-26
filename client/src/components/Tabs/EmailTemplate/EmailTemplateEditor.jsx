import { useRef, useState } from "react";
import EmailEditor from "react-email-editor";

import { Box } from "@twilio-paste/core/box";
import { Flex } from "@twilio-paste/core/flex";
import { Text } from "@twilio-paste/core/text";
import { Stack } from "@twilio-paste/core/stack";
import { Button } from "@twilio-paste/core/button";
import { Spinner } from "@twilio-paste/core/spinner";

import StatusModal from "./StatusModal";
import { sendHtml } from "../../../utils/sendHtml";
import useBearStore from "../../../hooks/useBearStore";

const EmailTemplateEditor = ({ emailName, emailSubject }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [publishingText, setPublishingText] = useState("");
  const [editorIsReady, setEditorIsReady] = useState(false);
  const emailEditorRef = useRef(null);
  const { updateEmailTemplates } = useBearStore();

  const exportHtml = () => {
    const unlayer = emailEditorRef.current?.editor;

    unlayer?.exportHtml((data) => {
      const { html } = data;
      const blob = new Blob([html], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `email-template.html`);
      link.click();
    });
  };

  const publishToMarketingCloudHandler = () => {
    setIsModalOpen(true);
    const unlayerEditor = emailEditorRef.current?.editor;

    unlayerEditor?.exportHtml((data) => {
      setPublishingText("Publishing to Marketing Cloud!");
      const { html } = data;

      const fetchHtml = async (html) => {
        const sendHtmlResponse = await sendHtml({ html, emailName, emailSubject });

        if (!sendHtmlResponse.success) {
          setPublishingText("Failed to create email!");
          setTimeout(() => {
            setIsModalOpen(false);
          }, 2000);
          return;
        }

        const emailTemplate = {
          emailName,
          emailId: sendHtmlResponse.emailId,
          emailSubject,
        };

        updateEmailTemplates(emailTemplate);

        setTimeout(() => {
          setPublishingText(`Email template ${emailName} created successfully!`);
          setTimeout(() => {
            setIsModalOpen(false);
          }, 2000);
        }, 2000);
      };

      fetchHtml(html);
    });
  };

  const testToast = () => {
    emailCreatedToast();
  };

  return (
    <>
      {isModalOpen && (
        <StatusModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} publishingText={publishingText} />
      )}
      {!editorIsReady && (
        <Box
          position="absolute"
          top="30%"
          left="0"
          width="100%"
          height="50%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          backgroundColor="rgba(255, 255, 255, 0.8)" // Optional: Add a semi-transparent background
        >
          <Flex hAlignContent="center" vAlignContent="center">
            <Stack orientation="vertical" spacing="space80">
              <Box display="flex" alignContent="center" justifyContent="center">
                <Spinner decorative={false} title="Loading" size="sizeIcon110" color="colorTextDecorative20" />
              </Box>
              <Text
                fontSize="fontSize50"
                fontWeight="fontWeightExtrabold"
                color="colorTextLinkStronger"
                textAlign="center"
              >
                Loading Email editor...
              </Text>
            </Stack>
          </Flex>
        </Box>
      )}

      <EmailEditor
        ref={emailEditorRef}
        onReady={() => {
          setEditorIsReady(true);
        }}
      />

      <Flex hAlignContent="right" vAlignContent="center" marginTop="space80">
        <Stack orientation="horizontal" spacing="space40">
          <Button
            variant="primary"
            onClick={publishToMarketingCloudHandler}
            disabled={emailName === "" || emailSubject === "" ? true : false}
          >
            Publish to Marketing Cloud
          </Button>
          <Button variant="inverse" onClick={exportHtml}>
            Export HTML
          </Button>
        </Stack>
      </Flex>
    </>
  );
};

export default EmailTemplateEditor;
