import Image from "next/image";
import Category from "./models/Category";
import ConnectDb from "./db/Connect";
import Link from "next/link";
import Book from "./models/Book";
import CategoryBadges from "./components/CategoryBadges";
import BookCard from "./components/BookCard";

export default async function Home() {
  ConnectDb();
  let callingCategory = await Category.find();
  let callingBooks = await Book.find();
  return (
      <>
      <div className="flex flex-1 bg-[url('/images/cover.jpg')] h-[400px] justify-center items-center">
          <div className="w-1/2 flex flex-col gap-2">
              <h1 className="text-white text-2xl font-semibold">Find your Fvt Book</h1>
              <input type="search" className="border px-4 py-3 rounded-md" placeholder="Search by title, author, category etc"/>
              <input type="submit" className="bg-white text-black rounded px-3 py-2 hover:bg-white self-center" value="Search Book"/>
          </div>
      </div>

      <div className="px-[10%] mt-4">
       <CategoryBadges data={callingCategory}/>
        <div class="flex-1 flex mt-5">
          <h1 className="text-slate-600 font-bold  text-3xl">Latest Books (4)</h1>
        </div>
        <div className="grid grid-cols-4 gap-4 justify-center mt-5">
            {callingBooks.map((book, index) => <BookCard key={index} book={book}/>)}
        </div>
      </div>


      </>
  );
}
