export const createUiEmail = async (data) => {
  try {
    const url = process.env.NODE_ENV === "development" ? "http://localhost:3000/create-ui-email" : "/create-ui-email";
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
      throw new Error(response.statusText);
    }

    return response;
  } catch (error) {
    console.error("Error sending html", error);
    return;
  }
};
