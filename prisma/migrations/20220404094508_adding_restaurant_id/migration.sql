/*
  Warnings:

  - Added the required column `restaurantId` to the `Food` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Food" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "restaurantId" INTEGER NOT NULL
);
INSERT INTO "new_Food" ("id", "image", "price", "title") SELECT "id", "image", "price", "title" FROM "Food";
DROP TABLE "Food";
ALTER TABLE "new_Food" RENAME TO "Food";
CREATE UNIQUE INDEX "Food_title_key" ON "Food"("title");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
