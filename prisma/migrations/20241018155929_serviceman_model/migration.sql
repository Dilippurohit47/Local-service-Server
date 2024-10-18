-- CreateTable
CREATE TABLE "serviceMan" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(191) NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNo" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "profileUrl" TEXT NOT NULL,
    "services" JSONB[],
    "workingPhoneNo" TEXT NOT NULL,

    CONSTRAINT "serviceMan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "serviceMan_email_key" ON "serviceMan"("email");

-- CreateIndex
CREATE UNIQUE INDEX "serviceMan_phoneNo_key" ON "serviceMan"("phoneNo");
