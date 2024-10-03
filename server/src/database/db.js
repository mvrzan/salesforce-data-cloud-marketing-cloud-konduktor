import pg from "pg";
import "dotenv/config";
import process from "process";

const { Pool } = pg;
const pool = new Pool({
  connectionString: `postgres://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`,
  ssl: { rejectUnauthorized: false },
});

export default pool;
