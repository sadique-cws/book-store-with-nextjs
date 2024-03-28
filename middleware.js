import { NextResponse } from "next/server";

export function middleware(request){
    let path = request.nextUrl.pathname;
    
    let publicPath = path  === "/login" || path === "/register";

    let token = request.cookies.get("token")?.value || "";

    if(publicPath && token){
        return NextResponse.redirect(new URL(`${path}`, request.nextUrl))
    }

    if(!publicPath && !token){
        return NextResponse.redirect(new URL("/login", request.nextUrl))
    }
}

export const config = {
    matcher : ["/cart", "/myorder"]
}