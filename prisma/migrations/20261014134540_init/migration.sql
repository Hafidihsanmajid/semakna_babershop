-- CreateTable
CREATE TABLE "Admin" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "SiteConfig" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT DEFAULT 1,
    "emblemText" TEXT NOT NULL DEFAULT 'HAIR SALON - EST. 1980',
    "heroTitle" TEXT NOT NULL DEFAULT 'SEMAKNA HAIRCUT & SHAVES',
    "heroSubtitle" TEXT NOT NULL DEFAULT 'Humour is powerful. It drives emotion and crafts timeless masculine style.',
    "heroBgUrl" TEXT NOT NULL DEFAULT '/images/hero-barber.jpg',
    "primaryCtaText" TEXT NOT NULL DEFAULT 'ABOUT US',
    "secondaryCtaText" TEXT NOT NULL DEFAULT 'NEWS FEED',
    "storyPreTitle" TEXT NOT NULL DEFAULT 'SEMAKNA BY THE BEST',
    "storyTitle" TEXT NOT NULL DEFAULT 'You''ll be sure to have an old fashioned time.',
    "storyHighlightWord" TEXT NOT NULL DEFAULT 'an old',
    "storyDescription" TEXT NOT NULL,
    "videoUrl" TEXT,
    "testimonialQuote" TEXT NOT NULL,
    "testimonialAuthor" TEXT NOT NULL DEFAULT 'Sakib Hosain',
    "testimonialRole" TEXT NOT NULL DEFAULT 'CEO of Organic',
    "testimonialAvatar" TEXT NOT NULL DEFAULT '/images/avatar.jpg',
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "CategoryPill" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "iconName" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "ServiceItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "iconName" TEXT NOT NULL,
    "price" TEXT,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_username_key" ON "Admin"("username");
