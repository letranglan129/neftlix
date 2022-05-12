import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { Navigation } from 'swiper'
import 'swiper/css/navigation'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Button, Swiper as ButtonSwiper } from '../Button'
import { IfameVideo } from '../Iframe'
import { TrailerItem } from '../Trailer'


Modal.setAppElement('#__next')

export default function Banner({ movies }) {
    const router = useRouter()

    return (
        <>
            <div id="banner">
                <Swiper>
                    {movies?.map((item, index) => (
                        <SwiperSlide key={index}>
                            <BannerItem movie={item} />
                        </SwiperSlide>
                    ))}
                </Swiper>
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
        </>
    )
}

function BannerItem({ movie }) {
    const [trailers, setTrailers] = useState([])
    const [casters, setCasters] = useState([])

    useEffect(() => {
        const getTrailer = async () => {
            const res = await axios.get(`/api/trailer/${movie.id}`, {
                params: {
                    limit: 5,
                },
            })
            setTrailers(res.data?.results)
        }

        const getCast = async () => {
            const res = await axios.get(`/api/caster/${movie.id}`, {
                params: {
                    limit: 3,
                },
            })

            setCasters(res.data?.cast)
        }

        getCast()
        getTrailer()
    }, [])

    return (
        <div className="relative">
            <img
                src={`${process.env.NEXT_PUBLIC_IMAGES_RAW_URL}${movie.backdrop_path}`}
                className="w-full rounded-[20px] md:rounded-[48px]"
            />
            <div className="absolute inset-0 flex flex-col">
                <div className="mb-auto px-1 pt-1 sm:px-4 sm:pt-4 md:px-9 md:pt-9 invisible sm:visible">
                    <BannerItem.CasterList casters={casters} />
                </div>

                <div className="flex items-end justify-between pl-4 pb-4 sm:pl-4 sm:pb-4 md:pl-9 md:pb-9">
                    <div className="md:w-1/2">
                        <Link href={`/movies/${movie.id}`}>
                            <a>
                                <div className="name text-sm sm:text-2xl lg:text-4xl text-white mb-2 md:mb-6 hover:text-gray-300">
                                    {movie.title}
                                </div>
                            </a>
                        </Link>

                        <Button
                            primary={1}
                            to={`/movies/${movie.id}/play`}
                            leftIcon={<i className="fas fa-play"></i>}
                            classCustom="!bg-red-primary hover:!bg-red-600"
                        >
                            Watch now
                        </Button>
                    </div>
                    <BannerItem.TrailerList trailers={trailers} />
                </div>
            </div>
        </div>
    )
}

BannerItem.TrailerList = ({ trailers }) => {
    if (trailers.length === 0) return null

    return (
        <div className="trailer-list">
            <Swiper
                allowTouchMove={false}
                slidesPerView={'auto'}
                spaceBetween={24}
                navigation={{
                    nextEl: '.swiper-next',
                    prevEl: '.swiper-prev',
                }}
                modules={[Navigation]}
                className="banner-swiper-trailer"
                speed={700}
            >
                <ButtonSwiper.Next />
                <ButtonSwiper.Prev />
                {trailers.length != 0 &&
                    trailers.map((trailer, index) => (
                        <SwiperSlide key={index}>
                            <Link
                                href={`?trailer=${trailer?.key}`}
                                key={trailer.id}
                            >
                                <a>
                                    <TrailerItem
                                        trailer={trailer}
                                        styleImg={{ maxHeight: '120px' }}
                                    />
                                </a>
                            </Link>
                        </SwiperSlide>
                    ))}
            </Swiper>
        </div>
    )
}

BannerItem.CasterList = ({ casters }) => {
    return (
        <>
            {casters.length != 0 && (
                <>
                    <h4 className="text-white mb-1">Starring</h4>
                    <div className="flex">
                        {casters.map((cast, index) => (
                            <img
                                src={`${process.env.NEXT_PUBLIC_IMAGES_W200_URL}${cast.profile_path}`}
                                className="h-12 w-12 rounded-2xl object-cover"
                                style={{
                                    marginLeft: index === 0 ? '0' : '-10px',
                                }}
                                key={index}
                            />
                        ))}
                    </div>
                </>
            )}
        </>
    )
}
