export const getDataExtensionCustomerKey = async (accessToken, dataExtensionId) => {
  try {
    const response = await fetch(
      `https://${process.env.SFMC_SUBDOMAIN}.rest.marketingcloudapis.com/data/v1/customobjectdata/${dataExtensionId}/rowset`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `There was an error when trying to get the data extension customer key; error: ${response.statusText}`
      );
    }

    const data = await response.json();
    const customerKey = data.customObjectKey;

    return customerKey;
  } catch (error) {
    console.error("Error fetching data extensions", error);
    return;
  }
};
