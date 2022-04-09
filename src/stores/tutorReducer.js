import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

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
    status:'loading',
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
      // Redux Toolkit allows us to write "mutating" logic in reducers. Itut
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
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTutors.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchTutors.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // Add any fetched posts to the array
        console.log("success", action);
        
        state.tutors = action.payload.results;
      })
      .addCase(fetchTutors.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export async function client(endpoint, { body, ...customConfig } = {}) {
  const headers = { 'Content-Type': 'application/json' }

  const config = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  }

  if (body) {
    config.body = JSON.stringify(body)
  }

  let data
  try {
    const response = await window.fetch(endpoint, config)
    data = await response.json()
    if (response.ok) {
      // Return a result object similar to Axios
      return {
        status: response.status,
        data,
        headers: response.headers,
        url: response.url,
      }
    }
    throw new Error(response.statusText)
  } catch (err) {
    return Promise.reject(err.message ? err.message : data)
  }
}

client.get = function (endpoint, customConfig = {}) {
  return client(endpoint, { ...customConfig, method: 'GET' })
}

client.post = function (endpoint, body, customConfig = {}) {
  return client(endpoint, { ...customConfig, body })
}

export const fetchTutors = createAsyncThunk('tutors/fetchTutors', async () => {
  const response = await client.get('http://localhost:8000/tutors/')
  return response.data
})

export const { addTutor } = tutorSlice.actions
export const selectAllTutors = state => state.tutors.tutors
export default tutorSlice.reducer