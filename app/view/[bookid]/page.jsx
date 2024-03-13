import BookCard from "@/app/components/BookCard";
import Book from "@/app/models/Book";

const page = async ({params}) => {
    let {bookid} = params;
    const book  = await Book.findById(bookid);
    const relatedBooks =await Book.find({"_id": {$ne : bookid}});
  return (
    
    <div className="px-[5%] flex flex-1 pt-16 flex-col">
        <div class="flex-1 flex bg-white border border-gray-300 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="flex-1">
        <img class=" rounded-t-lg flex-1 w-full h-auto object-cover" src={`/books_image/${book.coverImage}`} alt="product image" />
        </div>
    <div class="p-5 flex-[1.5]">
        <a href="#">
            <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white truncate capitalize">{book.title.toLowerCase()}</h5>
            <h6 class="text-sm font-light tracking-tight text-gray-900 dark:text-white">{book.author}</h6>
        </a>
       
        <div class="flex gap-3 justify-between flex-col mt-5">

            <div class="flex flex-col">
            <div className="flex flex-1 flex-col  my-5">
            <h4 className="text-sm font-semibold">Description</h4>
            <p className="text-justify">{book.description}</p>
            </div>
            <span class="text-2xl font-bold text-gray-900 dark:text-white">₹{book.discountPrice}</span>
            <span class="text-sm font-light text-gray-900 dark:text-white">MRP: <del>₹{book.price}</del></span>
            </div>

            <div className="flex gap-3">
            <a href="#" class="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800 flex gap-2 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
</svg>

                <span>Add To Cart</span></a>
            <a href="#" class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 flex items-center justify-between">
                
                <span>Buy Now</span>
                
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
</svg>

</a>
            </div>
        </div>
    </div>
        </div>

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