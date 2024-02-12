import { createSlice } from "@reduxjs/toolkit"


const initialState = {

  user:null,
  isAuthenticated:false,
  token:'',
};

const userAuthSlice = createSlice (
  {
    name : 'userAuthenticate',
    initialState,
    reducers : {
        USER_AUTH_SUCCESS : (state,action) => {
        
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = action.payload.isAuthenticated
    },
     userLogout : (state,action) => {
        
      state.user = null;
      state.token = null;
      state.isAuthenticated = false
  },
    }
  }
)


export const {USER_AUTH_SUCCESS,userLogout} = userAuthSlice.actions;
export default userAuthSlice.reducer;
