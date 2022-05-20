import dynamic from 'next/dynamic'
import { memo, useEffect, useRef, useState } from 'react'
import Modal from 'react-modal'
import { useDispatch, useSelector } from 'react-redux'
import { Navigation } from 'swiper'
import { setTheme } from '../../../../app/features/themeSlice'
import { logout as firebaseLogout } from '../../../../firebase/auth'
import { Switches } from '../../../Button'
import { SwiperList } from '../../../List'
import Auth from '../../../User/Auth'
import Avatar from './Avatar'
import ButtonLogin from './ButtonLogin'

const MovieCardDynamic = dynamic(() => import('../../../Movie/MovieElement/Card'), {
    ssr: false,
})
const MovieItemDynamic = dynamic(() => import('../../../Movie/MovieElement/Items'), {
    ssr: false,
})


Modal.setAppElement('#__next')

const UserMovie = () => {
    const [isOpenManager, setIsOpenManager] = useState(false)
    const [isOpenLogin, setIsOpenLogin] = useState(false)
    const user = useSelector((state) => state.user.info)
    const theme = useSelector((state) => state.theme.mode)
    const dispatch = useDispatch()
    const userMovie = useRef()

    // Handle move button toggle user movie
    const handleDrag = (e) => {
        if (e.pageY !== 0)
            e.target.style.top = `${(e.pageY / window.innerHeight) * 100}%`
    }

    const handleTouchMove = (e) => {
        const touches = e.changedTouches
        if (touches?.length !== 0) 
            e.target.style.top = `${(touches[0].pageY / window.innerHeight) * 100}%`
    }

    const handleTouchStart = (e) => {
        document.querySelector('.simplebar-content-wrapper').style.pointerEvents = 'none'
    }

    const handleTouchEnd = (e) => {
        document.querySelector('.simplebar-content-wrapper').style.pointerEvents = 'auto'
    }

    // Handle show/hide login/register modal
    const openModalLogin = () => {
        setIsOpenLogin(true)
        setIsOpenManager(false)
    }

    const closeModalLogin = () => setIsOpenLogin(false)

    const openModalManager = () => setIsOpenManager(!isOpenManager)

    // Handle change theme
    const changeTheme = (e) => {
        if (e.target.checked) {
            dispatch(setTheme('dark'))
        } else {
            dispatch(setTheme('light'))
        }
    }

    const handleLogout = () => {
        firebaseLogout()
        setIsOpenLogin(false)
    }

    const renderLogin = () => {
        if (Object.keys(user).length !== 0) return <Avatar user={user} />
        else return <ButtonLogin onClick={openModalLogin} />
    }

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (!userMovie.current.contains(e.target)) {
                setIsOpenManager(false)
            }
        }

        window.addEventListener('click', handleOutsideClick)

        return () => window.removeEventListener('click', handleOutsideClick)
    }, [])

    return (
        <>
            <div
                className={`${
                    isOpenManager ? 'user-content active' : 'user-content'
                }`}
                ref={userMovie}
            >
                <div
                    id="buttonToggleUserMovie"
                    className="absolute top-[10%] z-10 p-3 right-full cursor-pointer rounded-l-lg text-white dark:text-dark  bg-gray-800 dark:bg-gray-300 transition-all duration-500 ease-in-out"
                    onClick={openModalManager}
                    draggable
                    onDrag={handleDrag}
                    onTouchMove={handleTouchMove}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                >
                    {isOpenManager ? (
                        <i className="far fa-arrow-from-left"></i>
                    ) : (
                        <i className="far fa-arrow-from-right"></i>
                    )}
                </div>
                <div className="absolute w-full top-0 bottom-0 overflow-y-scroll hidden-scroll rounded-l-3xl bg-[#f0f3fe] dark:bg-[#22242f]">
                    <div className="bg-[#f0f3fe] dark:bg-[#22242f]">
                        <div className="container pt-4 pb-4">
                            <div className="flex items-start justify-between">
                                {renderLogin()}

                                <div className="relative show-menu">
                                    <button className="btn">
                                        <i className="far fa-ellipsis-v"></i>
                                    </button>

                                    {Object.keys(user).length !== 0 && (
                                        <ul className="user-menu">
                                            <li className="user-menu-item">
                                                <button>
                                                    Thông tin cá nhân
                                                </button>
                                            </li>
                                            <li className="user-menu-item">
                                                <div className="flex items-center justify-between">
                                                    <p>Giao diện</p>
                                                    <Switches.Theme
                                                        onChange={changeTheme}
                                                    />
                                                </div>
                                            </li>
                                            <li
                                                className="user-menu-item"
                                                onClick={handleLogout}
                                            >
                                                <button>Đăng xuất</button>
                                            </li>
                                        </ul>
                                    )}
                                    {Object.keys(user).length === 0 && (
                                        <ul className="user-menu">
                                            <li className="user-menu-item">
                                                <div className="flex items-center justify-between">
                                                    <p>Giao diện</p>
                                                    <Switches.Theme
                                                        onChange={changeTheme}
                                                        value={theme === 'dark'}
                                                    />
                                                </div>
                                            </li>
                                        </ul>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="container pt-4 pb-4 pr-0">
                            <SwiperList
                                type="swiper"
                                title="New episode"
                                sizeTitle="small"
                                swiperParams={{
                                    slidesPerView: 'auto',
                                    spaceBetween: 16,
                                    modules: [Navigation],
                                    navigation: {
                                        nextEl: 'swiper-next mr-button',
                                        prevEl: 'swiper-prev',
                                    },
                                    className: 'new-episode-swiper',
                                    speed: 700,
                                }}
                                width="auto"
                                name="newEpisode"
                            >
                                {Array(10)
                                    .fill(0)
                                    .map((_, index) => (
                                        <MovieCardDynamic
                                            key={index}
                                            espisode="Part 2, Espisode 6"
                                            title="Peaky Blinder"
                                            time="17m"
                                            className='hover:-translate-y-3 transition-transform duration-500'
                                        />
                                    ))}
                            </SwiperList>
                        </div>

                        <div className="container pt-4 pb-4 pr-0">
                            <SwiperList
                                type="swiper"
                                title="Continue watching"
                                sizeTitle="small"
                                swiperParams={{
                                    slidesPerView: 'auto',
                                    spaceBetween: 16,
                                    modules: [Navigation],
                                    navigation: {
                                        nextEl: 'swiper-next mr-button',
                                        prevEl: 'swiper-prev',
                                    },
                                    className: 'continue-watching-swiper',
                                    speed: 700,
                                }}
                                width="auto"
                                name="continueWatching"
                            >
                                {Array(10)
                                    .fill(0)
                                    .map((_, index) => (
                                        <MovieCardDynamic
                                            key={index}
                                            espisode="Part 2, Espisode 6"
                                            title="Peaky Blinder"
                                            process={{
                                                numerator: 17,
                                                denominator: 20,
                                            }}
                                            className='hover:-translate-y-3 transition-transform duration-500'
                                        />
                                    ))}
                            </SwiperList>
                        </div>

                        <div className="container pt-4 pb-4 pr-0">
                            <SwiperList
                                type="swiper"
                                title="Friends watching"
                                sizeTitle="small"
                                swiperParams={{
                                    slidesPerView: 'auto',
                                    spaceBetween: 16,
                                    modules: [Navigation],
                                    navigation: {
                                        nextEl: 'swiper-next mr-button',
                                        prevEl: 'swiper-prev',
                                    },
                                    className: 'friends-watching-swiper',
                                    speed: 700,
                                }}
                                width="auto"
                                name="friendsWatching"
                            >
                                {Array(10)
                                    .fill(0)
                                    .map((_, index) => (
                                        <MovieItemDynamic
                                            key={index}
                                            title="Peaky Blinder"
                                            imdb={Math.random() * 10}
                                            releaseDate={2022 - index}
                                            classContainer="user-friends-watching"
                                            src="https://image.tmdb.org/t/p/w500/90ez6ArvpO8bvpyIngBuwXOqJm5.jpg"
                                        />
                                    ))}
                            </SwiperList>
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                isOpen={isOpenLogin && !Object.keys(user).length}
                onRequestClose={closeModalLogin}
                className="modal modal-login"
                overlayClassName="modal-overlay"
            >
                <Auth></Auth>
            </Modal>
        </>
    )
}

export default memo(UserMovie)