import { configureStore } from '@reduxjs/toolkit';
import rocketReducer from '../features/rocketSlice'

const store = configureStore({
    reducer: {
      rocket: rocketReducer,
    }
  })
  
  export default store