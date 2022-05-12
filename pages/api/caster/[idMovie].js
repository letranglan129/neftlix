import axios from 'axios'

export default async function handler(req, res) {
    const { idMovie, limit } = req.query

    const resp = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/movie/${idMovie}/credits`,
        {
            params: {
                api_key: process.env.NEXT_PUBLIC_ANALYTICS_ID,
            },
        }
    )
	
	delete resp.data?.crew
	if (resp.data.cast.length > limit) resp.data.cast.length = limit

    res.status(200).json(resp.data)
}
