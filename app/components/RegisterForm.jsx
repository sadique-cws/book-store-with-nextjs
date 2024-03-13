"use client"

import { z } from "zod";
import { handleCreateAnAccount } from "../actions";
import Toast from "react-hot-toast";
import bcrypt from "bcryptjs"; 
import ConnectDb from "../db/Connect";

const RegisterForm = () => {


    let registerSchema = z.object({
        name: z.string({
            required_error:"username is required",
            invalid_type_error:"username must be string"
        }),
        email: z.string({
            required_error:"email is required",
            invalid_type_error:"email must be string"
        }).email(),
        password: z.string({
            required_error:"password is required",
            invalid_type_error:"password must be string"
        }).min(5),
        contact: z.number().gte(10, {message: "Contact no must be in 10 digits"})
    })

    const handleCreateAnAccountClientArea = async (formdata) => {

        let name = formdata.get("name");
        let email = formdata.get("email");

       let password = formdata.get("password");
        
        let contact = +formdata.get("contact");

        
        let record = {name, email, password, contact};

        let data = registerSchema.safeParse(record);

        if(!data.success) {
            
            data.error.issues.forEach((issue) => {
                Toast.error(issue.path[0] + ": " + issue.message)
            });
            return;
        }

        await handleCreateAnAccount(formdata);
    };

  return (
    <form action={handleCreateAnAccountClientArea} method='post'>
                    <div className="mb-3 flex flex-col gap-2">
                        <label htmlFor="name">Name</label>
                        <input type="text" className='border px-2 py-2 rounded w-full' name='name' id='name' placeholder='Enter your name'/>
                    </div>
                    <div className="mb-3 flex flex-col gap-2">
                        <label htmlFor="contact">contact</label>
                        <input type="text" className='border px-2 py-2 rounded w-full' name='contact' id='contact' placeholder='Enter your Contact'/>
                    </div>
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

export default RegisterForm