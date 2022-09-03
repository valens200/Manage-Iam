import { useSelector, useDispatch } from 'react-redux'
import {
  changeRegisterForm,
  changeEnteredInputs,
  getMess,
  initializeMessageToNull,
} from '../features/users/userSlice'

function NewUser() {
  const showRegisterForm = useSelector((store) => store.user.showRegisterForm)
  const userInputs = useSelector((store) => store.user.userInputs)
  const message = useSelector((store) => store.user.formMessage)
  const dispatch = useDispatch()
  const EnteredValues = useSelector((store) => store.user.EnteredValues)
  const submitForm = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        body: JSON.stringify({
          name: EnteredValues.name,
          email: EnteredValues.email,
          salary: EnteredValues.salary,
          birthday: EnteredValues.Birthday,
        }),
        headers: {
          'content-type': 'application/json',
          Accept: 'application/json',
        },
      })
      const resp = await response.json()
      dispatch(getMess({ place: 'for form', value: resp.message }))
      dispatch(changeRegisterForm('close'))
    } catch (err) {
      console.log(err)
    }
  }

  const getClass = (message) => {
    if (message === 'user created successfully') {
      return 'text-center py-4 font-bold'
    } else if (
      message === 'invalid inputs please all the fields are required'
    ) {
      return 'text-center text-[red]'
    } else {
      return null
    }
  }

  const getMessage = (message) => {
    if (message == '') {
      return null
    } else {
      return <p className={getClass(message)}>{message}</p>
    }
  }
  const dispatchingMethodes = (input, e) => {
    dispatch(
      changeEnteredInputs({
        input: input.name,
        value: e.target.value,
        action: 'userRegistration',
      }),
    )

    dispatch(initializeMessageToNull())
  }
  return showRegisterForm == true ? (
    <div className="fixed md:w-[30%] w-[90%]  translate-x-[7%]  py-4 md:translate-x-[90%] z-40 translate-y-[14vh] border shadow-lg bg-white ">
      <div className="md:w-[90%] w-[90%] border p-4  translate-y-[1vh] mx-auto">
        <div className="text-end flex justify-between">
          <h1 className="text-center font-bold p-4">Register New user</h1>

          <button
            onClick={() => dispatch(changeRegisterForm('close'))}
            className="text-end font-bold "
          >
            x
          </button>
        </div>
        {getMessage(message)}
        {userInputs.map((input, index) => (
          <div className="border   mt-4 h-[5vh]" key={index}>
            <input
              onChange={(e) => dispatchingMethodes(input, e)}
              className="w-[100%] focus:outline-none pl-2  h-[100%]"
              type={input.type}
              name={input.name}
              placeholder={input.placeholder}
            />
          </div>
        ))}
        <button
          onClick={() => submitForm()}
          type="submit"
          value="Register"
          className=" bg-[blue] w-[100%] h-[5vh]
          text-white font-bold mt-4"
        >
          submit
        </button>
      </div>
    </div>
  ) : null
}

export default NewUser
