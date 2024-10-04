import { postgresPool } from "./postgres-connection.js";

export const createTablesIfNotExists = async () => {
  try {
    await postgresPool.query(`
        CREATE TABLE IF NOT EXISTS salesforce_tokens (
            id SERIAL PRIMARY KEY,
            token VARCHAR(255) NOT NULL,
            instance_url VARCHAR(255) NOT NULL,
            expires_at BIGINT NOT NULL
        );
        
        CREATE TABLE IF NOT EXISTS marketing_cloud_tokens (
            id SERIAL PRIMARY KEY,
            token TEXT NOT NULL,
            expires_at BIGINT NOT NULL
        );
    `);
    console.log("Tables 'salesforce_tokens' and 'marketing_cloud_tokens' created successfully!");
  } catch (error) {
    console.error("Error creating tables:", error);
  }
};
