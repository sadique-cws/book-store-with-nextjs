import React from 'react'
import LoginForm from '../components/LoginForm'

const page = () => {
  return (
    <div className='px=[15] flex flex-1 justify-center h-screen items-center'>
        <div className='w-1/3'>
            <div className='p-4 bg-slate-100 border shadow mt-3'>
            <h1 className='text-xl font-semibold mb-3'>Login Here</h1>
                <LoginForm/>
            </div>
        </div>
    </div>
  )
}

export default page