import 'dotenv/config';
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import * as Schema from "./schema";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
  max: 1,
});

export const db = drizzle({
  client: pool,
  schema: Schema,
  logger: true,
 });

export type DB = typeof db;