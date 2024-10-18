-- CreateTable
CREATE TABLE "_ChatToPerson" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ChatToPerson_AB_unique" ON "_ChatToPerson"("A", "B");

-- CreateIndex
CREATE INDEX "_ChatToPerson_B_index" ON "_ChatToPerson"("B");

-- AddForeignKey
ALTER TABLE "_ChatToPerson" ADD CONSTRAINT "_ChatToPerson_A_fkey" FOREIGN KEY ("A") REFERENCES "Chat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChatToPerson" ADD CONSTRAINT "_ChatToPerson_B_fkey" FOREIGN KEY ("B") REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;
