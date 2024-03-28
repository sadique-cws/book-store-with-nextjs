
import JWT from "jsonwebtoken";
import ConnectDb from "@/app/db/Connect";
import Order from "@/app/models/Order";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

ConnectDb();

export const PUT = async (req) => {

    let token = cookies().get("token")
    let user = JWT.verify(token.value, "myproject")


    let order;
    order = await Order.findOneAndUpdate({userId:user.id, ordered:false}, {ordered:true})

    if(!order){
        return NextResponse.json({msg:"order not found"}, {status: 400})
    }


    return NextResponse.json({order});
}