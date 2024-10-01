export const sendUiEmail = async (data) => {
  try {
    const url = process.env.NODE_ENV === "development" ? "http://localhost:3000/send-ui-email" : "/send-ui-email";
    const payload = {
      name: data.name,
      emailId: data.emailId,
      customerKey: data.customerKey,
      segmentName: data.segmentName,
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
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
