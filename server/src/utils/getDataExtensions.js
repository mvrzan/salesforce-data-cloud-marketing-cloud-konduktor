import { XMLParser } from "fast-xml-parser";

export const getDataExtensions = async (accessToken, segmentName) => {
  try {
    const soapEnvelope = `<?xml version="1.0" encoding="UTF-8"?>
<s:Envelope xmlns:s="http://www.w3.org/2003/05/soap-envelope" xmlns:a="http://schemas.xmlsoap.org/ws/2004/08/addressing" xmlns:u="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">
    <s:Header>
        <a:Action s:mustUnderstand="1">Retrieve</a:Action>
        <a:To s:mustUnderstand="1">https://${process.env.SFMC_SUBDOMAIN}.soap.marketingcloudapis.com/Service.asmx</a:To>
        <fueloauth xmlns="http://exacttarget.com">${accessToken}</fueloauth>
    </s:Header>
    <s:Body xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
        <RetrieveRequestMsg xmlns="http://exacttarget.com/wsdl/partnerAPI">
            <RetrieveRequest>
                <ObjectType>DataExtension</ObjectType>
                <Properties>ObjectID</Properties>
                <Properties>CustomerKey</Properties>
                <Properties>Name</Properties>
                <Properties>IsSendable</Properties>
                <Properties>SendableSubscriberField.Name</Properties>
                <QueryAllAccounts>true</QueryAllAccounts>
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
    const dataExtension = retrieveResponseResults.filter((response) => response.Name.includes(segmentName));
    const dataExtensionCustomObjectId = dataExtension[0].ObjectID;
    const dataExtensionName = dataExtension[0].Name;

    return { dataExtensionCustomObjectId, dataExtensionName };
  } catch (error) {
    console.error("Error fetching data extensions", error);
    return;
  }
};
