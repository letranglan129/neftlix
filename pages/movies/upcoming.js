import { useRouter } from 'next/router'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { Pagination, SearchResultMovies } from '../../comps/Search'
import useGetList from '../../hooks/useGetList'

export default function Upcoming() {
    const router = useRouter()
    const [page, setPage] = useState()

    const { list, loading, setList, totalPage } = useGetList(
        {
            url: `${process.env.NEXT_PUBLIC_API_URL}/movie/upcoming`,
            options: {
                params: {
                    api_key: process.env.NEXT_PUBLIC_ANALYTICS_ID,
                    page: page,
                },
            },
        },
        1,
        page
    )

    // Change URL
    useEffect(() => {
        if (page) {
            router.push(`?page=${page}`, undefined, {
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
                <meta name="Description" CONTENT="Neftlix - Upcoming"></meta>
                <title>Neftlix - Upcoming Moive</title>
                <meta name="robots" content="noindex,nofollow"></meta>
            </Head>
            <SearchResultMovies
                list={list}
                loading={loading}
                topic="Upcoming"
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
