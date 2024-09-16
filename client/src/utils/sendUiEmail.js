export const sendUiEmail = async (payload) => {
  try {
    const url = "/create-ui-email";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ customerKey: payload.customerKey, name: payload.name, emailId: payload.emailId }),
    });

    if (!response.ok) {
      console.error("response", response);
      throw new Error("Failed to send html");
    }

    return response;
  } catch (error) {
    console.error("Error sending html", error);
    return;
  }
};
