/*
  Warnings:

  - Added the required column `postID` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Comment] ALTER COLUMN [parentID] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[Comment] ADD CONSTRAINT [Comment_likes_df] DEFAULT 0 FOR [likes];
ALTER TABLE [dbo].[Comment] ADD [deletedAt] DATETIME2,
[postID] NVARCHAR(1000) NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[User] ADD [deletedAt] DATETIME2;

-- CreateTable
CREATE TABLE [dbo].[Post] (
    [id] NVARCHAR(1000) NOT NULL,
    [title] NVARCHAR(1000) NOT NULL,
    [body] NVARCHAR(1000) NOT NULL,
    [deletedAt] DATETIME2,
    [userID] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Post_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[Post] ADD CONSTRAINT [Post_userID_fkey] FOREIGN KEY ([userID]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Comment] ADD CONSTRAINT [Comment_parentID_fkey] FOREIGN KEY ([parentID]) REFERENCES [dbo].[Comment]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Comment] ADD CONSTRAINT [Comment_userID_fkey] FOREIGN KEY ([userID]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Comment] ADD CONSTRAINT [Comment_postID_fkey] FOREIGN KEY ([postID]) REFERENCES [dbo].[Post]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
