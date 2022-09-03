import React from 'react'
import Navigation from '../../components/Navigation'
function User() {
  return (
    <div>
      <Navigation />
      <div className="md:w-[40%]  mx-auto">
        <div className=" w-[100%] h-[40vh] bg-black">
          {/* <img
            className="w-[100%] h-[100%]"
            src="../../assetsimages/valens.jpg"
          /> */}
        </div>
        <div>
          <div className="border md:w-[100%] px-4  bg-[#8080805a] text-black mx-auto mt-5">
            <div className="md:w-[90%] border-b pb-2 mt-4  mx-auto flex justify-between">
              <div className=" w-[5%] md:w-[20%]">
                <h1>Name</h1>
              </div>
              <div className="md:w-[30%]">
                <h1>Email</h1>
              </div>
              <div className="w-[9%] md:translate-x-0 translate-x-[10vw] ">
                <h1>Salary</h1>
              </div>
              <div className="md:w-[20%] w-[13%]">
                <h1>BirthDay</h1>
              </div>
            </div>
          </div>
          <div className="border md:w-[100%] px-4 text-black mx-auto mt-0">
            <div className="md:w-[90%] w-[100%] border-b pb-2 mt-4  mx-auto flex justify-between">
              <div className="w-[5%] md:w-[2%]">
                <h1>valens</h1>
              </div>
              <div className=" text-start md:w-[30%]">
                <h1>uwavalens2003@gmail.com</h1>
              </div>
              <div className="w-[9%]">
                <h1>12003</h1>
              </div>
              <div className=" w-[13%] md:w-[20%]">
                <h1>BirthDay</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default User
