import { useRef, useState } from "react";
import EmailEditor from "react-email-editor";

import { Flex } from "@twilio-paste/core";
import { Stack } from "@twilio-paste/core/stack";
import { Button } from "@twilio-paste/core/button";

import design from "./design.json";
import SpinnerModal from "./SpinnerModal";
import { sendHtml } from "../../../utils/sendHtml";
import { sendUiEmail } from "../../../utils/sendUiEmail";

const LayoutAndContentTab = ({ emailName, emailCreatedToast }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [publishingText, setPublishingText] = useState("");
  const emailEditorRef = useRef(null);

  const loadDesign = () => {
    try {
      emailEditorRef.current?.editor?.loadDesign(design);
    } catch (error) {
      console.error("Error loading design", error);
    }
  };

  const exportHtml = () => {
    const unlayer = emailEditorRef.current?.editor;

    unlayer?.exportHtml((data) => {
      const { design, html } = data;
      console.log("exportHtml", html);
    });
  };

  const publishToMarketingCloudHandler = () => {
    setIsModalOpen(true);
    const unlayer = emailEditorRef.current?.editor;

    unlayer?.exportHtml((data) => {
      setPublishingText("Publishing to Marketing Cloud!");
      const { html } = data;
      const fetchHtml = async (html) => {
        const sendHtmlResponse = await sendHtml({ html, emailName });

        if (!sendHtmlResponse.success) {
          setPublishingText("Failed to create email!");
          setTimeout(() => {
            setIsModalOpen(false);
          }, 2000);
          return;
        }

        setPublishingText("Email created successfully! Creating UI email...");

        const payload = {
          customerKey: emailName,
          name: emailName,
          emailId: sendHtmlResponse.emailId,
        };

        const sendUiEmailResponse = await sendUiEmail(payload);

        if (!sendUiEmailResponse.ok) {
          console.error("Failed to create User-Initiated email!", sendUiEmailResponse);
          setPublishingText("Failed to create User-Initiated email!");
          setTimeout(() => {
            setIsModalOpen(false);
          }, 2000);
          return;
        }

        setTimeout(() => {
          setPublishingText("UI email created successfully!");
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
        <SpinnerModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} publishingText={publishingText} />
      )}
      <EmailEditor ref={emailEditorRef} onReady={loadDesign} />
      <Flex hAlignContent="right" vAlignContent="center" marginTop="space80">
        <Stack orientation="horizontal" spacing="space40">
          <Button variant="primary" onClick={publishToMarketingCloudHandler} disabled={emailName === "" ? true : false}>
            Publish to Marketing Cloud
          </Button>
          <Button variant="inverse" onClick={testToast}>
            Export HTML
          </Button>
        </Stack>
      </Flex>
    </>
  );
};

export default LayoutAndContentTab;
