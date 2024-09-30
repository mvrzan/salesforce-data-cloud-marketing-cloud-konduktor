import sfmcAuthToken from "../utils/sfmc-auth-token.js";

export const getEmailTemplates = async (_req, res) => {
  try {
    const { accessToken } = await sfmcAuthToken();

    const response = await fetch(
      `https://${process.env.SFMC_SUBDOMAIN}.rest.marketingcloudapis.com/asset/v1/content/assets`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch email templates");
    }

    const data = await response.json();

    const emailTemplates = data.items
      ?.filter((template) => template?.assetType?.name === "htmlemail")
      .map((template) => ({
        emailName: template.name,
        emailId: template.legacyData?.legacyId ?? template.id,
        emailSubject: template.subjectline?.content,
      }));

    res.status(200).json(emailTemplates);
  } catch (error) {
    console.error("Error loading email templates", error);
    res.status(500).send("An error occurred while trying to get the email templates");
  }
};
