import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  changeForm: true,
  showUpdateForm: false,
  showRegisterForm: false,
  formMessage: '',
  isLoggedIn: {
    username: '',
  },
  EnteredValues: {
    name: '',
    email: '',
    salary: '',
    Birthday: '',
  },
  userTobeUpdated: {},
  userInputs: [
    {
      name: 'name',
      type: 'text',
      placeholder: 'Name',
    },
    {
      name: 'email',
      type: 'email',
      placeholder: 'Email',
    },
    {
      name: 'salary',
      type: 'number',
      placeholder: 'Salary',
    },
    {
      name: 'Birthday',
      type: 'date',
    },
  ],
  users: [],
  EnteredLoginSignUpValues: {
    fullName: '',
    email: '',
    Username: '',
    Password: '',
  },
  formInputs: [
    {
      type: 'text',
      name: 'fullName',
      placeholder: 'FullName',
    },
    {
      type: 'email',
      placeholder: 'Email',
      name: 'email',
    },
    {
      type: 'text',
      placeholder: 'Username',
      name: 'username',
    },
    {
      type: 'text',
      placeholder: 'Password',
      name: 'password',
    },
  ],
  loginInputs: [
    {
      type: 'email',
      placeholder: 'Email',
      name: 'email',
    },
    {
      type: 'text',
      placeholder: 'Password',
      name: 'password',
    },
  ],
}

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    showFormm: (state, action) => {
      state.changeForm = !state.changeForm
    },
    changeUpdateForm: (state, action) => {
      if (action.payload == 'open') {
        state.showUpdateForm = true
      } else {
        state.showUpdateForm = false
      }
    },

    setUserTobeUpdated: (state, action) => {
      const id = action.payload.id
      const user = state.users.find((user) => user._id === id)
      state.userTobeUpdated = user
    },
    changeEnteredInputs: (state, action) => {
      const input = action.payload.input
      const value = action.payload.value
      const actions = action.payload.action

      switch (actions) {
        case 'update':
          switch (input) {
            case 'name':
              state.userTobeUpdated.name = value
              break
            case 'email' || 'Email':
              state.userTobeUpdated.email = value
              break
            case 'salary':
              state.userTobeUpdated.salary = value
              break
            case 'Birthday':
              state.userTobeUpdated.Birthday = value
              break
            default:
              console.log('')
          }
          break

        case 'userRegistration':
          switch (input) {
            case 'name':
              state.EnteredValues.name = value
              break
            case 'email' || 'Email':
              state.EnteredValues.email = value
              break
            case 'salary':
              state.EnteredValues.salary = value
              break
            case 'Birthday':
              state.EnteredValues.Birthday = value
              break
            default:
              console.log('')
          }
          break
        case 'login/signup':
          switch (input) {
            case 'fullName':
              state.EnteredLoginSignUpValues.fullName = value
              break
            case 'email' || 'Email':
              state.EnteredLoginSignUpValues.email = value
              break
            case 'password':
              state.EnteredLoginSignUpValues.Password = value
              break
            case 'username':
              state.EnteredLoginSignUpValues.Username = value
              break
            default:
              console.log('')
          }
      }
    },
    loggInUser: (state, action) => {
      state.isLoggedIn.username = action.payload
    },
    initializeMessageToNull: (state, action) => {
      state.formMessage = ''
    },

    getMess: (state, action) => {
      if (action.payload.place == 'for form') {
        state.formMessage = action.payload.value
      }
    },
    changeRegisterForm: (state, action) => {
      if (action.payload == 'open') {
        state.showRegisterForm = true
      } else {
        state.showRegisterForm = false
      }
    },

    setUsers: (state, action) => {
      state.users = action.payload
    },
  },
})

export const userReducer = userSlice.reducer
export const {
  showFormm,
  changeUpdateForm,
  setUserTobeUpdated,
  changeRegisterForm,
  changeEnteredInputs,
  setUsers,
  loggInUser,
  initializeMessageToNull,
  getMess,
} = userSlice.actions
