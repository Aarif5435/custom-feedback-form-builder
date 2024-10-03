/*
  Warnings:

  - You are about to drop the column `condition` on the `FeedbackForm` table. All the data in the column will be lost.
  - You are about to drop the column `fields` on the `FeedbackForm` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `FeedbackForm` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `Submission` table. All the data in the column will be lost.
  - You are about to drop the column `feedbackList` on the `Submission` table. All the data in the column will be lost.
  - You are about to drop the column `submittedAt` on the `Submission` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Submission` table. All the data in the column will be lost.
  - The `submitted` column on the `Submission` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "FeedbackForm" DROP COLUMN "condition",
DROP COLUMN "fields",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Submission" DROP COLUMN "content",
DROP COLUMN "feedbackList",
DROP COLUMN "submittedAt",
DROP COLUMN "userId",
DROP COLUMN "submitted",
ADD COLUMN     "submitted" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "Field" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "required" BOOLEAN NOT NULL,
    "errorMessage" TEXT,
    "options" TEXT[],
    "category" TEXT[],
    "formId" INTEGER NOT NULL,

    CONSTRAINT "Field_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Condition" (
    "id" SERIAL NOT NULL,
    "url" TEXT,
    "date" TIMESTAMP(3),
    "time" TEXT,
    "formId" INTEGER NOT NULL,

    CONSTRAINT "Condition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeedbackList" (
    "id" SERIAL NOT NULL,
    "submittedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "submissionId" INTEGER NOT NULL,

    CONSTRAINT "FeedbackList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Content" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "feedbackListId" INTEGER NOT NULL,

    CONSTRAINT "Content_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Field_formId_key" ON "Field"("formId");

-- CreateIndex
CREATE UNIQUE INDEX "Condition_formId_key" ON "Condition"("formId");

-- AddForeignKey
ALTER TABLE "Field" ADD CONSTRAINT "Field_formId_fkey" FOREIGN KEY ("formId") REFERENCES "FeedbackForm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Condition" ADD CONSTRAINT "Condition_formId_fkey" FOREIGN KEY ("formId") REFERENCES "FeedbackForm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeedbackList" ADD CONSTRAINT "FeedbackList_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "Submission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_feedbackListId_fkey" FOREIGN KEY ("feedbackListId") REFERENCES "FeedbackList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
