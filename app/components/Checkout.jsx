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
    let [address, setAddress] = useState([]);
    let [refresh, setRefresh] = useState(false);


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
    }, [refresh])




    // for total calculation
    const totalDiscountAmount = orderItems.reduce((acc, orderItem) => {
        return acc + orderItem.bookId.discountPrice * orderItem.quantity;
    }, 0);

    const taxAmount = totalDiscountAmount * 0.18;
    const TotalPayableAmount = totalDiscountAmount + taxAmount;

    const AddressValidationSchema = z.object({
        name: z.string(),
        contact: z.number().gte(10, { message: "Contact no must be in 10 digits" }),
        area: z.string().min(3).max(50),
        city: z.string().min(3).max(50),
        pincode: z.number().gte(6, { message: "Pincode must be in 6 digits" }),
        state: z.string().min(3).max(50),
        landmark: z.string().min(3).max(50),
    })

    const handleToCreateAddressClient = async (formData) => {

        formData.set("user", orderItems[0].userId._id);

        let records = {
            name: formData.get("name"),
            contact: +formData.get("contact"),
            area: formData.get("area"),
            city: formData.get("city"),
            state: formData.get("state"),
            landmark: formData.get("landmark"),
            pincode: +formData.get("pincode")
        };

        let data = AddressValidationSchema.safeParse(records);
        if (!data.success) {
            data.error.issues.forEach((issue) => {
                Toast.error(issue.path[0] + ": " + issue.message)
            });
            return;
        }

        await handleCreateAddresses(formData);
    }


    const handleUpdateAddress = async (address) => {
        let updateAddress = await fetch("http://127.0.0.1:3000/api/order", {method:"PUT", body:JSON.stringify({address}), cache:"no-cache"})
        let respAddress = await updateAddress.json();

        if(respAddress.order){
            alert("address updated success");
        }
    }
    return (
        <>
            <div className="flex flex-1 my-3">
                <h1 className="text-2xl font-semibold">Checkout</h1>
            </div>
            <div className='flex flex-1 gap-2'>
                <div className="w-4/6">
                    <div className="flex flex-col gap-1 shadow border p-3 mb-3">
                        <h2 className='border-b font-semibold'>Saved Address</h2>
                        {
                            (address.length > 0) && <div className="grid grid-cols-3 gap-3">
                            {
                                address.map((add, i) => (
                                    <div className=" flex-1 h-auto" key={i}>
                                <div className="px-4 py-2 shadow">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-semibold">{add.name}</h3>
                                        <input onClick={() => handleUpdateAddress(add._id)} type="radio" className="form-radio h-5 w-5 text-blue-500" name="address" id="home-address"/>
                                    </div>
                                    <p className='mt-1 text-sm text-slate-500'>{`(+91) ${add.contact}, ${add.area}, ${add.city} (${add.state}) - ${add.pincode}
                                    Landmark: ${add.landmark}
                                    `}</p>
                                </div>
                            </div>
                                ))
                            }
                        </div>
                        }

                        {address.length == 0 && <h4 className='mt-2 text-slate-600 text-2xl font-semibold'>No saved Address Yet </h4>}

                    </div>

                <div className='flex flex-col'>
                    <div className="flex flex-col gap-1 shadow border p-3">
                        <h2 className='border-b font-semibold'>Enter Delivery Address Details</h2>
                        <form action={handleToCreateAddressClient} method='post' className='flex flex-col gap-3'>
                            <div className='flex gap-2'>
                                <div className='flex-1'>
                                    <label htmlFor='name'>Full Name</label>
                                    <input type="text" name='name' id='name' className="border w-full px-3 py-2" />
                                </div>
                                <div className='flex-1'>
                                    <label htmlFor='contact'>Contact No</label>
                                    <input type="text" name='contact' id='contact' className="border w-full px-3 py-2" />
                                </div>
                            </div>
                            <div className='flex gap-2'>
                                <div className='flex-1'>
                                    <label htmlFor='area'>Street/Village/Area</label>
                                    <input type="text" name='area' id='area' className="border w-full px-3 py-2" />
                                </div>
                                <div className='flex-1'>
                                    <label htmlFor='landmark'>Landmark</label>
                                    <input type="text" name='landmark' id='landmark' className="border w-full px-3 py-2" />
                                </div>
                            </div>
                            <div className='flex gap-2'>
                                <div className='flex-1'>
                                    <label htmlFor='city'>City</label>
                                    <input type="text" name='city' id='city' className="border w-full px-3 py-2" />
                                </div>
                                <div className='flex-1'>
                                    <label htmlFor='state'>State</label>
                                    <input type="text" name='state' id='state' className="border w-full px-3 py-2" />
                                </div>
                                <div className='flex-1'>
                                    <label htmlFor='pincode'>pincode</label>
                                    <input type="text" name='pincode' id='pincode' className="border w-full px-3 py-2" />
                                </div>
                            </div>
                            <div className='flex gap-3'>
                                <button type="reset" className='bg-slate-200 text-black px-3 py-2 flex-1'>Clear Form</button>
                                <button type="submit" className='bg-teal-500 text-white px-3 py-2 flex-1'>Save Address</button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
            <div className="w-2/6">
                <div className='bg-white border rounded flex flex-col p-4 shadow-md mb-3'>
                    <h2 className='font-semibold border-b mt-2 pb-3'>Order Information</h2>
                    {
                        orderItems.map((orderItem, i) => (

                            <div className="w-full p-1" key={i}>
                                <div className="flex flex-col">
                                    <h2 className='text-sm'>{i + 1}. {orderItem.bookId.title}</h2>
                                    <div className='flex gap-2'>
                                        <div className='font-semibold'>
                                            <span class="">{orderItem.quantity}X</span>
                                            <span className="">{orderItem.bookId.discountPrice} = </span>
                                            <span className="">{orderItem.bookId.discountPrice * orderItem.quantity} </span>
                                        </div>
                                    </div>

                                </div>

                            </div>

                        )
                        )
                    }
                    <hr />
                    <div className='bg-white  rounded flex p-0 flex-col'>
                        <div className="flex flex-col gap-1">
                            <div className="flex justify-between p-1 mt-2">
                                <h3 className="text-xl font-bold">Total Payable Amount</h3>
                                <h3 className="text-xl font-bold">₹{TotalPayableAmount.toFixed(2)}</h3>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="flex gap-4 my-4">

                    <Link href="/payment" className='bg-green-600 text-white px-3 py-2 flex-1 text-center'>
                        Make Payment
                    </Link>
                </div>
            </div>
        </div >
    </>
  )
}

export default Checkout