const sfmcAuthToken = async () => {
  const clientId = process.env.SFMC_CLIENT_ID;
  const clientSecret = process.env.SFMC_CLIENT_SECRET;
  const grantType = "client_credentials";
  const scope = "saved_content_read saved_content_write email_read email_send email_write";
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

  try {
    const response = await fetch(`${process.env.SFMC_AUTH_URL}/v2/token`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`There was an error while getting the Marketing Cloud Auth Token: ${response.status}`);
    }

    return { accessToken: data.access_token };
  } catch (error) {
    return {
      message: "There was an error when getting the auth token.",
      data: error,
      status: 500,
    };
  }
};

export default sfmcAuthToken;
