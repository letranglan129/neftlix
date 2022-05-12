import axios from 'axios'
import { useEffect, useState } from 'react'

export default function useGetList(configLink, query, page) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [hasMore, setHasMore] = useState(false)
    const [list, setList] = useState([])
    const [totalPage, setTotalPage] = useState(0)

    useEffect(() => {
        if (!query) return

        setLoading(true)
        setError(false)
        let cancel

        axios
            .get(configLink?.url, {
                ...configLink?.options,
                cancelToken: new axios.CancelToken(c => (cancel = c)),
            })
            .then(res => {
                setList(prevList => [
                    ...new Set([...prevList, ...res.data.results]),
                ])
                setTotalPage(res.data.total_pages || 0)
                setHasMore(res.data.results.length > 0)
                setLoading(false)
            })
            .catch(err => {
                if (axios.isCancel(err)) return
                setError(true)
            })

        return () => cancel()
    }, [page, query])

    return { loading, error, hasMore, list, setList, totalPage }
}
