import { cookies } from "next/headers";
import JWT from "jsonwebtoken";
import { NextResponse } from "next/server";

export const GET = async(req) => {
    let token = cookies().get("token")
    let user;
    if(token){
        user = JWT.verify(token.value, "myproject")
    }
    
    if(user && token){
        return NextResponse.json({message: 'logined', user: user, success:true}, {status:200})
    }
    else{
        return NextResponse.json({message: 'not logined', success:false}, {status:400})
    }
}