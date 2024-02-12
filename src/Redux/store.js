import { configureStore } from "@reduxjs/toolkit";
import restaurantSlice from "./restaurantSlice";
import USER_AUTH_SUCCESS from "./userAuthenticate";


const store = configureStore({
    reducer : {
        restaurants : restaurantSlice,
        user: USER_AUTH_SUCCESS
    }
});


export default store