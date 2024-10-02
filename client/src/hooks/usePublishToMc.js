import { useState } from "react";
import useBearStore from "./useBearStore";
import { createEmailTemplate } from "../utils/createEmailTemplate";

export const usePublishToMc = (editorRef, emailName, emailSubject) => {
  const [isLoading, setIsLoading] = useState(false);
  const [publishingText, setPublishingText] = useState("");
  const { updateEmailTemplates } = useBearStore();

  const publishToMc = () => {
    if (!editorRef.current) return;

    setIsLoading(true);
    const unlayerEditor = editorRef.current.editor;

    unlayerEditor.exportHtml(async ({ html }) => {
      setPublishingText("Publishing to Marketing Cloud!");

      try {
        const publishHtmlResponse = await createEmailTemplate({ html, emailName, emailSubject });

        const emailTemplate = {
          emailName,
          emailId: publishHtmlResponse.emailId,
          emailSubject,
          emailTemplateEditor: true,
        };

        updateEmailTemplates(emailTemplate);
        setPublishingText(`Email template ${emailName} created successfully!`);

        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      } catch (error) {
        console.error("Error publishing email template to Marketing Cloud:", error);
        setPublishingText("Failed to publish email template!");
        setIsLoading(false);
      }
    });
  };

  return { isLoading, publishingText, publishToMc };
};
