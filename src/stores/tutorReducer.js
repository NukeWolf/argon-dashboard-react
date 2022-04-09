import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {client} from './client';
import toast, { Toaster } from 'react-hot-toast';
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
    requests:[],
    tutees:[{
      id:1,
      picture:
        "https://media-exp1.licdn.com/dms/image/C4D03AQH1GTxdf7M7Ow/profile-displayphoto-shrink_400_400/0/1593820411981?e=1654732800&v=beta&t=KdVIhnoyk0SDSybEGXYvOL4Aahw7JsWalKw3AFNIcqg",
      name: "Alex Huang",
      email: "alex.huang@yale.edu",
      hourlyRate: 15,
      ratings: 60,
      status:'online',
    },],
    currentTuteeID:1,
    tutors: [{
        picture:
          "https://media-exp1.licdn.com/dms/image/C4D03AQH1GTxdf7M7Ow/profile-displayphoto-shrink_400_400/0/1593820411981?e=1654732800&v=beta&t=KdVIhnoyk0SDSybEGXYvOL4Aahw7JsWalKw3AFNIcqg",
        name: "Alex Huang",
        email: "alex.huang@yale.edu",
        hourlyRate: 15,
        ratings: 60,
        status:'online',
      },],
      requests:[],
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
        // toast.success('Successfully loaded tutors.');
        state.tutors = action.payload.results;
      })
      .addCase(fetchTutors.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      }).addCase(fetchRequests.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchRequests.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // Add any fetched posts to the array
        console.log("success", action);
        // toast.success('Successfully loaded tutors.');
        state.requests = action.payload.results;
      })
      .addCase(fetchRequests.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      }).addCase(addNewRequest.fulfilled, (state, action) => {
        // We can directly add the new request object to our  requests
        state.requests.push(action.payload);
        toast.success('Successfully created new request.');
      })
  }
})


export const fetchTutors = createAsyncThunk('tutors/fetchTutors', async () => {
  const response = await client.get('http://localhost:8000/tutors/')
  return response.data
});
export const fetchRequests = createAsyncThunk('tutors/fetchRequests', async () => {
  const response = await client.get('http://localhost:8000/requests/')
  return response.data
});
export const addNewRequest = createAsyncThunk(
  'tutors/addNewRequest',
  // The payload creator receives the partial `{title, content, user}` object
  async initialRequest => {
    // We send the initial data to the fake API server
    const response = await client.post('http://localhost:8000/requests/', initialRequest)
    // The response includes the complete post object, including unique ID
    return response.data
  }
)


export const { addTutor } = tutorSlice.actions
export const selectAllTutors = state => state.tutors.tutors;
export const selectAllRequests = (state) => {
  const requests = state.tutors.requests;
  const outreq =  [];
  for(let i = 0;i < requests.length;i++){
  console.log("outreq",i,outreq,requests);

    const request = requests[i];
    const tutor = state.tutors.tutors.filter((tut)=>{return tut.id===request.Tutor })[0];
    
    outreq.push({timeslots:(request.timeslots),tutor:tutor});
  }
  console.log("outreq",outreq,requests);
  return outreq;
}
export const selectPendingRequests = (state) => {
  const requests = state.tutors.requests.filter((rq)=>(rq.status==="pending"));
  const outreq =  [];
  for(let i = 0;i < requests.length;i++){
  console.log("outreq",i,outreq,requests);

    const request = requests[i];
    const tutor = state.tutors.tutors.filter((tut)=>{return tut.id===request.Tutor })[0];
    
    outreq.push({timeslots:(request.timeslots),tutor:tutor});
  }
  console.log("outreq",outreq,requests);
  return outreq;
}

export const currentTutee = (state)=>{
  const tutee = state.tutors.tutees.filter((tut)=>{return tut.id===state.tutors.currentTuteeID })[0];

  console.log("tutee",tutee);
  return tutee;
}
export default tutorSlice.reducer