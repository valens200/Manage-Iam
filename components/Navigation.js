import React from 'react'
import { useSelector } from 'react-redux'
function Navigation() {
  const showRegisterForm = useSelector((store) => store.user.showRegisterForm)
  const isLoggedIn = useSelector((store) => store.user.isLoggedIn)
  return (
    <div className="bg-black text-white font-bold p-4">
      <div className="flex  md:w-[80%] justify-between">
        <div className="w-[20%]">
          <h1>Home</h1>
        </div>
        <div className="w-[60%]">
          <p>Client Management App</p>
        </div>
        <div className="w-[20%]">
          <p>{isLoggedIn.username}</p>
        </div>
      </div>
    </div>
  )
}

export default Navigation
