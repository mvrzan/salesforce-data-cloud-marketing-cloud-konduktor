import pg from "pg";

const { Pool } = pg;

export const postgresPool = new Pool({
  connectionString: `postgres://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`,
  ssl: { rejectUnauthorized: false },
});
