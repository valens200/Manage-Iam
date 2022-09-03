import styles from '../styles/Home.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { showFormm } from '../features/users/userSlice'
import { useRouter } from 'next/router'
import {
  changeRegisterForm,
  changeEnteredInputs,
  getMess,
  initializeMessageToNull,
  loggInUser,
} from '../features/users/userSlice'
import { Cookies } from 'next/dist/server/web/spec-extension/cookies'

export default function Home() {
  const inputs = useSelector((store) => store.user.formInputs)
  const loginInputs = useSelector((store) => store.user.loginInputs)
  const showForm = useSelector((store) => store.user.changeForm)
  const dispatch = useDispatch()
  const message = useSelector((store) => store.user.formMessage)
  const users = useSelector((store) => store.user.users)
  const router = useRouter()
  const EnteredLoginSignUpValues = useSelector(
    (store) => store.user.EnteredLoginSignUpValues,
  )

  const getMessage = (message) => {
    if (message == '') {
      return null
    } else {
      return <p className={getClass(message)}>{message}</p>
    }
  }

  const dispatchingMethodes = (input, e) => {
    dispatch(initializeMessageToNull())
    dispatch(
      changeEnteredInputs({
        input: input.name,
        value: e.target.value,
        action: 'login/signup',
      }),
    )
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

  const signup = async () => {
    try {
      const response = await fetch(
        'http://localhost:3000/api/register/signup',
        {
          method: 'POST',
          body: JSON.stringify({
            fullName: EnteredLoginSignUpValues.fullName,
            username: EnteredLoginSignUpValues.Username,
            email: EnteredLoginSignUpValues.email,
            password: EnteredLoginSignUpValues.Password,
          }),
          headers: {
            'content-type': 'application/json',
            Accept: 'application/json',
          },
        },
      )
      const resp = await response.json()
      dispatch(getMess({ place: 'for form', value: resp.message }))
      dispatch(loggInUser(resp.userTobeRegistered.username))

      router.push('/users')
    } catch (err) {
      console.log(err)
    }
  }

  const login = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/register/login', {
        method: 'POST',
        body: JSON.stringify({
          email: EnteredLoginSignUpValues.email,
          password: EnteredLoginSignUpValues.Password,
        }),
        headers: {
          'content-type': 'application/json',
          Accept: 'application/json',
        },
      })

      const resp = await response.json()
      dispatch(getMess({ place: 'for form', value: resp.message }))
      const loggedInUser = {
        username: resp.userToLoggedIn.username,
        _id: resp.userToLoggedIn._id,
      }
      localStorage.setItem('vava', loggedInUser)
      Cookies.setItem('skdfbsdkf', 'dfkhsdb')
      dispatch(loggInUser(resp.userToLoggedIn.username))
      router.push('/users')
    } catch (err) {
      console.log(err)
    }
  }
  return showForm == true ? (
    <div>
      <div className="md:w-[25%] w-[90%] border p-4  translate-y-[25vh] mx-auto">
        <h1 className="text-center font-bold p-4">Login to account</h1>
        {getMessage(message)}
        {inputs.map((input, index) => (
          <div className="border   mt-4 h-[5vh]" key={index}>
            <input
              className="w-[100%]  pl-2 focus:outline-none  h-[100%]"
              type={input.type}
              name={input.name}
              placeholder={input.placeholder}
              onChange={(e) => dispatchingMethodes(input, e)}
            />
          </div>
        ))}
        <button
          onClick={() => signup()}
          type="submit"
          className=" bg-[blue] w-[100%] h-[5vh] text-white  font-bold mt-4"
        >
          signUp
        </button>
        <div className="flex justify-between p-4">
          <p>Already have an account?</p>
          <p
            onClick={() => dispatch(showFormm())}
            className="text-[red] hover:cursor-pointer font-bold"
          >
            Login
          </p>
        </div>
      </div>
    </div>
  ) : (
    <div>
      <div className="md:w-[25%] h-[60vh] w-[90%] border p-4  translate-y-[25vh] mx-auto">
        <div className="translate-y-20">
          <h1 className="text-center font-bold p-4">Login to account</h1>
          {getMessage(message)}
          {loginInputs.map((input, index) => (
            <div className="border   mt-4 h-[5vh]" key={index}>
              <input
                className="w-[100%]  pl-2 focus:outline-none  h-[100%]"
                type={input.type}
                name={input.name}
                placeholder={input.placeholder}
                onChange={(e) => dispatchingMethodes(input, e)}
              />
            </div>
          ))}
          <button
            onClick={() => login()}
            type="submit"
            className=" bg-[blue] w-[100%] h-[5vh] text-white  font-bold mt-4"
          >
            login
          </button>
          <div className="flex justify-between p-4">
            <p> Dont you have an account</p>
            <p
              onClick={() => dispatch(showFormm())}
              className="text-[red] hover:cursor-pointer font-bold"
            >
              Sign Up
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
