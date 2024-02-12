import { createSlice } from "@reduxjs/toolkit"


const initialState = {

  data : [],
};

const restaurantSlice = createSlice (
  {
    name : 'data',
    initialState,
    reducers : {
      getRestaurant : (state,action) => {state.data = action.payload}
    }
  }
)


export const {getRestaurant} = restaurantSlice.actions;
export default restaurantSlice.reducer;