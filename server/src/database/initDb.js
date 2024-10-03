import pool from "./db.js";

export const initDb = async () => {
  try {
    await pool.query(`
            CREATE TABLE IF NOT EXISTS salesforce_tokens (
                    id SERIAL PRIMARY KEY,
                    token VARCHAR(255) NOT NULL,
                    expires_at TIMESTAMP NOT NULL
            );
            
            CREATE TABLE IF NOT EXISTS marketing_cloud_tokens (
                    id SERIAL PRIMARY KEY,
                    token VARCHAR(255) NOT NULL,
                    expires_at TIMESTAMP NOT NULL
            );
    `);
    console.log("Tables 'salesforce_tokens' and 'marketing_cloud_tokens' created successfully!");
  } catch (error) {
    console.error("Error creating tables:", error);
  }
};
