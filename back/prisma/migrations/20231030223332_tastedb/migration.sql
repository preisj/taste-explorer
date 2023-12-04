/*
  Warnings:

  - Added the required column `qtd` to the `Ingredient` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Ingredient" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "tags" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "qtd" TEXT NOT NULL
);
INSERT INTO "new_Ingredient" ("createdAt", "id", "name", "tags", "updatedAt") SELECT "createdAt", "id", "name", "tags", "updatedAt" FROM "Ingredient";
DROP TABLE "Ingredient";
ALTER TABLE "new_Ingredient" RENAME TO "Ingredient";
CREATE UNIQUE INDEX "Ingredient_id_key" ON "Ingredient"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
