import authToken from "../utils/auth-token.js";

export const getSegment = async (req, res) => {
  try {
    const { accessToken, instanceUrl } = await authToken();

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
    console.error(error);
    res.status(500).send("An error occurred while trying to get the segment");
  }
};
