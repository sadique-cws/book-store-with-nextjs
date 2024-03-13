"use client"
import Link from 'next/link'
import React from 'react'

const HomeHeader = () => {
  return (
    <div className='bg-slate-700 flex flex-1 px-[10%] py-4 justify-between'>
        <Link href="/" className='text-white font-bold'>Book Store</Link>
 

        <div className="flex gap-5">
            <Link href="/" className='text-white font-semibold'>Home</Link>
            <Link href="/login" className='text-white font-semibold'>Login</Link>
            <Link href="/register" className='text-white font-semibold'>Register</Link>
        </div>
 
    </div>
  )
}

export default HomeHeader