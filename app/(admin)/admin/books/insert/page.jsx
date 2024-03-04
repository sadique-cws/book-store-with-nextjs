import ConnectDb from '@/app/db/Connect';
import Category from '@/app/models/Category';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'
import {join} from "path"
import { writeFile } from 'fs/promises';
import Book from '@/app/models/Book';

const page = async () => {

    ConnectDb();

    let callingCat  = await Category.find();


    const handleSubmit = async (formdata) => {
        "use server"
        let title = formdata.get("title");
        let author = formdata.get("author");
        let price = formdata.get("price");
        let discountPrice = formdata.get("discountPrice");
        let coverImage = formdata.get("coverImage");
        let description = formdata.get("description");
        let category = formdata.get("category");
        
        // image 
        let bytes = await coverImage.arrayBuffer();

        let buffer = Buffer.from(bytes);

        let path = join("./public", "books_image", coverImage.name);

        await writeFile(path, buffer);

        let data = await Book.create({title, author, price, discountPrice, coverImage: coverImage.name, description, category})

        redirect("/admin/books");


    }
    return (
        <div className='flex flex-col'>
            <div className='flex-1 flex justify-between items-center'>
                <h2 className='text-xl font-semibold'>Insert Book</h2>

                <Link href="/admin/books" className='bg-teal-600 hover:bg-teal-800 text-white px-3 py-2 rounded'>Go Back</Link>
            </div>
            <div className="flex flex-1 justify-center">

                <div className='w-full mt-3'>
                    <div className="bg-slate-50 shadow-lg border border-slate-200 p-2">
                        <form action={handleSubmit} method='POST'>
                            <div className="flex gap-3">
                                <div className="mb-3 flex flex-col flex-1">
                                    <label htmlFor="title">Title</label>
                                    <input type="text" id="title" name='title' className="border px-3 py-2" />
                                </div>
                                <div className="mb-3 flex flex-col flex-1">
                                    <label htmlFor="author">author</label>
                                    <input type="text" id="author" name='author' className="border px-3 py-2" />
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <div className="mb-3 flex flex-col flex-1">
                                    <label htmlFor="price">price</label>
                                    <input type="text" id="price" name='price' className="border px-3 py-2" />
                                </div>
                                <div className="mb-3 flex flex-col flex-1">
                                    <label htmlFor="discount_price">discount_price</label>
                                    <input type="text" id="discount_price" name='discountPrice' className="border px-3 py-2" />
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <div className="mb-3 flex flex-col flex-1">
                                    <label htmlFor="category">Category</label>
                                    <select id="category" name='category' className="border px-3 py-2">
                                            <option value="" selected disabled>select category</option>
                                            {callingCat.map((cat, i) => (<option value={cat._id}>{cat.catTitle}</option>))}
                                        </select>
                                </div>
                                <div className="mb-3 flex flex-col flex-1">
                                    <label htmlFor="cover_image">cover_image</label>
                                    <input type="file" id="cover_image" name='coverImage' className="border px-3 py-2" />
                                </div>
                            </div>
                            <div className="mb-3 flex flex-col">
                                <label htmlFor="description">Description</label>
                                <textarea rows={7} id="description" name='description' className="border px-3 py-2"></textarea>
                            </div>
                            <div className="mb-3 flex flex-col">
                                <button type='submit' className="bg-green-600 hover:bg-teal-600 px-3 py-2 rounded-lg">Insert Book</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page