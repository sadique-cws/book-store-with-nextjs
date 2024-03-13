import { handleCatDelete } from '@/app/actions';
import InsertCategoryForm from '@/app/components/InsertCategoryForm';
import ConnectDb from '@/app/db/Connect'
import Category from '@/app/models/Category';

const page = async () => {
    ConnectDb();

    let callingCat = await Category.find();

    


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
                   { callingCat.map((cat, index) => {
                    let id = cat._id;
                    let handleCatDeletewithId = handleCatDelete.bind(null, id);
                    return(
                         <tr key={index}>
                            <td className='border p-2'>{index + 1}</td>
                            <td className='border p-2'>{cat.catTitle}</td>
                            <td className='border p-2'>{cat.catDesc}</td>
                            <td className='border p-2'>
                                <form action={handleCatDeletewithId} method="POST">
                                    <button type="submit" className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-800">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>

                                        </button>
                                </form>
                            </td>
                         </tr>
                   )})
                  }
                </tbody>
            </table>
        </div>
        <div className='w-1/3'>
            <div className="bg-slate-50 shadow-lg border border-slate-200 p-2">
                <InsertCategoryForm/>
            </div>
        </div>
       </div>
    </div>
  )
}

export default page