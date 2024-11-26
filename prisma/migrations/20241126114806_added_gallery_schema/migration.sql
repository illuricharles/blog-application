-- CreateTable
CREATE TABLE "gallery" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "image_key" TEXT NOT NULL,

    CONSTRAINT "gallery_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "gallery_image_url_key" ON "gallery"("image_url");

-- CreateIndex
CREATE UNIQUE INDEX "gallery_image_key_key" ON "gallery"("image_key");

-- AddForeignKey
ALTER TABLE "gallery" ADD CONSTRAINT "gallery_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
