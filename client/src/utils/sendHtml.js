export const sendHtml = async ({ html, emailName, emailSubject }) => {
  try {
    const url = process.env.NODE_ENV === "development" ? "http://localhost:3000/send-html" : "/send-html";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ html, emailName, emailSubject }),
    });

    if (!response.ok) {
      throw new Error("Failed to send html");
    }

    const data = await response.json();
    const emailId = data.response.legacyData.legacyId;

    return { success: true, emailId };
  } catch (error) {
    console.error("Error sending html", error);
    return { success: false };
  }
};
