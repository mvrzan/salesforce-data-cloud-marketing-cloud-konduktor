import sfmcAuthToken from "../utils/sfmc-auth-token.js";

export const createEmail = async (req, res) => {
  try {
    const { accessToken } = await sfmcAuthToken();
    const html = req.body.html;
    const emailName = req.body.emailName;

    const emailPayload = {
      name: emailName,
      channels: {
        email: true,
        web: false,
      },
      views: {
        html: { content: html },
        text: {},
        subjectline: {
          content: "Welcome to Our Service!",
        },
        preheader: {
          content: "and this is a preheader example...",
        },
      },
      assetType: {
        name: "htmlemail",
        id: 208,
      },
    };

    const response = await fetch(
      `https://${process.env.SFMC_SUBDOMAIN}.rest.marketingcloudapis.com/asset/v1/content/assets`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailPayload),
      }
    );
    const data = await response.json();

    if (!response.ok) {
      console.error("Error creating email:", data);
      throw new Error(`There was an error while creating the email: ${response.status}`);
    }

    res.status(200).send({
      message: "Email created successfully",
      response: data,
    });
  } catch (error) {
    console.error("Error creating email:", error);
    res.status(500).send({
      message: "Server error",
      error: error.message,
    });
  }
};
