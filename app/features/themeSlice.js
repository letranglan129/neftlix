import { createSlice } from '@reduxjs/toolkit'

const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        mode: '',
    },
    reducers: {
        setTheme: (state, action) => {
            console.log(action.payload)
            state.mode = action.payload
            document.documentElement.classList = []
            document.documentElement.classList.add(action.payload)
            localStorage.setItem('theme', action.payload)
        },

        loadTheme: (state) => {
            if (typeof window !== 'undefined') {
                const theme = localStorage.getItem('theme')
                if(theme) {
                    document.documentElement.classList.add(theme)
                    state.mode = theme 
                }
                else {
                    document.documentElement.classList.add('light')
                    state.mode = 'light'
                }
            }
        },
    },
})

export const { setTheme, loadTheme } = themeSlice.actions
export default themeSlice.reducer
