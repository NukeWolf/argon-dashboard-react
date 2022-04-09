import { configureStore } from '@reduxjs/toolkit'
import tutorReducer from './tutorReducer'

export default configureStore({
  reducer: {
    tutors: tutorReducer
  }
})