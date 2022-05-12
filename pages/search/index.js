import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Pagination, SearchResultMovies } from '../../comps/Search'
import useGetList from '../../hooks/useGetList'

export default function SearchPage() {
    const router = useRouter()
    const [page, setPage] = useState()
    const [keyword, setKeyword] = useState()

    const { error, hasMore, list, loading, setList, totalPage } = useGetList(
        {
            url: `${process.env.NEXT_PUBLIC_API_URL}/search/movie`,
            options: {
                params: {
                    api_key: process.env.NEXT_PUBLIC_ANALYTICS_ID,
                    query: keyword,
                    page: page,
                },
            },
        },
        keyword,
        page
    )

    useEffect(() => {
        setList([])
        setPage(isNaN(parseInt(router.query.page)) ? 1 : router.query.page)
        document.querySelector('.simplebar-content').scrollIntoView()
    }, [router.query.page])

    useEffect(() => {
        setList([])
        if (router.query.keyword) {
            setKeyword(router.query.keyword)
        }
    }, [router.query.keyword])

    const handlePageClick = (e) => {
        setList([])
        setPage(e.selected + 1)
    }

    useEffect(() => {
        if (keyword) {
            router.push(`/search?keyword=${keyword}&page=${page}`, undefined, {
                shallow: true,
            })
        }
    }, [page])

    return (
        <>
            <Head>
                <meta
                    name="Description"
                    CONTENT="Neftlix - Search"
                ></meta>
                <title>Neftlix - Search: {keyword}</title>
                <meta name="robots" content="noindex,nofollow"></meta>
            </Head>
            <SearchResultMovies
                list={list}
                loading={loading}
                topic="Search"
                title={router.query.keyword}
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
