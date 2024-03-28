import { cookies } from "next/headers"
import Order from "../models/Order"
import OrderItem from "../models/OrderItem"
import JWT from "jsonwebtoken"

const page = async () => {
    let token = cookies().get("token")
    let user = JWT.verify(token.value, "myproject")
    let orders = await Order.find({ userId: user.id, ordered: true })

    async function getOrderItems(id) {
        let orderItems = await OrderItem.find({OrderId:id}).populate(["bookId"])
        return orderItems;
    }

    return (
        <div>
            <div className="flex px-[10%] mt-5 flex-col">
                <h1 className="text-2xl font-semibold">My Order</h1>
                {orders.length > 0 && <div className="flex">
                    <div className="flex-1 flex-col">
                        {
                            orders.map(async (order, index) => {

                                let oi = await getOrderItems(order._id);
                                return (
                                    <div className="mb-3 border border-slate-500">
                                        <div className="bg-slate-100 p-3">
                                            <div className="flex justify-between">
                                                <span>OrderId: {order._id}</span>
                                                <span>Order Date: {order.dateOfOrder.toLocaleString()}</span>
                                            </div>
                                        </div>
                                        <div className='bg-white border rounded flex flex-col p-4'>
                                            {
                                                oi.map((item) => (
                                                    <div className='p-2 flex'>
                                                     <div className='w-1/12'>
                                                        <img className="w-full h-[100px] object-cover" src={`/books_image/${item.bookId.coverImage}`} />
                                                    </div>
                                                    <div className="w-10/12 p-3">
                                                        <h6>{item.bookId.title}</h6>
                                                        <div className='my-2'>
                                <span className="font-bold">₹{item.bookId.discountPrice} </span>
                                <del className='text-slate-600'>₹{item.bookId.price}/-</del></div>
                                                    </div>
                                                    </div>
                                                ))
                                                
                                            }
                                        </div>
                                        <div className="bg-slate-100 p-3">
                                            <div className="flex justify-between">
                                                <span>Total Amount: </span>
                                                <span>Status: </span>
                                            </div>
                                        </div>
                                    </div>)
                            })
                        }
                    </div>
                </div>}


                {orders.length < 1 && <h1 className="text-slate-300 text-4xl mt-10 font-black">No Order Found</h1>}
            </div>
        </div>
    )
}

export default page