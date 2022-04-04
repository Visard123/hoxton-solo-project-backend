/*
  Warnings:

  - You are about to drop the column `restaurantsId` on the `Food` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Food" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "price" REAL NOT NULL
);
INSERT INTO "new_Food" ("id", "image", "price", "title") SELECT "id", "image", "price", "title" FROM "Food";
DROP TABLE "Food";
ALTER TABLE "new_Food" RENAME TO "Food";
CREATE UNIQUE INDEX "Food_title_key" ON "Food"("title");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
