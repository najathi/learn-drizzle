import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Pool } from "pg";

import config from "../../drizzle.config";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
  max: 1,
});

const db = drizzle(pool);

async function main() {
  if (config.out) {
    await migrate(db, { migrationsFolder: config.out });
    console.log("Migration done!");
  }
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await pool.end();
  });