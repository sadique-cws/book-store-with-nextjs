import Book from "@/app/models/Book";
import Order from "@/app/models/Order";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import JWT from "jsonwebtoken";

export const GET = async (req, {params}) => {
    let {bookid} = params;
    const book  = await Book.findById(bookid);

    // if book not found
    if(!book){
        return NextResponse.json({message: 'Book not found'})
    }

    // let order = await Order.find({});
    let token = cookies().get("token")
    let user = JWT.verify(token.value, "myproject")

    let order = await Order.find({userId:user.id, ordered:false})

    if(order.length < 1){
        let newOrder = await Order.create({userId:user.id, ordered:false}) 
    }



    return NextResponse.json({book, order});
}