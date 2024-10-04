import { readMarketingCloudToken, writeMarketingCloudToken } from "../database/token-operations.js";

const sfmcAuthToken = async () => {
  const clientId = process.env.SFMC_CLIENT_ID;
  const clientSecret = process.env.SFMC_CLIENT_SECRET;
  const grantType = "client_credentials";
  const scope = "saved_content_read saved_content_write email_read email_send email_write data_extensions_read";
  const accountId = process.env.SFMC_ACCOUNT_ID;

  const data = new URLSearchParams({
    grant_type: grantType,
    client_id: clientId,
    client_secret: clientSecret,
    scope,
    account_id: accountId,
  }).toString();

  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: data,
  };

  const token = await readMarketingCloudToken();

  if (token) {
    const currentTime = new Date().getTime();
    if (currentTime < token.expires_at) {
      return { accessToken: token.token };
    }
  }

  try {
    const response = await fetch(`${process.env.SFMC_AUTH_URL}/v2/token`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`There was an error while getting the Marketing Cloud Auth Token: ${response.statusText}`);
    }

    const tokenExpiration = new Date().getTime() + data.expires_in * 1000;

    await writeMarketingCloudToken(data.access_token, tokenExpiration);

    return { accessToken: data.access_token };
  } catch (error) {
    console.error(error);
    return error;
  }
};

export default sfmcAuthToken;
