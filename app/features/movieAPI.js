import axios from 'axios'
export const movieApi = {
    async getMovies() {
        const LIMIT_TOPRATED_MOVIES = 5

        const apiLinkRequest = [
            `${process.env.NEXT_PUBLIC_API_URL}/movie/popular`,
            `${process.env.NEXT_PUBLIC_API_URL}/movie/top_rated`,
            `${process.env.NEXT_PUBLIC_API_URL}/movie/upcoming`,
            `${process.env.NEXT_PUBLIC_API_URL}/trending/movie/week`,
        ]

        const params = {
            params: {
                api_key: process.env.NEXT_PUBLIC_ANALYTICS_ID,
                language: 'en-US',
            },
        }

        const apiPromiseList = apiLinkRequest.map(link =>
            axios.get(link, params)
        )

        const [popularMovies, topRatedMovies, upcomingMovies, trendingMovies] =
            await axios.all(apiPromiseList)

        topRatedMovies.data.results.length = LIMIT_TOPRATED_MOVIES

        return {
            topRatedMovies: topRatedMovies.data,
            popularMovies: popularMovies.data,
            upcomingMovies: upcomingMovies.data,
            trendingMovies: trendingMovies.data,
        }
    },

    async getGenres() {
        const params = {
            params: {
                api_key: process.env.NEXT_PUBLIC_ANALYTICS_ID,
                language: 'en-US',
            },
        }

        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/genre/movie/list`, params)
        
        return res.data.genres
    }
}
