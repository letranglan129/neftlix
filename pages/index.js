import Link from 'next/link'
import Head from 'next/head'
import { useSelector } from 'react-redux'
import { Navigation } from 'swiper'
import Banner from '../comps/Banner'
import { SwiperList } from '../comps/List'
import { MovieItem } from '../comps/Movie'
import { GENRES_LIST } from '../constant'

export default function HomePage() {
    const { list } = useSelector((state) => state.movies)

    return (
        <>
            <Head>
                <meta
                    name="Description"
                    CONTENT="Neftlix - Le Trang Lan IT"
                ></meta>
                <title>Home - Neftlix</title>
                <meta name="robots" content="noindex,nofollow"></meta>
            </Head>
            <div className="mb-10">
                <Banner movies={list?.topRatedMovies?.results} />
            </div>
            <div className="mb-10">
                <SwiperList
                    type="swiper"
                    title="Categoty"
                    swiperParams={{
                        slidesPerView: 2,
                        spaceBetween: 16,
                        modules: [Navigation],
                        navigation: {
                            nextEl: 'swiper-next',
                            prevEl: 'swiper-prev',
                        },
                        className: 'swiper-category',
                        speed: 700,
                        breakpoints: {
                            0: {
                                slidesPerView: 1,
                                spaceBetween: 4,
                            },
                            400: {
                                slidesPerView: 2,
                                spaceBetween: 8,
                            },
                            768: {
                                slidesPerView: 3,
                            },
                            960: {
                                slidesPerView: 4,
                            },
                        },
                    }}
                    name="category"
                >
                    {GENRES_LIST.map((genre) => (
                        <Link
                            href={`/genre?q=${genre.name}&page=1`}
                            key={genre.id}
                        >
                            <a>
                                <div className="category-item">
                                    <h2 className="name">{genre.name}</h2>
                                    <img
                                        src={genre.image}
                                        alt=""
                                        className="h-full object-cover"
                                    />
                                </div>
                            </a>
                        </Link>
                    ))}
                </SwiperList>
            </div>
            <div className="mb-10">
                <SwiperList
                    type="swiper"
                    titleTo="/movies/upcoming"
                    title="Upcoming"
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
                    name="upcoming"
                >
                    {list?.upcomingMovies?.results.map((item) => (
                        <Link href={`/movies/${item.id}`} key={item.id}>
                            <a>
                                <MovieItem
                                    title={item.title}
                                    imdb={item.vote_average}
                                    releaseDate={
                                        item.release_date.split('-')[0]
                                    }
                                    src={`${process.env.NEXT_PUBLIC_IMAGES_W200_URL}${item.poster_path}`}
                                />
                            </a>
                        </Link>
                    ))}
                </SwiperList>
            </div>

            <div className="mb-10">
                <SwiperList
                    type="swiper"
                    titleTo="/movies/trending"
                    title="Trending"
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
                    name="trending"
                >
                    {list?.trendingMovies?.results.map((item) => (
                        <Link href={`/movies/${item.id}`} key={item.id}>
                            <a>
                                <MovieItem
                                    title={item.title}
                                    imdb={item.vote_average}
                                    releaseDate={
                                        item.release_date.split('-')[0]
                                    }
                                    src={`${process.env.NEXT_PUBLIC_IMAGES_W200_URL}${item.poster_path}`}
                                />
                            </a>
                        </Link>
                    ))}
                </SwiperList>
            </div>
            <div className="mb-10">
                <SwiperList
                    type="swiper"
                    titleTo="/movies/popular"
                    title="Popular"
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
                    name="popular"
                >
                    {list?.popularMovies?.results.map((item) => (
                        <Link href={`/movies/${item.id}`} key={item.id}>
                            <a>
                                <MovieItem
                                    title={item.title}
                                    imdb={item.vote_average}
                                    releaseDate={
                                        item.release_date.split('-')[0]
                                    }
                                    src={`${process.env.NEXT_PUBLIC_IMAGES_W200_URL}${item.poster_path}`}
                                />
                            </a>
                        </Link>
                    ))}
                </SwiperList>
            </div>
        </>
    )
}
