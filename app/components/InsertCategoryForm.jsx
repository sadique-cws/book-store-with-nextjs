"use client"
import { handleSubmit } from '../actions';
import {z} from "zod";
import Toast from 'react-hot-toast';

const InsertCategoryForm = () => {
    let category = z.object({
        catTitle: z.string().min(1, {message:"Required"}),
        catDesc: z.string().min(1, {message:"Required"})
    })

    let clientAction = async (formData) => {

        let records = {
            catTitle: formData.get("catTitle"),
            catDesc : formData.get("catDesc")
        }

        let data =  category.safeParse(records);

        if(!data.success){
            
            data.error.issues.forEach((issue) => {
                Toast.error(issue.path[0] + ": " + issue.message)
            });

            

            return;

        }
         await handleSubmit(formData);
    }
    return (
        <form action={clientAction} method='POST'>
            <div className="mb-3 flex flex-col">
                <label htmlFor="catTitle">Category Title</label>
                <input type="text" id="catTitle" name='catTitle' className="border px-3 py-2" />
            </div>
            <div className="mb-3 flex flex-col">
                <label htmlFor="catDesc">Category Description</label>
                <textarea rows={7} id="catDesc" name='catDesc' className="border px-3 py-2"></textarea>
            </div>
            <div className="mb-3 flex flex-col">
                <button type='submit' name='catDesc' className="bg-green-600 hover:bg-teal-600 px-3 py-2 rounded-lg">Create Category</button>
            </div>
        </form>
    )
}

export default InsertCategoryForm