import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  rockets: [],
  error: ''
}

// Generates pending, fulfilled and rejected action types
export const fetchRockets = createAsyncThunk('rocket/fetchRockets', () => {
  return axios
    .get('https://api.spacexdata.com/v3/launches')
    .then(response => response.data)
})

const rocketSlice = createSlice({
  name: 'rocket',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchRockets.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchRockets.fulfilled, (state, action) => {
      state.loading = false
      state.rockets = action.payload
      state.error = ''
    })
    builder.addCase(fetchRockets.rejected, (state, action) => {
      state.loading = false
      state.rockets = []
      state.error = action.error.message
    })
  }
})

export default rocketSlice.reducer