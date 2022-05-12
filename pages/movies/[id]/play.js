import axios from 'axios'
import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useCallback, useRef, useState } from 'react'
import SimpleBar from 'simplebar-react'
import { Button } from '../../../comps/Button'
import { IfameVideo } from '../../../comps/Iframe'
import { IMDB, MovieItemWrapper } from '../../../comps/Movie'
import useGetList from '../../../hooks/useGetList'

export const getServerSideProps = async (context) => {
    const id = context.params.id

    try {
        const res = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/movie/${id}`,
            {
                params: {
                    api_key: process.env.NEXT_PUBLIC_ANALYTICS_ID,
                },
            }
        )

        return {
            props: {
                movie: res.data,
            },
        }
    } catch (error) {
        if (error.response) {
            return {
                props: {
                    error: true,
                },
            }
        }
    }

    return {
        props: {
            error: true,
        },
    }
}

export default function PlayMovie({ movie }) {
    const router = useRouter()
    const { id } = router.query
    const [page, setPage] = useState(1)

    const { loading, error, hasMore, list } = useGetList(
        {
            url: `${process.env.NEXT_PUBLIC_API_URL}/movie/${id}/similar`,
            options: {
                params: {
                    api_key: process.env.NEXT_PUBLIC_ANALYTICS_ID,
                },
            },
        },
        id,
        page
    )

    const observer = useRef()
    const lastMovieElRef = useCallback(
        (node) => {
            if (loading) return
            if (observer.current) observer.current.disconnect()

            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setPage((prevPageNumber) => prevPageNumber + 1)
                }
            })

            if (node) observer.current.observe(node)
        },
        [loading, hasMore]
    )

    return (
        <>
            <Head>
                    <meta name="Description" CONTENT={`Neftlix - Play ${movie?.title}`}></meta>
                    <title>Neftlix - MoviePlayer - {movie?.title}</title>
                    <meta name="robots" content="noindex,nofollow"></meta>
            </Head>
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 960:col-span-8">
                    <div className="relative pb-[56.25%] h-0 mb-8">
                        <IfameVideo
                            scrolling="no"
                            src={`https://fsapi.xyz/tmdb-movie/${id}`}
                        ></IfameVideo>
                    </div>
                    <div className="">
                        <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-8">
                                <h2 className="text text-2xl mb-4">
                                    {movie?.title}
                                </h2>
                            </div>
                            <div className="col-span-4">
                                <div className="w-[96px] ml-auto">
                                    <IMDB
                                        className="!text-sm"
                                        imdb={movie?.vote_average.toFixed(1)}
                                    />
                                </div>
                            </div>
                        </div>
    
                        <div className="flex items-center flex-wrap mb-4">
                            {movie?.genres.map((genre) => (
                                <Button
                                    to={`/genre?q=${genre.name}&page=1`}
                                    rounded={1}
                                    outline={1}
                                    key={genre.id}
                                    classCustom="!py-1 !px-4"
                                >
                                    {genre.name}
                                </Button>
                            ))}
                        </div>
                        <p className="text text-base leading-7">
                            Release Date: {movie?.release_date}
                        </p>
                        <p className="text text-base leading-7">
                            {movie?.overview}
                        </p>
                    </div>
                </div>
    
                <div className="col-span-12 960:col-span-4">
                    <h2 className="text text-3xl 960:text-4xl font-semibold mb-2">
                        Similar
                    </h2>
                    <SimpleBar
                        className="960:max-h-[700px] max-h-[500px] overflow-x-hidden"
                        forceVisible="y"
                    >
                        {list?.map((movie, index) => {
                            if (list.length === index + 1)
                                return (
                                    <Link
                                        href={`/movies/${movie.id}/play`}
                                        key={index}
                                    >
                                        <a>
                                            <div
                                                ref={lastMovieElRef}
                                                className="mb-2"
                                            >
                                                <MovieItemWrapper
                                                    className="!w-full"
                                                    src={`${process.env.NEXT_PUBLIC_IMAGES_W200_URL}${movie.poster_path}`}
                                                >
                                                    <p className="text text-sm mb-2 line-clamp-2">
                                                        {movie.title}
                                                    </p>
                                                </MovieItemWrapper>
                                            </div>
                                        </a>
                                    </Link>
                                )
                            else
                                return (
                                    <Link
                                        href={`/movies/${movie.id}/play`}
                                        key={index}
                                    >
                                        <a>
                                            <div className="mb-2">
                                                <MovieItemWrapper
                                                    className="!w-full similar-item"
                                                    src={`${process.env.NEXT_PUBLIC_IMAGES_W200_URL}${movie.poster_path}`}
                                                >
                                                    <div className="flex justify-between flex-1">
                                                        <div>
                                                            <p className="text text-base mb-2 line-clamp-2">
                                                                {movie.title}
                                                            </p>
                                                            <div className="w-[96px]">
                                                                <IMDB
                                                                    className="!text-sm"
                                                                    imdb={movie.vote_average.toFixed(
                                                                        1
                                                                    )}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </MovieItemWrapper>
                                            </div>
                                        </a>
                                    </Link>
                                )
                        })}
    
                        <div>{loading && 'Loading...'}</div>
                        <div>{error && 'Error...'}</div>
                    </SimpleBar>
                </div>
            </div>
        </>
    )
}
