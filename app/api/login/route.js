import User from "@/app/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import JWT from "jsonwebtoken";
import ConnectDb from "@/app/db/Connect";

ConnectDb();

export const POST = async (req) => {
    const records = await req.json();

    let { email, password } = records;

    try {
        let user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ "msg": "invalid email addresss" }, { status: 400 })
        }

        let validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return NextResponse.json({ "msg": "invalid password" }, { status: 400 })
        }

        let tokenData = {
            id: user._id,
            email: user.email
        }

        let token = JWT.sign(tokenData, "myproject", { expiresIn: "1h" })

        const response = NextResponse.json({ "msg": "login successfully", success: true })

        response.cookies.set("token", token, { httpOnly: true })

        return response
    }
    catch (error) {
        return NextResponse.json({ "msg": error.message }, { status: 400 })
    }
};