import { useState, useCallback } from "react";
import { useToaster } from "@twilio-paste/core/toast";
import { createUiEmail } from "../utils/createUiEmail";

export const usePublishUserInitiatedEmail = (interactionName, selectedEmailTemplate, emailName, selectedSegment) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const toaster = useToaster();

  const submitHandler = useCallback(() => {
    setIsButtonDisabled(true);
    const payload = {
      name: interactionName,
      emailId: selectedEmailTemplate.emailId,
      customerKey: emailName,
      segmentName: selectedSegment.name,
      emailSubject: selectedEmailTemplate.emailSubject ?? "User Initiated Email Interaction",
    };

    const sendToMc = async (data) => {
      try {
        const request = await createUiEmail(data);

        if (!request.ok) {
          setTimeout(() => {
            setIsButtonDisabled(false);
          }, 2000);
          throw new Error("Failed to send submit User-Initiated Email Interaction to Marketing Cloud");
        }

        setTimeout(() => {
          toaster.push({
            message: "User Initiated Email Interaction has been successfully created!",
            variant: "success",
            dismissAfter: 3000,
            id: "success-toast",
          });
          setIsButtonDisabled(false);
        }, 2000);
      } catch (error) {
        console.error(error);
        toaster.push({
          message: `Failed to create User Initiated Email Interaction with the following error: ${error}`,
          variant: "error",
          dismissAfter: 3000,
          id: "error-toast",
        });
      }
    };

    sendToMc(payload);
  }, [interactionName, selectedEmailTemplate, emailName, selectedSegment]);

  return { isButtonDisabled, submitHandler, toaster };
};
