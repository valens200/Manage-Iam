import { useSelector, useDispatch } from 'react-redux'
import {
  showFormm,
  changeUpdateForm,
  changeEnteredInputs,
} from '../features/users/userSlice'
function RegisterUserForm() {
  const loginInputs = useSelector((store) => store.user.formInputs)
  const showUpdateForm = useSelector((store) => store.user.showUpdateForm)
  const userTobeUpdated = useSelector((store) => store.user.userTobeUpdated)
  const userInputs = useSelector((store) => store.user.userInputs)
  const dispatch = useDispatch()
  const updateUser = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/users/?userId=${userTobeUpdated._id}`,
        {
          method: 'PUT',
          body: JSON.stringify({
            name: userTobeUpdated.name,
            email: userTobeUpdated.email,
            salary: userTobeUpdated.salary,
            birthday: userTobeUpdated.birthday,
          }),
        },
      )
      dispatch(changeUpdateForm('close'))
    } catch (err) {
      console.log(err)
    }
  }
  return showUpdateForm == true ? (
    <div className="fixed md:w-[30%] w-[90%]  py-4 translate-x-[7%] md:translate-x-[90%] z-40 translate-y-[14vh] border shadow-lg bg-white ">
      <div className="md:w-[90%] w-[90%] h-[100%] border p-4  translate-y-[1vh] mx-auto">
        <div className="text-end">
          <p className="text-center">
            Update user with username
            <span className="font-bold ml-2">{userTobeUpdated.name}</span>
          </p>
          <button
            onClick={() => dispatch(changeUpdateForm('close'))}
            className="text-end font-bold "
          >
            x
          </button>
        </div>
        <div className="">
          <div className="border   mt-4 h-[5vh]">
            <input
              onChange={(e) =>
                dispatch(
                  changeEnteredInputs({
                    input: 'name',
                    value: e.target.value,
                    action: 'update',
                  }),
                )
              }
              className="w-[100%]  pl-2  h-[100%] focus:outline-none"
              type="text"
              value={userTobeUpdated.name}
              name={userTobeUpdated.name}
            />
          </div>
          <div className="border   mt-4 h-[5vh]">
            <input
              onChange={(e) =>
                dispatch(
                  changeEnteredInputs({
                    input: 'email',
                    value: e.target.value,
                    action: 'update',
                  }),
                )
              }
              className="w-[100%]  pl-2 focus:outline-none h-[100%]"
              type="email"
              value={userTobeUpdated.email}
              name={userTobeUpdated.email}
            />
          </div>
          <div className="border   mt-4 h-[5vh]">
            <input
              onChange={(e) =>
                dispatch(
                  changeEnteredInputs({
                    input: 'salary',
                    value: e.target.value,
                    action: 'update',
                  }),
                )
              }
              className="w-[100%]  pl-2 focus:outline-none h-[100%]"
              type="Number"
              value={userTobeUpdated.salary}
              name={userTobeUpdated.salary}
            />
          </div>
          <div className="border   mt-4 h-[5vh]">
            <input
              onChange={(e) =>
                dispatch(
                  changeEnteredInputs({
                    input: 'birthday',
                    value: e.target.value,
                    action: 'update',
                  }),
                )
              }
              className="w-[100%]  pl-2 focus:outline-none h-[100%]"
              type="text"
              value={userTobeUpdated.birthday}
              name={userTobeUpdated.birthday}
            />
          </div>
        </div>
        <button
          onClick={() => updateUser()}
          type="submit"
          value="update"
          className=" bg-[blue] w-[100%] h-[5vh] text-white  font-bold mt-4"
        >
          update
        </button>
      </div>
    </div>
  ) : null
}

export default RegisterUserForm
