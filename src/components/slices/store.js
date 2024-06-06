import {configureStore} from "@reduxjs/toolkit"
import moviesReducer from "./MoviesSlicer";

const store = configureStore({
    reducer:{
        movies:moviesReducer,
        
    },
    
})
export default store;