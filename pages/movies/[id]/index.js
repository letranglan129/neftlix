import axios from 'axios'
import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { Navigation } from 'swiper'
import { Button } from '../../../comps/Button'
import { IfameVideo } from '../../../comps/Iframe'
import { SwiperList } from '../../../comps/List'
import { IMDB, MovieItem } from '../../../comps/Movie'
import { TrailerItem } from '../../../comps/Trailer'
import ErrorPage from '../../404'
import { Avatar } from './../../../comps/Movie'

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

Modal.setAppElement('#__next')

export default function Details(props) {
    const { movie, error } = props
    const [casters, setCasters] = useState([])
    const [trailers, setTrailers] = useState([])
    const [recommendations, setRecommendations] = useState([])
    const router = useRouter()

    // This is the solution for Link component of NextJS not working
    // Now Link component can't scroll to top page when change URL
    useEffect(() => {
        if (router.query.id) {
            document.querySelector('.simplebar-content').scrollIntoView()
        }
    }, [router.query.id])

    useEffect(() => {
        const getCaster = async () => {
            try {
                const res = await axios.get(`/api/caster/${movie?.id}`, {
                    params: {
                        limit: 5,
                    },
                })
                setCasters(res.data?.cast)
            } catch (error) {
                console.log(error)
            }
        }
        const getTrailer = async () => {
            try {
                const res = await axios.get(`/api/trailer/${movie?.id}`, {
                    params: {
                        limit: 5,
                    },
                })
                setTrailers(res.data?.results)
            } catch (error) {
                console.log(error)
            }
        }

        const getRecommendation = async () => {
            try {
                const res = await axios.get(`/api/recommendation/${movie?.id}`)
                setRecommendations(res.data?.results)
            } catch (error) {
                console.log(error)
            }
        }

        getRecommendation()
        getTrailer()
        getCaster()
    }, [movie])

    if (error) return <ErrorPage />

    return (
        <>
            <Head>
                <meta name="Description" CONTENT={`Neftlix - ${movie?.title}`}></meta>
                <title>Neftlix - Movie - {movie?.title}</title>
                <meta name="robots" content="noindex,nofollow"></meta>
            </Head>
            <div>
                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-12 960:!col-span-2 md:col-span-3">
                        <img
                            src={`${process.env.NEXT_PUBLIC_IMAGES_W400_URL}${movie?.poster_path}`}
                            className="w-full max-w-[280px] m-auto md:m-0 md:max-w-none md:w-[140px] 960:w-[160px] rounded-xl"
                        />
                    </div>

                    <div className="col-span-12 960:!col-span-10 md:col-span-9">
                        <div className="flex-1 flex flex-col justify-between h-full">
                            <div className="mb-4 md:mb-0 flex items-center">
                                <h2 className="text text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold line-clamp-2 mr-4    ">
                                    {movie?.title}
                                </h2>
                                <div className="min-w-[80px] hidden md:block">
                                    <IMDB
                                        imdb={movie?.vote_average}
                                        className="w-full"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center md:mb-0 mb-4 flex-wrap">
                                {movie?.genres.map((genre) => (
                                    <Button
                                        to={`/genre?q=${genre.name}&page=1`}
                                        rounded={1}
                                        outline={1}
                                        key={genre.id}
                                        classCustom="!py-1 !px-4 !mb-2"
                                    >
                                        {genre.name}
                                    </Button>
                                ))}
                            </div>
                            <div className="flex items-center">
                                <Button
                                    to={`/movies/${movie?.id}/play`}
                                    classCustom="!px-6 h-[56px] !bg-[#5179ff] !text-white"
                                    rounded={1}
                                    leftIcon={<i className="fas fa-play"></i>}
                                >
                                    WATCH
                                </Button>

                                <Button
                                    circle={1}
                                    outline={1}
                                    classCustom="!border-2 !border-[#ff6667] !text-[#ff6667] leading-none"
                                >
                                    <i className="fas fa-heart"></i>
                                </Button>
                                <Button
                                    circle={1}
                                    outline={1}
                                    classCustom=" leading-none border-dark text-dark dark:border-white dark:text-white"
                                >
                                    <i className="fas fa-share-alt"></i>
                                </Button>
                                <Button
                                    circle={1}
                                    outline={1}
                                    classCustom=" leading-none border-dark text-dark dark:border-white dark:text-white"
                                >
                                    <i className="far fa-ellipsis-h"></i>
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-12 960:!col-span-2 md:col-span-3">
                        <h2 className="text text-3xl mb-2">
                            {movie?.release_date.split('-')[0]}
                        </h2>
                        <h4 className="text text-xl">
                            {movie?.runtime} Minutes
                        </h4>
                    </div>

                    <div className="col-span-12 md:col-span-6">
                        <h2 className="text font-semibold mb-4 text-lg">
                            STORYLINE
                        </h2>
                        <p className="text">{movie?.overview}</p>
                    </div>

                    <div className="col-span-12 960:!col-span-4 md:col-span-3">
                        <h2 className="text font-semibold mb-4 text-lg">
                            CAST
                        </h2>
                        <ul>
                            {casters.map((caster) => (
                                <li key={caster.id}>
                                    <Avatar
                                        caster={caster}
                                        src={`${process.env.NEXT_PUBLIC_IMAGES_W200_URL}${caster.profile_path}`}
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>

                    {trailers.length > 0 && (
                        <div className="col-span-12">
                            <SwiperList
                                type="swiper"
                                title="Trailer"
                                swiperParams={{
                                    slidesPerView: 3,
                                    spaceBetween: 8,
                                    slidesPerGroup: 3,
                                    modules: [Navigation],
                                    navigation: {
                                        nextEl: 'swiper-next',
                                        prevEl: 'swiper-prev',
                                    },
                                    className: 'swiper-trailer',
                                    speed: 700,
                                    breakpoints: {
                                        0: {
                                            slidesPerView: 2,
                                            spaceBetween: 8,
                                        },
                                        500: {
                                            slidesPerView: 3,
                                            spaceBetween: 16,
                                        },

                                        960: {
                                            slidesPerView: 4,
                                            spaceBetween: 8,
                                        },
                                    },
                                }}
                                name="trailer"
                            >
                                {trailers?.map(
                                    (trailer) =>
                                        trailer?.site === 'YouTube' && (
                                            <Link
                                                href={`/movies/${movie?.id}?trailer=${trailer?.key}`}
                                                key={trailer.id}
                                            >
                                                <a>
                                                    <TrailerItem
                                                        trailer={trailer}
                                                    />
                                                </a>
                                            </Link>
                                        )
                                )}
                            </SwiperList>
                        </div>
                    )}

                    {recommendations?.length > 0 && (
                        <div className="col-span-12">
                            <SwiperList
                                type="swiper"
                                title="Recommendation"
                                swiperParams={{
                                    slidesPerView: 3,
                                    spaceBetween: 8,
                                    slidesPerGroup: 3,
                                    modules: [Navigation],
                                    navigation: {
                                        nextEl: 'swiper-next',
                                        prevEl: 'swiper-prev',
                                    },
                                    className: 'swiper-category',
                                    speed: 700,
                                    breakpoints: {
                                        0: {
                                            slidesPerView: 2,
                                            spaceBetween: 8,
                                        },
                                        500: {
                                            slidesPerView: 3,
                                            spaceBetween: 16,
                                        },
                                        768: {
                                            slidesPerView: 4,
                                            spaceBetween: 8,
                                        },
                                        960: {
                                            slidesPerView: 5,
                                            spaceBetween: 8,
                                        },
                                    },
                                }}
                                name="recommendation"
                            >
                                {recommendations?.map((movie) => (
                                    <Link
                                        href={`/movies/${movie?.id}`}
                                        key={movie?.id}
                                        scroll
                                    >
                                        <a>
                                            <MovieItem
                                                title={movie?.title}
                                                imdb={movie?.vote_average}
                                                releaseDate={
                                                    movie?.release_date.split(
                                                        '-'
                                                    )[0]
                                                }
                                                src={`${process.env.NEXT_PUBLIC_IMAGES_W200_URL}${movie?.poster_path}`}
                                            />
                                        </a>
                                    </Link>
                                ))}
                            </SwiperList>
                        </div>
                    )}
                </div>

                <Modal
                    isOpen={!!router.query.trailer}
                    onRequestClose={() => router.back()}
                    className="modal modal-youtbe"
                    overlayClassName="modal-overlay"
                >
                    <div className="relative pb-[56.25%] h-0">
                        <IfameVideo
                            src={`https://www.youtube.com/embed/${router.query.trailer}?autoplay=1&color=white&rel=0"`}
                        />
                    </div>
                </Modal>
            </div>
        </>
    )
}
