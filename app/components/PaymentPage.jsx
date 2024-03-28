"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Toast from "react-hot-toast"
import { z } from 'zod'
import { handleCreateAddresses } from '../actions'

const Checkout = () => {

    let router = useRouter();

    let [orderItems, setOrderItems] = useState([]);
    let [orderData, setOrder] = useState([]);


    useEffect(() => {
        const callingData = async () => {
            try {
                const orderData = await fetch("http://127.0.0.1:3000/api/order", { cache: "no-cache" });
                const res = await orderData.json();
                setOrderItems(res.orderItems);

                // calling user address
                const addressData = await fetch("http://127.0.0.1:3000/api/address", {cache:"no-cache"})
                const addressResponse = await addressData.json();
                setAddress(addressResponse.address);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        callingData();
    }, [])




    // for total calculation
    const totalDiscountAmount = orderItems?.reduce((acc, orderItem) => {
        return acc + orderItem.bookId.discountPrice * orderItem.quantity;
    }, 0);

    const taxAmount = totalDiscountAmount * 0.18;
    const TotalPayableAmount = totalDiscountAmount + taxAmount;

    
    const makePayment = async () => {
        let order = await fetch("http://127.0.0.1:3000/api/order/payment",{method:"PUT"})
        order = await order.json();
        setOrder(order);
    }
    return (
        <>
           {
            orderData.length == 0 && <> <div className="flex flex-1 my-3">
            <h1 className="text-2xl font-semibold">Make Payment</h1>
        </div>
        <div className='flex flex-1 gap-2 flex-col'>
            <div className="w-5/12">
                <h3 className="text-xl font-bold">Total Payable Amount is . {TotalPayableAmount.toFixed(2)}</h3>
            </div>

            <div className='flex justify-center'>
                <div className='w-5/12 flex flex-col gap-2'>
                    <h2 className='text-lg my-4'>Choose Payment Mode</h2>
                    <button onClick={makePayment} className='hover:bg-green-500 border-2 hover:text-white px-3 py-2 flex-1 text-left'>
                        1. Cash On Delivery (COD)
                    </button>
                    <Link href="" className='hover:bg-green-500 border-2 hover:text-white px-3 py-2 flex-1 text-left disabled:text-slate-50'>
                        2. Pay Online
                    </Link>
                </div>
            </div>


        </div>
        </>
           }

          {
            orderData.length!= 0 && <> 
                <div className="flex flex-1 my-3 flex-col gap-5 justify-center border bg-white p-5">
                <h1 className="text-6xl text-center font-semibold text-green-600">wow!</h1>
                <h1 className="text-2xl font-semibold text-center">Order Placed Successfully</h1>
                <Link href="/myorder" className='bg-red-500 self-center text-white px-3 py-2 rounded'>My Order</Link>
                </div>
                </>
          }
          
    </>
  )
}

export default Checkout