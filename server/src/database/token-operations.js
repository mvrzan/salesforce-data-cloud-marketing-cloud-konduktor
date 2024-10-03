import pool from "./db";

export const writeSalesforceToken = async (token, expiresAt) => {
  try {
    await pool.query("INSERT INTO salesforce_tokens (token, expires_at) VALUES ($1, $2)", [token, expiresAt]);
    console.log("Salesforce token written to database successfully!");
  } catch (error) {
    console.error("Error writing Salesforce token to database:", error);
  }
};

export const writeMarketingCloudToken = async (token, expiresAt) => {
  try {
    await pool.query("INSERT INTO marketing_cloud_tokens (token, expires_at) VALUES ($1, $2)", [token, expiresAt]);
    console.log("Marketing Cloud token written to database successfully!");
  } catch (error) {
    console.error("Error writing Marketing Cloud token to database:", error);
  }
};

export const readSalesforceToken = async () => {
  try {
    const result = await pool.query("SELECT token, expires_at FROM salesforce_tokens ORDER BY id DESC LIMIT 1");
    return result.rows[0];
  } catch (error) {
    console.error("Error reading Salesforce token from database:", error);
  }
};

export const readMarketingCloudToken = async () => {
  try {
    const result = await pool.query("SELECT token, expires_at FROM marketing_cloud_tokens ORDER BY id DESC LIMIT 1");
    return result.rows[0];
  } catch (error) {
    console.error("Error reading Marketing Cloud token from database:", error);
  }
};
