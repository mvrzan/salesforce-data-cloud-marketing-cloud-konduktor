import { readSalesforceToken, writeSalesforceToken } from "../database/token-operations.js";

const sfAuthToken = async () => {
  const username = process.env.SERVICE_USER_USERNAME;
  const password = process.env.SERVICE_USER_PASSWORD;
  const securityToken = process.env.SERVICE_USER_SECURITY_TOKEN;
  const clientId = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;

  const data = new URLSearchParams({
    grant_type: "password",
    username,
    password: password + securityToken,
    client_id: clientId,
    client_secret: clientSecret,
  }).toString();

  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: data,
  };

  const token = await readSalesforceToken();

  if (token) {
    const currentTime = new Date().getTime();
    if (currentTime < token.expires_at) {
      return { accessToken: token.token, instanceUrl: token.instance_url };
    }
  }

  try {
    const response = await fetch(`${process.env.SALESFORCE_LOGIN_URL}/services/oauth2/token`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`There was an error while getting the Salesforce Access Token: ${response.statusText}`);
    }
    const tokenExpiration = +data.issued_at + 7200 * 1000;
    await writeSalesforceToken(data.access_token, data.instance_url, tokenExpiration);

    return { accessToken: data.access_token, instanceUrl: data.instance_url };
  } catch (error) {
    console.error(error);
    return error;
  }
};

export default sfAuthToken;
