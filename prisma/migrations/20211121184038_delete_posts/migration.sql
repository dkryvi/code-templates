/*
  Warnings:

  - You are about to drop the column `coverImage` on the `Collection` table. All the data in the column will be lost.
  - You are about to drop the column `coverImage` on the `CollectionDictionary` table. All the data in the column will be lost.
  - You are about to drop the `Author` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OgImage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `image` to the `Collection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `CollectionDictionary` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_ogImageId_fkey";

-- AlterTable
ALTER TABLE "Collection" DROP COLUMN "coverImage",
ADD COLUMN     "image" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "CollectionDictionary" DROP COLUMN "coverImage",
ADD COLUMN     "image" TEXT NOT NULL;

-- DropTable
DROP TABLE "Author";

-- DropTable
DROP TABLE "OgImage";

-- DropTable
DROP TABLE "Post";
