import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { movieApi } from './movieAPI'

export const getMovies = createAsyncThunk(
    'movie/getMovies',
    async (_, thunkAPI) => {
        try {
            const res = await movieApi.getMovies()
            return res
        } catch (err) {
            return thunkAPI.rejectWithValue(err)
        }
    }
)

export const getCasterAndTrailerTopRated = createAsyncThunk(
    'movie/getCasterAndTrailerTopRated',
    async (movieList, thunkAPI) => {
        try {
            if (movieList) {
                movieList = movieList.map(movie => movie.id)
                const trailerList = await movieApi.getTrailerTopRated(movieList,{ params: { limit: 5 } })
                const casterList = await movieApi.getCasterTopRated(movieList, {params: { limit: 3 }})
                return { casterList, trailerList }
            }
        } catch (err) {
            return thunkAPI.rejectWithValue(err)
        }
    }
)

const movieSlice = createSlice({
    name: 'movie',
    initialState: {
        list: {},
        status: null,
    },
    extraReducers: {
        [getMovies.pending]: (state, action) => {
            state.status = 'loading'
        },
        [getMovies.rejected]: (state, action) => {
            state.status = 'error'
        },
        [getMovies.fulfilled]: (state, action) => {
            state.list = action.payload
            state.status = 'success'
        },

        [getCasterAndTrailerTopRated.pending]: (state, action) => {
            state.status = 'loading'
        },
        [getCasterAndTrailerTopRated.rejected]: (state, action) => {
            state.status = 'error'
        },
        [getCasterAndTrailerTopRated.fulfilled]: (state, action) => {
            if(action.payload && state.list.hasOwnProperty('topRatedMovies')){
                state.list.topRatedMovies = { ...state.list?.topRatedMovies, ...action.payload }
            }
            state.status = 'success'
        },
    },
})

export default movieSlice.reducer
