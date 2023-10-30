-- CreateTable
CREATE TABLE "Cuisine" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "_CuisineToRecipe" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_CuisineToRecipe_A_fkey" FOREIGN KEY ("A") REFERENCES "Cuisine" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CuisineToRecipe_B_fkey" FOREIGN KEY ("B") REFERENCES "Recipe" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Cuisine_id_key" ON "Cuisine"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_CuisineToRecipe_AB_unique" ON "_CuisineToRecipe"("A", "B");

-- CreateIndex
CREATE INDEX "_CuisineToRecipe_B_index" ON "_CuisineToRecipe"("B");
