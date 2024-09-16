import sfmcAuthToken from "../utils/sfmc-auth-token.js";

export const createUserInitiatedSend = async (req, res) => {
  try {
    const { accessToken } = await sfmcAuthToken();
    const { customerKey, name, emailId } = req.body;

    const soapEnvelope = `<?xml version="1.0" encoding="UTF-8"?>
<s:Envelope xmlns:s="http://www.w3.org/2003/05/soap-envelope" xmlns:a="http://schemas.xmlsoap.org/ws/2004/08/addressing" xmlns:u="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">
    <s:Header>
        <a:Action s:mustUnderstand="1">Create</a:Action>
        <a:To s:mustUnderstand="1">https://${process.env.SFMC_SUBDOMAIN}.soap.marketingcloudapis.com/Service.asmx</a:To>
        <fueloauth xmlns="http://exacttarget.com">${accessToken}</fueloauth>
    </s:Header>
    <s:Body xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
        <CreateRequest xmlns="http://exacttarget.com/wsdl/partnerAPI">
            <Options></Options>
            <Client>
                    <ID>${process.env.SFMC_ACCOUNT_ID}</ID>
                </Client>
            <Objects xmlns:q1="http://exacttarget.com/wsdl/partnerAPI" xsi:type="q1:EmailSendDefinition">
                <q1:ObjectID xsi:nil="true"></q1:ObjectID>
                <q1:CustomerKey>${customerKey}</q1:CustomerKey>
                <q1:Name>${name}</q1:Name>
                <q1:Description>Demo example email</q1:Description>
                <q1:SendClassification>
                    <q1:ObjectID>adb5f00f-09ed-ee11-b85e-d4f5ef027d23</q1:ObjectID>
                </q1:SendClassification>
                <q1:SendDefinitionList>
                    <q1:ObjectID xsi:nil="true"></q1:ObjectID>
                    <q1:CustomerKey>TestUI</q1:CustomerKey>
                    <q1:SendDefinitionListType>SourceList</q1:SendDefinitionListType>
                    <q1:CustomObjectID>1c0a5d69-ed6e-ef11-a5b4-5cba2c7c09f8</q1:CustomObjectID>
                    <q1:DataSourceTypeID>CustomObject</q1:DataSourceTypeID>
                    <q1:Name>Keep It 100</q1:Name>
                </q1:SendDefinitionList>
                <q1:Email>
                    <q1:ID>${emailId}</q1:ID>
                    <q1:ObjectID xsi:nil="true"></q1:ObjectID>
                </q1:Email>
                <q1:EmailSubject>Subject</q1:EmailSubject>
            </Objects>
        </CreateRequest>
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
      throw new Error(
        `There was an error when trying to create the User-Initiated Send; error: ${response.statusText}`
      );
    }

    const data = await response.text();

    res.status(200).send({
      message: "UI email created successfully",
      response: data,
    });
  } catch (error) {
    console.error("Error creating User-Initiated Send:", error);
    res.status(500).send({
      message: "Server error",
      error: error.message,
    });
  }
};
