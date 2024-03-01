import Link from 'next/link'
import React from 'react'

const AdminHeader = () => {
  return (
    <div className='bg-slate-800 flex flex-1 px-[10%] py-4 justify-between'>
        <a href="" className='text-white font-bold'>Book Store</a>
 

        <div className="flex gap-5">
            <Link href="#" className='text-white font-semibold'>Home</Link>
            <Link href="#" className='text-white font-semibold'>Login</Link>
            <Link href="#" className='text-white font-semibold'>Register</Link>
        </div>
 
    </div>
  )
}

export default AdminHeader