
import JWT from "jsonwebtoken";
import ConnectDb from "@/app/db/Connect";
import Order from "@/app/models/Order";
import { NextResponse } from "next/server";
import OrderItem from "@/app/models/OrderItem";
import { cookies } from "next/headers";

ConnectDb();

export const GET = async (req, res) => {
    let token = cookies().get("token")
    let user = JWT.verify(token.value, "myproject")

    let order;
    order = await Order.findOne({userId:user.id, ordered:false})

    if(!order){
        return NextResponse.json({msg:"order not found"}, {status: 400})
    }

    let orderItems = await OrderItem.find({OrderId: order._id, userId: user.id}).populate(["bookId","userId","OrderId"])

    return NextResponse.json({orderItems});
}

export const PUT = async (req) => {
    let record = await req.json();
    let token = cookies().get("token")
    let user = JWT.verify(token.value, "myproject")

    let {address} = record;

    let order;
    order = await Order.findOneAndUpdate({userId:user.id, ordered:false}, {address})

    if(!order){
        return NextResponse.json({msg:"order not found"}, {status: 400})
    }


    return NextResponse.json({order});
}