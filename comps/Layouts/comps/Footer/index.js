import axios from 'axios'
import { memo, useEffect, useState } from 'react'
import { URL_LINK_CV } from '../../../../constant'
import { Button } from '../../../Button'

const Footer = () => {
    const [infoDev, setInfoDev] = useState({
        portfolioLink: '',
        cv: '',
    })

    useEffect(() => {
        const getInfoDev = async () => {
            const { data } = await axios.get(URL_LINK_CV)
            setInfoDev(data)
        }
        getInfoDev()
    }, [])

    return (
        <div className="mt-16">
            <div className="py-14 bg-white dark:bg-[#111111] ">
                <div className="container">
                    <div className="text mx-auto flex flex-col items-center justify-center">
                        <h1 className="text-3xl md:text-5xl mb-6">
                            Le Lan Developer
                        </h1>
                        <p className="text-center md:max-w-lg leading-8 mb-6">
                            This is the web made by Le Lan. The website is for
                            educational purposes only and may not be used or
                            advertised
                        </p>
                        <div>
                            <Button
                                circle={1}
                                outline={1}
                                target="_blank"
                                href="https://facebook.com/ltlan"
                                classCustom="mx-6 hover:!bg-dark hover:!text-white dark:hover:!bg-white dark:hover:!text-dark"
                            >
                                <i className="fab fa-facebook-f"></i>
                            </Button>
                            <Button
                                circle={1}
                                outline={1}
                                classCustom="mx-6 hover:!bg-dark hover:!text-white dark:hover:!bg-white dark:hover:!text-dark"
                                target="_blank"
                                href="https://github.com/letranglan129"
                            >
                                <i className="fab fa-github"></i>
                            </Button>
                            <Button
                                circle={1}
                                outline={1}
                                classCustom="mx-6 hover:!bg-dark hover:!text-white dark:hover:!bg-white dark:hover:!text-dark"
                                target="_blank"
                                href="mailto:letranglan129@gmail.com"
                            >
                                <i className="fas fa-envelope"></i>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className=" bg-white dark:bg-black">
                <div className="container">
                    <div className="flex items-center justify-between flex-wrap-reverse md:flex-nowrap">
                        <p className="text mx-auto sm:mx-0">
                            Copyright &#169;2022{' '}
                            <a
                                href="https://facebook.com/ltlan"
                                className="text-blue-600 h"
                            >
                                LeLanDeveloper
                            </a>
                        </p>
                        <div className="mx-auto sm:mx-0">
                            <Button href={infoDev.portfolioLink} text target="_blank" classCustom='dark:!text-white'>
                                Portfolio
                            </Button>
                            <Button href={infoDev.cv} text target="_blank" classCustom='dark:!text-white'>
                                CV
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(Footer)
