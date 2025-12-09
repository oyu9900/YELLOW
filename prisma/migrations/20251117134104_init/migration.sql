-- CreateTable
CREATE TABLE "YellowBookEntry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fullName" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "department" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "lat" REAL,
    "lng" REAL,
    "avatarUrl" TEXT
);

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "YellowBookEntry_email_key" ON "YellowBookEntry"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
