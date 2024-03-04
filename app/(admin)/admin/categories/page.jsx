import ConnectDb from '@/app/db/Connect'
import Category from '@/app/models/Category';
import { redirect } from 'next/navigation';
import React from 'react'

const page = async () => {
    ConnectDb();

    let callingCat = await Category.find();



const handleSubmit = async(formdata) => {
    "use server"
    let catTitle = formdata.get("catTitle");
    let catDesc = formdata.get("catDesc");

    let record = {catTitle, catDesc};

    let data = await Category.create(record);

    redirect("/admin/categories");

}
  return (
    <div className='flex gap-3 flex-col'>
        <div className='flex-1'>
                <h2 className='text-xl font-semibold'>Manage Categories ({callingCat.length})</h2>
        </div>
       <div className="flex gap-3 ">
       <div className='w-2/3'>
            <table className='border w-full'>
                <thead>
                    <tr>
                        <th className='border p-2'>Id</th>
                        <th className='border p-2'>CatTitle</th>
                        <th className='border p-2'>CatDescription</th>
                        <th className='border p-2'>Action</th>
                    </tr>
                </thead>
                <tbody>
                   { callingCat.map((cat, index) => (
                         <tr key={index}>
                            <td className='border p-2'>{index + 1}</td>
                            <td className='border p-2'>{cat.catTitle}</td>
                            <td className='border p-2'>{cat.catDesc}</td>
                            <td className='border p-2'>

                            </td>
                         </tr>
                   ))
                  }
                </tbody>
            </table>
        </div>
        <div className='w-1/3'>
            <div className="bg-slate-50 shadow-lg border border-slate-200 p-2">
                <form action={handleSubmit} method='POST'>
                    <div className="mb-3 flex flex-col">
                        <label htmlFor="catTitle">Category Title</label>
                        <input type="text" id="catTitle" name='catTitle' className="border px-3 py-2" />
                    </div>
                    <div className="mb-3 flex flex-col">
                        <label htmlFor="catDesc">Category Description</label>
                        <textarea rows={7}  id="catDesc" name='catDesc' className="border px-3 py-2"></textarea>
                    </div>
                    <div className="mb-3 flex flex-col">
                        <button type='submit' name='catDesc' className="bg-green-600 hover:bg-teal-600 px-3 py-2 rounded-lg">Create Category</button>
                    </div>
                </form>
            </div>
        </div>
       </div>
    </div>
  )
}

export default page