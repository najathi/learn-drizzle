import { desc, sql, eq, count, gt } from "drizzle-orm";

import { db } from "./db";
import { usersTable, userPreferencesTable } from "./db/schema";

async function main() {
    //! Delete Data
    // await db.delete(usersTable);

    //! Insert Data
    // await db.insert(usersTable).values({
    //     name: "John Doe",
    //     age: 30,
    //     email: "example@email.com",
    // });

    //! Find Data
    // const users = await db.query.usersTable.findFirst();
    // console.log(users);

    //! Delete Data
    // await db.delete(usersTable);

    //! Insert Many Data
    //     const user = await db.insert(usersTable).values([
    //         { name: "John Doe", age: 30, email: "example@email.com", role: "ADMIN" },
    //         { name: "Jane Doe", age: 25, email: "example2@email.com" },
    //     ])
    //     .returning({ id: usersTable.id, userName: usersTable.name })
    //     .onConflictDoUpdate({ 
    //         target: usersTable.email,
    //         set: { name: "Updated Name" },
    //     }); 
    //     console.log(user);

    //! Querying Data
    // const users = await db.query.usersTable.findMany();
    // console.log(users);

    // const userFindFirst = await db.query.usersTable.findFirst({
    //     columns: {
    //         id: true,
    //     },
    // });
    // if (userFindFirst?.id) {
    //     const userPreferences = await db.insert(userPreferencesTable).values({
    //         emailUpdates: true,
    //         userId: userFindFirst.id,
    //     });
    //     console.log(userPreferences);
    // } else {
    //     console.log("User not found, cannot insert preferences.");
    // }

    // const user2 = await db.query.usersTable.findMany({
    //     columns: {
    //         name: true,
    //         age: true,
    //     },
    //     extras: {
    //         lowerCaseName: sql<string>`LOWER(${usersTable.name})`.as("lowerCaseName"),
    //     },
    //     // limit: 10,
    //     // offset: 1,
    //     with: {
    //         // preferences: true,
    //         preferences: {
    //             columns: {
    //                 emailUpdates: true,
    //             },
    //         },
    //         posts: {
    //             with: {
    //                 postsCategories: true
    //             },
    //         },
    //     },
    //     // orderBy: desc(usersTable.age),
    //     orderBy: (fields, { asc, desc }) => [
    //         desc(fields.age),
    //         asc(fields.name),
    //     ],
    //     where: (fields, { and, or, eq }) => and(
    //         or(
    //             and(
    //                 eq(fields.age, 30),
    //             ),
    //             and(
    //                 eq(fields.age, 25),
    //             ),
    //         ),
    //     ),
    // });

    // console.log(user2);

    // const user3 = await db.query.usersTable.findMany({
    //     columns: {
    //         email: false,
    //     },
    // });
    // console.log(user3);

    // ! Select Query
    // const user4 = await db
    // .select({ 
    //     id: usersTable.id, 
    //     age: usersTable.age ,
    //     emailUpdates: userPreferencesTable.emailUpdates,
    // })
    // .from(usersTable)
    // .where(eq(usersTable.age, 30))
    // .leftJoin(userPreferencesTable, eq(usersTable.id, userPreferencesTable.userId))
    // .orderBy(desc(usersTable.age));
    // console.log(user4);

    // const user5 = await db
    //     .select({
    //         age: usersTable.age,
    //         count: count(usersTable.age),
    //     })
    //     .from(usersTable)
    //     .groupBy(usersTable.age);
    // console.log(user5);

    // const user6 = await db
    //     .select({
    //         name: usersTable.name,
    //         count: count(usersTable.name),
    //     })
    //     .from(usersTable)
    //     .groupBy(usersTable.name)
    //     .having(column => gt(column.count, 1));
    // console.log(user6);

    // ! Update Query
    // await db.update(usersTable).set({
    //     name: "Updated Name #1",
    // }).where(eq(usersTable.age, 30));

    // const user7 = await db.query.usersTable.findMany();
    // console.log(user7);

    // ! Delete Query
    await db.delete(usersTable).where(eq(usersTable.age, 25));

    const user8 = await db.query.usersTable.findMany();
    console.log(user8);

}

main();