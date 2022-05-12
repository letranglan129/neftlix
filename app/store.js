import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './features/movieSlice';
import genreReducer from './features/genreSlice';
import userReducer from './features/userSlice';
import themeReducer from './features/themeSlice';

export const store = configureStore({
    reducer: {
        movies: movieReducer,
        genres: genreReducer,
        user: userReducer,
        theme: themeReducer,
    }
})