import { XMLParser } from "fast-xml-parser";

export const getSendClassifications = async (accessToken) => {
  try {
    const soapEnvelope = `<?xml version="1.0" encoding="UTF-8"?>
<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/" xmlns:a="http://schemas.xmlsoap.org/ws/2004/08/addressing">
    <s:Header>
        <a:Action s:mustUnderstand="1">Retrieve</a:Action>
        <a:To s:mustUnderstand="1">https://${process.env.SFMC_SUBDOMAIN}.soap.marketingcloudapis.com/Service.asmx</a:To>
        <fueloauth xmlns="http://exacttarget.com">${accessToken}</fueloauth>
    </s:Header>
    <s:Body>
        <RetrieveRequestMsg xmlns="http://exacttarget.com/wsdl/partnerAPI">
            <RetrieveRequest>
                <ObjectType>SendClassification</ObjectType>
                <Properties>ObjectID</Properties>
                <Properties>Name</Properties>
                <Properties>Description</Properties>
            </RetrieveRequest>
        </RetrieveRequestMsg>
    </s:Body>
</s:Envelope>`;

    const response = await fetch(`https://${process.env.SFMC_SUBDOMAIN}.soap.marketingcloudapis.com/Service.asmx`, {
      method: "POST",
      headers: {
        "Content-Type": "text/xml",
      },
      body: soapEnvelope,
    });

    if (!response.ok) {
      console.log("response", response);
      throw new Error("Failed to fetch data extensions");
    }

    const data = await response.text();
    const parser = new XMLParser();
    const parsedData = parser.parse(data);
    const envelope = parsedData["soap:Envelope"];
    const body = envelope["soap:Body"];
    const retrieveResponseResults = body.RetrieveResponseMsg.Results;
    const sendClassification = retrieveResponseResults.filter((response) =>
      response.Name.includes("Default Commercial")
    );
    const sendClassificationId = sendClassification[0].ObjectID;

    return sendClassificationId;
  } catch (error) {
    console.error("Error fetching data extensions", error);
    return;
  }
};
