import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authReducer"
import videoReducer from "./videoReducer"


const store = configureStore({
    reducer: {
        auth: authReducer,
        video : videoReducer
    }
})

export default store;