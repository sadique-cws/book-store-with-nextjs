import BookCard from "@/app/components/BookCard";
import CategoryBadges from "@/app/components/CategoryBadges";
import ConnectDb from "@/app/db/Connect";
import Book from "@/app/models/Book";
import Category from "@/app/models/Category";
import Link from "next/link";

export default async function Home({params}) {
  ConnectDb();
  let {cat_id} = params;
  let callingCategory = await Category.find();
  let getCurrentCategory = await Category.findById(cat_id);
  let callingBooks = await Book.find({category:cat_id});
  return (
      <>
      <div className="px-[10%] mt-4">
      <CategoryBadges data={callingCategory}/>

        <div class="flex-1 flex mt-5">
          <h1 className="text-slate-600 font-bold  text-3xl capitalize">{getCurrentCategory.catTitle} Book (4)</h1>
        </div>
        <div className="grid grid-cols-4 gap-4 justify-center mt-5">
          {callingBooks.map((book, index) =>  <BookCard book={book} key={index}/>)}
        </div>
      </div>


      </>
  );
}
