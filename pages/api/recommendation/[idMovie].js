import axios from 'axios'

export default async function handler(req, res) {
    const { idMovie } = req.query

    const resp = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/movie/${idMovie}/recommendations`,
        {
            params: {
                api_key: process.env.NEXT_PUBLIC_ANALYTICS_ID,
            },
        }
    )

    res.status(200).json(resp.data)
}
