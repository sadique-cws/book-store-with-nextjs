"use client"

import { z } from "zod"
import { handleSubmit, handleSubmitToInsertBook } from "../actions"
import toast from "react-hot-toast"

const InsertBookForm =  ({callingCat}) => {

    let bookValidationSchema = z.object({
        title: z.string({
            required_error:"title is required",
            invalid_type_error:"title must be string"
        }),
        author: z.string(),
        price: z.number(),
        discountPrice: z.number(),
        coverImage: z.string(),
        description: z.string(),
        category: z.string()
    })
    

    const InsertBookClientAction = async(formdata) => {

        let records = {
            "title" : formdata.get("title"),
            "author" : formdata.get("author"),
            "price" : +formdata.get("price"),
            "discountPrice" : parseInt(formdata.get("discountPrice")),
            "coverImage" : formdata.get("coverImage").name,
            "description" : formdata.get("description"),
            "category" : formdata.get("category"),
        }
        let data = bookValidationSchema.safeParse(records);

        if(!data.success){
            data.error.issues.forEach(err => {
                toast.error(err.path[0] + ":"  + err.message)
            })

            return;
        }
        await handleSubmitToInsertBook(formdata);
    }
  return (
    <form action={InsertBookClientAction} method='post'>
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
  )
}

export default InsertBookForm