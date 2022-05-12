import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Pagination, SearchResultMovies } from '../../comps/Search'
import useGetList from '../../hooks/useGetList'

export const getServerSideProps = async (context) => {
    const q = context.query.q

    const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/genre/movie/list`,
        {
            params: {
                api_key: process.env.NEXT_PUBLIC_ANALYTICS_ID,
            },
        }
    )

    const genres = res.data.genres

    return {
        props: {
            genre: genres.find((genre) => genre?.name === q),
        },
    }
}

export default function Genres({ genre }) {
    const router = useRouter()
    const [page, setPage] = useState()

    const { error, hasMore, list, loading, setList, totalPage } = useGetList(
        {
            url: `${process.env.NEXT_PUBLIC_API_URL}/discover/movie`,
            options: {
                params: {
                    api_key: process.env.NEXT_PUBLIC_ANALYTICS_ID,
                    with_genres: genre?.id,
                    page: page,
                },
            },
        },
        genre?.id,
        page
    )

    // Change URL
    useEffect(() => {
        if (genre?.name && page) {
            router.push(`/genre?q=${genre?.name}&page=${page}`, undefined, {
                shallow: true,
            })
        }
    }, [page])

    // Change page when click on back/next button
    useEffect(() => {
        setList([])
        if (isNaN(parseInt(router.query.page))) {
            setPage(1)
        } else {
            setPage(router.query.page)
        }
        document.querySelector('.simplebar-content').scrollIntoView()
    }, [router.query.page])

    const handlePageClick = (e) => {
        setList([])
        setPage(e.selected + 1)
    }

    return (
        <>
            <Head>
                <meta name="Description" CONTENT="Neftlix - Genre"></meta>
                <title>Neftlix - Gerne - {genre?.name}</title>
                <meta name="robots" content="noindex,nofollow"></meta>
            </Head>
            <SearchResultMovies
                list={list}
                loading={loading}
                topic="Genre"
                title={genre?.name}
                conditionShow={true}
            />
            <Pagination
                isLoading={loading}
                handlePageClick={handlePageClick}
                page={page}
                totalPage={totalPage}
            />
        </>
    )
}
