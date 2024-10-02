import sfAuthToken from "../utils/sf-auth-token.js";

export const getSegments = async (_req, res) => {
  try {
    const { accessToken, instanceUrl } = await sfAuthToken();

    const segmentResponse = await fetch(
      `${instanceUrl}/services/data/${process.env.SALESFORCE_API_VERSION}/ssot/segments`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!segmentResponse.ok) {
      throw new Error(`There was an error when trying to get the segment; error: ${segmentResponse.statusText}`);
    }

    const segment = await segmentResponse.json();

    res.status(200).json(segment);
  } catch (error) {
    console.error("Error getting segments", error);
    res.status(500).send(error);
  }
};
