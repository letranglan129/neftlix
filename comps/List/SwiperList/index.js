import { memo } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Button, Swiper as ButtonSwiper } from '../../Button'

function SwiperList(props) {
    const { type, title, children, name, sizeTitle, titleTo } = props
    return (
        <>
            <div data-name={name} className="section">
                <div
                    className={`flex items-center justify-between ${
                        sizeTitle === 'small' ? 'mb-4' : 'mb-4 md:mb-6'
                    }`}
                >
                    <Button
                        classCustom={`!p-0 ${
                            sizeTitle === 'small'
                                ? 'text-base md:text-xl'
                                : 'text-2xl md:text-4xl'
                        } font-semibold dark:text-white`}
                        text={titleTo}
                        to={`${titleTo ? titleTo + '?page=1' : ''}`}
                    >
                        {title}
                    </Button>
                    <div className="flex items-center">
                        <ButtonSwiper
                            classNext={props?.swiperParams?.navigation.nextEl}
                            classPrev={props?.swiperParams?.navigation.prevEl}
                        ></ButtonSwiper>
                    </div>
                </div>
                {
                    {
                        swiper: (
                            <SwiperList.Swiper
                                name={name}
                                swiperParams={props.swiperParams}
                            >
                                {children}
                            </SwiperList.Swiper>
                        ),
                    }[type]
                }
            </div>
        </>
    )
}

SwiperList.Swiper = ({ children, swiperParams, name, viewMore = false }) => {
    const formatClass = (string = '') => {
        return string.replaceAll(' ', '.')
    }
    const renderSlide = () => {
        if (Array.isArray(children)) {
            return children?.map((child, index) => (
                <SwiperSlide key={index}>{child}</SwiperSlide>
            ))
        }
    }

    return (
        <Swiper
            {...swiperParams}
            className={`pt-3 ${swiperParams.className}`}
            navigation={{
                nextEl: `[data-name="${name}"] .${formatClass(
                    swiperParams?.navigation.nextEl
                )}`,
                prevEl: `[data-name="${name}"] .${formatClass(
                    swiperParams?.navigation.prevEl
                )}`,
            }}
        >
            {renderSlide()}
        </Swiper>
    )
}

export default memo(SwiperList)
