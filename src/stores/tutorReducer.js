import { createSlice } from '@reduxjs/toolkit'

const FakePerson = {
    picture:
      "https://media-exp1.licdn.com/dms/image/C4D03AQH1GTxdf7M7Ow/profile-displayphoto-shrink_400_400/0/1593820411981?e=1654732800&v=beta&t=KdVIhnoyk0SDSybEGXYvOL4Aahw7JsWalKw3AFNIcqg",
    name: "Alex Huang",
    email: "alex.huang@yale.edu",
    hourlyRate: 15,
    ratings: 60,
  };

export const tutorSlice = createSlice({
  name: 'tutor',
  initialState: {
    tutors: [{
        picture:
          "https://media-exp1.licdn.com/dms/image/C4D03AQH1GTxdf7M7Ow/profile-displayphoto-shrink_400_400/0/1593820411981?e=1654732800&v=beta&t=KdVIhnoyk0SDSybEGXYvOL4Aahw7JsWalKw3AFNIcqg",
        name: "Alex Huang",
        email: "alex.huang@yale.edu",
        hourlyRate: 15,
        ratings: 60,
        status:'online',
      },]
  },
  reducers: {
    addTutor: (state,action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.tutors.add(action.payload);
    },
    getTutor: (state,action) => {
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes
        state.tutors.add(action.payload);
      },
  }
})

export const { addTutor } = tutorSlice.actions
export const selectAllTutors = state => state.tutors.tutors
export default tutorSlice.reducer