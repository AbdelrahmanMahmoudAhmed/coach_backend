import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/store/store'

// Define a type for the slice state
interface GlobalState {
  loader: boolean
}

// Define the initial state using that type
const initialState: GlobalState = {
  loader: false,
}

export const globalSlice = createSlice({
  name: 'global',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    displayLoader: (state) => {
      state.loader = true
    },
    hideLoader: (state) => {
      state.loader = false
    },

  },
})

export const { displayLoader, hideLoader } = globalSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const loader = (state: RootState) => state.global.loader

export default globalSlice.reducer