import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        info: {},
    },
    reducers: {
        updateUserState: (state, action) => {
            console.log(action)
            state.info = JSON.parse(JSON.stringify(action.payload))
        },

        updateProfile: (state, action) => {
            state.info = {
                ...state.info,
                ...action.payload,
            }
        },
    },
})

export const { updateUserState, updateProfile } = userSlice.actions
export default userSlice.reducer
