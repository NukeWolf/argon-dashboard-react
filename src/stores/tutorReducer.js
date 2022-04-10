import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { client } from './client';
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
    status: 'loading',
    requests: [],
    tutees: [{
      id: 1,
      picture:
        "https://media-exp1.licdn.com/dms/image/C4D03AQH1GTxdf7M7Ow/profile-displayphoto-shrink_400_400/0/1593820411981?e=1654732800&v=beta&t=KdVIhnoyk0SDSybEGXYvOL4Aahw7JsWalKw3AFNIcqg",
      name: "Alex Huang",
      email: "alex.huang@yale.edu",
      hourlyRate: 15,
      ratings: 60,
      status: 'online',
    },],
    token: '',
    currentTuteeID: 1,
    currentTutorID: 1,
    is_tutee:false,
    is_tutor:false,
    tutors: [{
      picture:
        "https://media-exp1.licdn.com/dms/image/C4D03AQH1GTxdf7M7Ow/profile-displayphoto-shrink_400_400/0/1593820411981?e=1654732800&v=beta&t=KdVIhnoyk0SDSybEGXYvOL4Aahw7JsWalKw3AFNIcqg",
      name: "Alex Huang",
      email: "alex.huang@yale.edu",
      hourlyRate: 15,
      ratings: 60,
      status: 'online',
    },],
    requests: [],
  },
  reducers: {
    addTutor: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. Itut
      // doesn't actually mutate the state because it uses the immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.tutors.add(action.payload);
    },
    getTutor: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.tutors.add(action.payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTutees.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // Add any fetched posts to the array
        console.log("success", action);
        // toast.success('Successfully loaded tutors.');
        state.tutees = action.payload.results;
      })
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
      }).addCase(sendEmailAcceptance.fulfilled, (state, action) => {
        // We can directly add the new request object to our  requests
        toast.success('Successfully accepted.');
      }).addCase(patchRequest.fulfilled, (state, action) => {
        // We can directly add the new request object to our  requests
        toast.success('Successfully accepted.');
      }).addCase(addNewTutor.fulfilled, (state, action) => {
        // We can directly add the new request object to our  requests
        toast.success('Successfully accepted.');
      }).addCase(postTutorRating.fulfilled, (state, action) => {
        // We can directly add the new request object to our  requests
        toast.success('Successfully submitted rating.');
      }).addCase(finalizeRequest.fulfilled, (state, action) => {
        // We can directly add the new request object to our  requests
        toast.success('Successfully finalized request.');
      }).addCase(loginSubmit.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(loginSubmit.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // Add any fetched posts to the array
        console.log("success", action);
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
        // toast.success('Successfully loaded tutors.');
      })
      .addCase(loginSubmit.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      }).addCase(checkTutor.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // Add any fetched posts to the array
        console.log("successTutor", action);
        state.is_tutee = action.payload.is_tutee;
        state.is_tutor = action.payload.is_tutor;
        if (action.payload.is_tutee) 
          state.currentTuteeID = action.payload.tutee.id;
        if (action.payload.is_tutor) 
          state.currentTutorID = action.payload.tutor.id;
        // toast.success('Successfully loaded tutors.');
      })
  }
})

export const fetchTutees = createAsyncThunk('tutors/fetchTutees', async () => {
  const response = await client.get('http://localhost:8000/tutees/')
  return response.data
});
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
export const finalizeRequest = createAsyncThunk(
  'tutors/finalizeRequest',
  // The payload creator receives the partial `{title, content, user}` object
  async initialRequest => {
    // We send the initial data to the fake API server
    const response = await client.post('http://localhost:8000/finalize_request/', initialRequest)
    // The response includes the complete post object, including unique ID
    return response.data
  }
)


export const addNewTutor = createAsyncThunk(
  'tutors/addNewTutor',
  // The payload creator receives the partial `{title, content, user}` object
  async initialRequest => {
    // We send the initial data to the fake API server
    const response = await client.post('http://localhost:8000/tutors/', initialRequest)
    // The response includes the complete post object, including unique ID
    return response.data
  }
)

