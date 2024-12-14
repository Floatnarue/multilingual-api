-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" JSONB NOT NULL,
    "description" JSONB NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "defaultLang" TEXT NOT NULL DEFAULT 'en',

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);
