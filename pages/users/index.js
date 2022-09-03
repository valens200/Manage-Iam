import Navigation from '../../components/Navigation'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import RegisterUserForm from '../../components/RegisterUserForm'
import NewUser from '../../components/NewUser'

import {
  changeUpdateForm,
  setUserTobeUpdated,
  changeRegisterForm,
  setUsers,
} from '../../features/users/userSlice'
import { clearAllListeners } from '@reduxjs/toolkit'
const Home = (props) => {
  useEffect(() => {
    dispatch(setUsers(props.users.users))
  }, [])
  const inputs = useSelector((store) => store.user.formInputs)
  const showUpdateForm = useSelector((store) => store.user.showUpdateForm)
  const showRegisterForm = useSelector((store) => store.user.showRegisterForm)
  const users = useSelector((store) => store.user.users)
  const dispatch = useDispatch()
  const dispatchMethods = (data) => {
    dispatch(changeUpdateForm('open'))
    dispatch(setUserTobeUpdated(data))
    dispatch(changeRegisterForm('close'))
  }

  const clearAllListenersll = async () => {
    try {
      const data = await fetch('http://localhost:3000/api/users/deleteAll', {
        method: 'DELETE',
      })
    } catch (err) {
      console.log(err)
    }
  }

  const deleteUser = async (id) => {
    try {
      const response = await fetch(`/api/users/?userId=${id}`, {
        method: 'DELETE',
      })
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div>
      <Navigation />
      <RegisterUserForm />
      <NewUser />
      <div className="w-[97%] mx-auto flex mt-4 justify-between">
        <div className="font-bold">
          <p>Clients</p>
        </div>
        <div>
          <button
            onClick={() => dispatch(changeRegisterForm('open'))}
            className="bg-[green] text-white font-bold px-2 md:px-0 md:w-[10vw] py-2 rounded"
          >
            Add client
          </button>
          <button
            onClick={() => clearAllListenersll()}
            className="bg-[red] ml-2 text-white font-bold px-2 md:px-0 md:w-[10vw] py-2 rounded"
          >
            Clear All
          </button>
        </div>
      </div>
      <div className="overflow-y-scroll h-[81vh]">
        <div className="border md:w-[70%] bg-black text-white mx-auto mt-5">
          <div className="w-[90%] border-b pb-2 mt-4  mx-auto flex justify-between">
            <div className="w-[20%]">
              <h1>Name</h1>
            </div>
            <div className="w-[20%]">
              <h1>Email</h1>
            </div>
            <div className="w-[20%]">
              <h1>Actions</h1>
            </div>
          </div>
        </div>
        {users.map((user, index) => (
          <div
            key={index}
            className=" md:w-[70%] hover:bg-[#80808010] mx-auto mt-5"
          >
            <div className="w-[96%] border-b pb-2 mt-4  mx-auto flex justify-between">
              <div className="w-[20%]">
                <h1>{user.name}</h1>
              </div>
              <div className="w-[20%]">
                <h1>{user.email}</h1>
              </div>
              <div className="w-[20%]">
                <button
                  onClick={() => dispatchMethods({ id: user._id })}
                  className="bg-[blue] hover:bg-white hover:text-black hover:border w-[40%] py-1 rounded-l-lg text-white"
                >
                  update
                </button>
                <button
                  onClick={() => deleteUser(user._id)}
                  className="bg-[red] hover:bg-white hover:text-black hover:border w-[40%] py-1 rounded-r-lg text-white"
                >
                  delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
export async function getStaticProps() {
  return {
    props: {
      users: await (await fetch('http://localhost:3000/api/users')).json(),
    },
  }
}

export default Home
