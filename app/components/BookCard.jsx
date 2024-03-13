import React from 'react'

const BookCard = ({book}) => {
  return (
    <div class="w-full max-w-sm bg-white border border-gray-300 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        <img class=" rounded-t-lg w-full h-[350px] object-cover" src={`/books_image/${book.coverImage}`} alt="product image" />
    </a>
    <div class="p-5">
        <a href="#">
            <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white truncate capitalize">{book.title.toLowerCase()}</h5>
            <h6 class="text-sm font-light tracking-tight text-gray-900 dark:text-white">{book.author}</h6>
        </a>
       
        <div class="flex gap-3 justify-between flex-col mt-5">
            
            <div class="flex flex-col">
            <span class="text-2xl font-bold text-gray-900 dark:text-white">₹{book.discountPrice}</span>
            <span class="text-sm font-light text-gray-900 dark:text-white">MRP: <del>₹{book.price}</del></span>
            </div>

            <a href={`/view/${book._id}`} class="text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-teal-600 dark:hover:bg-blue-700 dark:focus:ring-teal-800">Know More</a>
        </div>
    </div>
</div> 
  )
}

export default BookCard