import BookCard from "@/app/components/BookCard";
import ViewBook from "@/app/components/ViewBook";
import ConnectDb from "@/app/db/Connect";
import Book from "@/app/models/Book";

const page = async ({params}) => {
    ConnectDb();
    let {bookid} = params;
    const book  = await Book.findById(bookid);
    const relatedBooks =await Book.find({"_id": {$ne : bookid}});

   
  return (
    
    <div className="px-[5%] flex flex-1 pt-16 flex-col">
        <ViewBook book={book}/>

        <div className="flex-1 flex-col flex gap-4">
            <h2 className="text-2xl font-semibold text-slate-600 mt-5">You May Also Like</h2>
            <div className="grid grid-cols-5 gap-3">
                {relatedBooks.map((book, i) => <BookCard book={book} key={i}/>)}
            </div>
        </div>
        
    </div>

  )
}

export default page