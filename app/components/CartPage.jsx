"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Toast from "react-hot-toast"

const CartPage = () => {

    let router = useRouter();

    let [orderItems, setOrderItems] = useState([]);
    let [refresh, setRefresh] = useState(false);

    
    useEffect(() => {
        const callingData = async () => {
            try {
                const orderData = await fetch("http://127.0.0.1:3000/api/order", { cache: "no-cache" });
                const res = await orderData.json();
                setOrderItems(res.orderItems);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
           callingData();
    }, [refresh])

    const addMoreQty = async (id) => {
        let data = await fetch(`http://127.0.0.1:3000/api/cart/add/${id}`)
        let res =  await data.json();
        if(res.success){
            setRefresh(!refresh);
        } 
    }
    const minusQty = async (id) => {
        let data = await fetch(`http://127.0.0.1:3000/api/cart/minus/${id}`)
        let res =  await data.json();
        if(res.success){
            setRefresh(!refresh);
        } 
    }

    // for total calculation
    const totalAmount = orderItems?.reduce((acc, orderItem) => {
        return acc + orderItem.bookId.price * orderItem.quantity;
    }, 0);

    const totalDiscountAmount = orderItems?.reduce((acc,orderItem) => {
        return acc + orderItem.bookId.discountPrice * orderItem.quantity;
    }, 0);

    const discountAmount = totalAmount - totalDiscountAmount;
    const taxAmount = totalDiscountAmount * 0.18;
    const TotalPayableAmount = totalDiscountAmount + taxAmount;

  return (
    <>
    <div className="flex flex-1 my-3">
        <h1 className="text-2xl font-semibold">Your Cart ({orderItems?.length ?? "0"})</h1>
    </div>
    <div className='flex flex-1 gap-2'>
        <div className="w-4/6">
            {!orderItems && <h1 className='text-red-300 text-3xl font-sans'> Cart Empty </h1>}

          {
            orderItems && 
            orderItems.map((orderItem, i) => (
                <div key={i} className='bg-white border rounded flex p-4 shadow-md mb-3'>
                <div className='w-2/12'>
                    <img className="w-full h-[170px] object-cover" src={`/books_image/${orderItem.bookId.coverImage}`}/>
                </div>
                <div className="w-10/12 p-3">
                    <div className="flex flex-col">
                        <h2 className='text-xl font-semibold'>{orderItem.bookId.title}</h2>
                        <h3 className="text-xs">{orderItem.bookId.category}</h3>
                        <div className='flex gap-2'>
                            <div className='my-2'>
                                <span className="font-bold">₹{orderItem.bookId.discountPrice} </span>
                                <del className='text-slate-600'>₹{orderItem.bookId.price}/-</del></div>
                        </div>
                        <div className="flex flex-1 mt-3">
                            <button onClick={() => minusQty(orderItem.bookId._id)} className='bg-red-500 text-white px-3 py-2 text-2xl rounded-lg'>-</button>
                            <span class="px-3 py-2 text-2xl">{orderItem.quantity}</span>
                            <button type='button' onClick={() => addMoreQty(orderItem.bookId._id)} className='bg-green-500 text-white px-3 py-2 text-2xl rounded-lg'>+</button>
                        </div>
                    </div>

                </div>
            </div>
            ) 
            )
          }
        </div>
        {
            orderItems && <div className="w-2/6">
            <div className='bg-white border rounded flex p-4 shadow-md flex-col'>
                    <h2 className='font-bold border-b'>Price Details</h2>
                    <div className="flex flex-col gap-1">
                        <div className="flex justify-between p-2">
                            <h3 className="text-lg">Total Amount</h3>
                            <h3 className="text-lg">₹{totalAmount.toFixed(2)}</h3>
                        </div>
                        <div className="flex justify-between p-2">
                            <h3 className="text-lg">Tax (GST 18%)</h3>
                            <h3 className="text-lg">₹{taxAmount.toFixed(2)}</h3>
                        </div>
                        <div className="flex justify-between bg-green-500 text-white p-2">
                            <h3 className="text-lg">Discount</h3>
                            <h3 className="text-lg">₹{discountAmount.toFixed(2)}</h3>
                        </div>
                        <div className="flex justify-between p-2">
                            <h3 className="text-xl font-bold">Total Payable Amount</h3>
                            <h3 className="text-xl font-bold">₹{TotalPayableAmount.toFixed(2)}</h3>
                        </div>
                    </div>
            </div>

            <div className="flex gap-4 my-4">
                <Link href="/" className='bg-indigo-600 text-white px-3 py-2 flex-1 text-center'>
                    More Shopping
                </Link>
                <Link href="/checkout" className='bg-green-600 text-white px-3 py-2 flex-1 text-center'>
                    Checkout
                </Link>
            </div>
        </div>
        }
    </div>
    </>
  )
}

export default CartPage