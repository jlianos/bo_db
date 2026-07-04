-- CreateTable
CREATE TABLE "Menu" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "mainText" TEXT,
    "subText" TEXT
);

-- CreateTable
CREATE TABLE "MenuItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "iconColor" TEXT NOT NULL,
    "kind" TEXT NOT NULL DEFAULT 'ITEM',
    "params" JSONB
);

-- CreateTable
CREATE TABLE "MenuItemPerMenu" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "menuId" INTEGER NOT NULL,
    "menuItemId" INTEGER NOT NULL,
    "parentId" INTEGER,
    "order" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "MenuItemPerMenu_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MenuItemPerMenu_menuItemId_fkey" FOREIGN KEY ("menuItemId") REFERENCES "MenuItem" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "MenuItemPerMenu_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "MenuItemPerMenu" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Menu_code_key" ON "Menu"("code");

-- CreateIndex
CREATE UNIQUE INDEX "MenuItem_code_key" ON "MenuItem"("code");

-- CreateIndex
CREATE INDEX "MenuItemPerMenu_menuId_idx" ON "MenuItemPerMenu"("menuId");

-- CreateIndex
CREATE INDEX "MenuItemPerMenu_parentId_idx" ON "MenuItemPerMenu"("parentId");

-- CreateIndex
CREATE UNIQUE INDEX "MenuItemPerMenu_menuId_menuItemId_key" ON "MenuItemPerMenu"("menuId", "menuItemId");
