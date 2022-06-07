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
                <title>Neftlix</title>
                <meta property="og:title" content="Neftlix" key="title" />

                <link
                    rel="shortcut icon"
                    href="https://assets.nflxext.com/us/ffe/siteui/common/icons/nficon2016.ico"
                />
                <link
                    rel="stylesheet"
                    href="https://pro.fontawesome.com/releases/v5.15.4/css/all.css"
                />
                <meta
                    property="og:description"
                    content="Xem trực tuyến các bộ phim và chương trình truyền hình của Netflix hoặc phát trực tuyến ngay trên TV thông minh, máy chơi game, máy tính, Mac, di động, máy tính bảng và nhiều thiết bị khác nữa."
                />
                <meta
                    content="Xem trực tuyến các bộ phim và chương trình truyền hình của Netflix hoặc phát trực tuyến ngay trên TV thông minh, máy chơi game, máy tính, Mac, di động, máy tính bảng và nhiều thiết bị khác nữa."
                    name="description"
                />
                <meta
                    name="google-site-verification"
                    content="rDYVY2V_0jzc128EnEkJLBd6PcBoDXYaSVrGWezTpyY"
                />
                <meta
                    content="xem phim, phim trực tuyến, xem TV, TV trực tuyến, chương trình truyền hình trực tuyến, xem chương trình truyền hình, phim phát trực tuyến, TV phát trực tuyến, phát trực tuyến tức thì, xem trực tuyến, phim, xem phim Việt Nam, xem TV trực tuyến, không cần tải xuống, phim trọn bộ"
                    name="keywords"
                />
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
