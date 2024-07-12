import React from 'react'
import { useSelector } from 'react-redux'
export default function Profile() {
  const {currentUser} = useSelector(state => state.user)
  return (
    <div className='max-w-lg mx-auto p-3'>
      <h1 className='text-center my-7 font-semibold text-3xl'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <img src={currentUser.avatar} alt="Profile" className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2' />

        <input type="text" placeholder="username" id="username" className='boarder p-3 rounded-lg'/>
        <input type="text" placeholder="email" id="email" className='boarder p-3 rounded-lg'/>
        <input type="password" placeholder="password" id="password" className='boarder p-3 rounded-lg'/>
        <button
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
          update
        </button>
        
      </form>
      <div className='flex justify-between mt-5'>
          <span className='text-red-700'>Delete Account</span>
          <span className='text-red-700'>Sign Out</span>
      </div>
    </div>
  )
}
