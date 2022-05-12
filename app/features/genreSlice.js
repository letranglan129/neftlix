import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { movieApi } from './movieAPI'

export const getGenres = createAsyncThunk(
    'genre/getGenres',
    async (_, thunkAPI) => {
        try {
            const res = await movieApi.getGenres()
            return res
        } catch (err) {
            return thunkAPI.rejectWithValue(err)
        }
    }
)

const genreSlice = createSlice({
    name: 'genre',
    initialState: {
        list: [],
        status: null,
    },

    extraReducers: {
        [getGenres.pending]: (state, action) => {
            state.status = 'loading'
        },
        [getGenres.rejected]: (state, action) => {
            state.status = 'error'
        },
        [getGenres.fulfilled]: (state, action) => {
            state.list = action.payload
            state.status = 'success'
        },
    },
})

export default genreSlice.reducer