import React from 'react'
import { Link } from 'react-router-dom'

export default function SignUp() {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Sign Up
      </h1>
      
      <form className='flex flex-col gap-4'>

      <input type="text" placeholder='Username' id='username' className='border p-3 rounded-lg'/>

      <input type="text" placeholder='Email' id='email' className='border p-3 rounded-lg'/>

      <input type="text" placeholder='Password' id='password' className='border p-3 rounded-lg'/>
      
      <button type='submit' className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Sign Up</button>

      </form>

      <div className='flex gap-4 mt-2'>

        <p>Have an account?</p>
        <Link to={"/sign-in"}>
        <span className='text-blue-700'>Login</span> 
        </Link>

      </div>

    </div>
  )
}