export const patchRequest = createAsyncThunk(
  'tutors/updateRequest',
  // The payload creator receives the partial `{title, content, user}` object
  async (initialRequest, thunkAPI) => {
    // We send the initial data to the fake API server
    const response = await client.patch('http://localhost:8000/requests/' + initialRequest.id + '/', initialRequest)
    // The response includes the complete post object, including unique ID
    thunkAPI.dispatch(fetchRequests());

    return response.data
  }
)

export const sendEmailAcceptance = createAsyncThunk(
  'tutors/sendEmailAcceptance',
  // The payload creator receives the partial `{title, content, user}` object
  async (initialRequest, thunkAPI) => {
    // We send the initial data to the fake API server
    const response = await client.post('http://localhost:8000/accept_request/', initialRequest)
    // The response includes the complete post object, including unique ID
    thunkAPI.dispatch(fetchRequests());
    return response.data
  }
)

export const postTutorRating = createAsyncThunk(
  'tutors/postTutorRating',
  // The payload creator receives the partial `{title, content, user}` object
  async (initialRequest, thunkAPI) => {
    // We send the initial data to the fake API server
    const response = await client.post('http://localhost:8000/ratings/', initialRequest)
    // The response includes the complete post object, including unique ID
    thunkAPI.dispatch(fetchRequests());
    return response.data
  }
)
export const sendDone = createAsyncThunk(
  'tutors/sendDone',
  // The payload creator receives the partial `{title, content, user}` object
  async (initialRequest, thunkAPI) => {
    // We send the initial data to the fake API server
    const response =
      await client.post('http://localhost:8000/send_done/', initialRequest)
    // The response includes the complete post object, including unique ID
    thunkAPI.dispatch(fetchRequests());
    return response.data
  }
);
export const checkTutor = createAsyncThunk(
  'tutors/checkTutor',
  // The payload creator receives the partial `{title, content, user}` object
  async (initialRequest, thunkAPI) => {
    // We send the initial data to the fake API server
    const response = await client.post('http://localhost:8000/check_tutor/',
      initialRequest, {
        headers:
          { "Authorization": "Token " + initialRequest.token }
    })
    // The response includes the complete post object, including unique ID
    return response.data
  }
)
export const loginSubmit = createAsyncThunk(
  'tutors/loginSubmit',
  // The payload creator receives the partial `{title, content, user}` object
  async (initialRequest, thunkAPI) => {
    // We send the initial data to the fake API server
    const response = await client.post('http://localhost:8000/api-token-auth/', initialRequest)
    // The response includes the complete post object, including unique ID
    thunkAPI.dispatch(checkTutor({ token: response.data.token }));
    localStorage.setItem("token", response.data.token);
    thunkAPI.dispatch(fetchRequests());
    return response.data
  }
)



export const { addTutor } = tutorSlice.actions
export const selectAllTutors = state => state.tutors.tutors;
export const selectAllRequests = (state) => {
  const requests = state.tutors.requests;
  return requestProcess(state, requests);
}
const requestProcess = (state, requests) => {
  const outreq = [];

  for (let i = 0; i < requests.length; i++) {

    const request = requests[i];
    const tutor = state.tutors.tutors.filter((tut) => { return tut.id === request.Tutor })[0];
    const tutee = state.tutors.tutees.filter((tut) => { return tut.id === request.Tutee })[0];

    outreq.push({
      id: request.id,
      tutor_done: request.tutor_done,
      tutee_done: request.tutee_done,
      timeslots: (request.timeslots),
      tutor: tutor,
      tutee: tutee
    });
  }
  console.log("outreq", outreq, requests, state);

  console.log("outreq", outreq, requests);
  return outreq;
}
export const selectPendingRequests = (state) => {
  const requests = state.tutors.requests.filter((rq) => (rq.status === "pending"));
  return requestProcess(state, requests);
}
export const selectAcceptedRequests = (state) => {
  const requests = state.tutors.requests.filter(
    (rq) => (rq.status === "accepted" && (!rq.tutor_done || !rq.tutee_done)));
  return requestProcess(state, requests);

}
export const is_tutor = (state)=>(state.tutors.is_tutor);
export const is_tutee = (state)=>(state.tutors.is_tutee);
export const currentTutee = (state) => {
  const tutee = state.tutors.tutees.filter((tut) => { return tut.id === state.tutors.currentTuteeID })[0];

  console.log("tutee", tutee);
  return tutee;
}
export default tutorSlice.reducer