import Link from 'next/link'
import { memo, useRef, useState } from 'react'
import { NAVBAR_LINKS } from '../../../../constant'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

const Navbar = () => {
    const [isOpenNav, setIsOpenNav] = useState(false)
    const { register, handleSubmit, setValue } = useForm()
    const router = useRouter()
    const searchModal = useRef()

    const handleOpenNav = () => setIsOpenNav(true)
    const handleCloseNav = () => setIsOpenNav(false)

    const onSubmit = (data) => {
        if (data.keyword1.trim() !== '' || data.keyword2.trim() !== '') {
            setIsOpenNav(false)
            setValue('keyword1', '')
            setValue('keyword2', '')
            router.push({
                pathname: '/search',
                query: {
                    keyword: data.keyword1 || data.keyword2,
                    page: 1,
                },
            })
        }
    }

    const showNotifyUpdating = () => {
        toast.info("We're updating our website", {
            position: 'bottom-left',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        })
    }

    const checkOpenSearchModal = () => {
        if (window.innerWidth < 640) return true
        setIsOpenNav(false)
    }

    const closeSearchModal = () => {
        searchModal.current?.classList.remove('active')
    }

    const openSearchModal = () => {
        if (checkOpenSearchModal()) searchModal.current?.classList.add('active')
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light">
            <div className="navbar-container">
                <button className="navbar-toggler" onClick={handleOpenNav}>
                    <i className="far fa-bars"></i>
                </button>

                <div className="collapse navbar-collapse">
                    <Link href="/">
                        <a className="navbar-logo">
                            <img src="/images/logo.png" alt="" loading="lazy" />
                        </a>
                    </Link>
                    <ul
                        className={`transition-transform duration-500 ${
                            isOpenNav ? 'navbar-nav active' : 'navbar-nav'
                        }`}
                    >
                        <button className="close-nav" onClick={handleCloseNav}>
                            <i className="fal fa-times"></i>
                        </button>
                        {NAVBAR_LINKS.map((link, index) => (
                            <li
                                className="nav-item"
                                key={index}
                                onClick={showNotifyUpdating}
                            >
                                <a className="nav-link" href={link.href}>
                                    {link.name}
                                </a>
                            </li>
                        ))}

                        <div className="overlay" onClick={handleCloseNav}></div>
                    </ul>
                </div>

                <div className="flex items-center relative">
                    <form
                        className="search-form"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <label
                            className="search-container cursor-pointer"
                            onClick={openSearchModal}
                        >
                            <input
                                type="text"
                                {...register('keyword1')}
                                placeholder="Search..."
                                onBlur={(e) => (e.target.value = '')}
                                autoComplete={'off'}
                            />

                            <span className="search-icon">
                                <i className="far fa-search"></i>
                            </span>
                            <button type="submit"></button>
                        </label>
                    </form>

                    <div className="search-modal" ref={searchModal}>
                        <form
                            className="search-form mobile"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <label className="">
                                <input
                                    type="text"
                                    {...register('keyword2')}
                                    placeholder="Search..."
                                    className="w-full"
                                    onBlur={(e) => (e.target.value = '')}
                                    autoComplete={'off'}
                                />
                                <button className="search-icon">
                                    <i className="far fa-search"></i>
                                </button>
                            </label>
                        </form>
                        <div
                            onClick={closeSearchModal}
                            className="overlay"
                        ></div>
                    </div>

                    <div className="dropdown relative">
                        <a
                            className="dropdown-toggle"
                            onClick={showNotifyUpdating}
                        >
                            <i className="fas fa-bell"></i>
                            <span className="text-white bg-red-700 absolute rounded-full text-xs -mt-2.5 ml-2 py-0 px-1.5">
                                1
                            </span>
                        </a>
                        <ul className="dropdown-menu">
                            <li>
                                <a className="dropdown-item" href="#">
                                    Action
                                </a>
                            </li>
                            <li>
                                <a className="dropdown-item" href="#">
                                    Another action
                                </a>
                            </li>
                            <li>
                                <a className="dropdown-item" href="#">
                                    Something else here
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default memo(Navbar)
