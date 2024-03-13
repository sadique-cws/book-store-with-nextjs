"use client"

import { z } from "zod";
import Toast from "react-hot-toast";
import ConnectDb from "../db/Connect";
import { useRouter } from "next/navigation";

const LoginForm = () => {


    let router = useRouter();
    const handleLoginClientAction = async (formdata)=> {
        let records = {
            email: formdata.get("email"),
            password: formdata.get("password")
        };

        let data = await fetch("http://127.0.0.1:3000/api/login", {
            method:"POST", 
            body: JSON.stringify(records),
            headers: {
                "Content-Type": "application/json"
            }
        })

        let res = await data.json();

        if(!res.success){
            Toast.error(res.msg)
        }

        if(res.success){
            router.push("/");
        }
    }
   

  return (
    <form action={handleLoginClientAction} method='post'>
                 
                    <div className="mb-3 flex flex-col gap-2">
                        <label htmlFor="email">email</label>
                        <input type="text" className='border px-2 py-2 rounded w-full' name='email' id='email' placeholder='Enter Email'/>
                    </div>
                    <div className="mb-3 flex flex-col gap-2">
                        <label htmlFor="password">password</label>
                        <input type="text" className='border px-2 py-2 rounded w-full' name='password' id='password' placeholder='Enter Password'/>
                    </div>
                    <div className="mb-3 flex flex-col">
                        <button type='submit' className='text-white bg-teal-600 hover:bg-teal-900 px-3 py-2 rounded'>Create an Account</button>
                    </div>
                </form>
  )
}

export default LoginForm