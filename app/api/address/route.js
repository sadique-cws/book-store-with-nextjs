
import JWT from "jsonwebtoken";
import ConnectDb from "@/app/db/Connect";
import { NextResponse } from "next/server";
import OrderItem from "@/app/models/OrderItem";
import { cookies } from "next/headers";
import Address from "@/app/models/Address";

ConnectDb();

export const GET = async (req, res) => {
    let token = cookies().get("token")
    let user = JWT.verify(token.value, "myproject")

    let address = await Address.find({user:user.id})
    return NextResponse.json({address});
}