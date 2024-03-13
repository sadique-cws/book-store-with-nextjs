import Link from 'next/link'
import React from 'react'

const CartPage = () => {
  return (
    <div className='flex flex-1 gap-2'>
        <div className="w-4/6">
            <div className='bg-white border rounded flex p-4 shadow-md'>
                <div className='w-3/12'>
                    <img className="w-full h-36 object-cover" src="/books_image/41eUu1vIpaL._SY445_SX342_.jpg"/>
                </div>
                <div className="w-9/12 p-3">
                    <div className="flex flex-col">
                        <h2 className='text-xl font-semibold'>Product Title</h2>
                        <h3 className="text-xs">Crime</h3>
                        <div className="flex flex-1 mt-3">
                            <Link href="" className='bg-red-500 text-white px-3 py-2 text-2xl rounded-lg'>-</Link>
                            <span class="px-3 py-2 text-2xl">2</span>
                            <Link href="" className='bg-green-500 text-white px-3 py-2 text-2xl rounded-lg'>+</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="w-2/6">
            <div className='bg-white border rounded flex p-4 shadow-md flex-col'>
                    <h2>Price Details</h2>
                    <div className="flex flex-col">
                        <div className="flex justify-between">
                            <h3 className="text-lg">Price</h3>
                            <h3 className="text-lg">$20</h3>
                        </div>
                        <div className="flex justify-between">
                            <h3 className="text-lg">Tax</h3>
                            <h3 className="text-lg">$10</h3>
                        </div>
                        <div className="flex justify-between">
                            <h3 className="text-lg">Discount</h3>
                            <h3 className="text-lg">$30</h3>
                        </div>
                        <div className="flex justify-between">
                            <h3 className="text-lg">Total</h3>
                            <h3 className="text-lg">$50</h3>
                        </div>
                    </div>
            </div>

            <div className="flex gap-4 my-4">
                <Link href="/" className='bg-indigo-600 text-white px-3 py-2 flex-1 text-center'>
                    More Shopping
                </Link>
                <Link href="" className='bg-green-600 text-white px-3 py-2 flex-1 text-center'>
                    Checkout
                </Link>
            </div>
        </div>
    </div>
  )
}

export default CartPage