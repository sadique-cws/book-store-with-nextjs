import InsertBookForm from '@/app/components/InsertBookForm';
import Link from 'next/link';
import Category from '@/app/models/Category';
import ConnectDb from '@/app/db/Connect';

const page = async () => {
    ConnectDb();
    let callingCat  = await Category.find();
    
    
    return (
        <div className='flex flex-col'>
            <div className='flex-1 flex justify-between items-center'>
                <h2 className='text-xl font-semibold'>Insert Book</h2>

                <Link href="/admin/books" className='bg-teal-600 hover:bg-teal-800 text-white px-3 py-2 rounded'>Go Back</Link>
            </div>
            <div className="flex flex-1 justify-center">

                <div className='w-full mt-3'>
                    <div className="bg-slate-50 shadow-lg border border-slate-200 p-2">
                       <InsertBookForm callingCat={callingCat}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page