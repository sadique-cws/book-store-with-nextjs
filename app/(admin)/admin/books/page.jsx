import { handleBookDelete } from '@/app/actions';
import ConnectDb from '@/app/db/Connect'
import Book from '@/app/models/Book';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const page = async () => {
    ConnectDb();

    let callingBook = await Book.find().populate('category');

  return (
    <div className='flex gap-3 flex-col'>
        <div className='flex-1 flex justify-between items-center'>
                <h2 className='text-xl font-semibold'>Manage Books ({callingBook.length})</h2>

                <Link href="/admin/books/insert" className='bg-teal-600 hover:bg-teal-800 text-white px-3 py-2 rounded'>Add Book</Link>
        </div>
       <div className="flex gap-3 ">
       <div className='w-full'>
            <table className='border w-full'>
                <thead>
                    <tr>
                        <th className='border p-2'>Id</th>
                        <th className='border p-2'>title</th>
                        <th className='border p-2'>Author</th>
                        <th className='border p-2'>Price</th>
                        <th className='border p-2'>category</th>
                        <th className='border p-2'>cover_image</th>
                        <th className='border p-2'>Action</th>
                    </tr>
                </thead>
                <tbody>
                   { callingBook.map((book, index) => {
                    let id = book._id;
                    let handleDeleteWithId = handleBookDelete.bind(null, id);

                    return(
                        <tr key={index}>
                           <td className='border p-2'>{index + 1}</td>
                           <td className='border p-2'>{book.title}</td>
                           <td className='border p-2'>{book.author}</td>
                           <td className='border p-2'>{book.price} {book.discountPrice}</td>
                           <td className='border p-2'>{book.category.catTitle}</td>
                           <td className='border p-2'>
                               <Image width={50} height={50} className='object-cover' src={`/books_image/${book.coverImage}`}/>

                           </td>
                           <td className='border p-2'>
                               {/* action buttons */}
                               <form action={handleDeleteWithId} method="POST">
                                   <input type="submit" value="delete" className='bg-red-500 hover:bg-red-700 text-white px-3 py-2 rounded' />
                               </form>
                           </td>
                          
                        </tr>
                  )
                   })
                  }
                </tbody>
            </table>
        </div>
       </div>
    </div>
  )
}

export default page