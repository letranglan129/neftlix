export default function Swiper({ classNext, classPrev }) {
    return (
        <>
            <div className="inline-block">
                <Swiper.Prev className={classPrev} />
            </div>
            <div className="inline-block ml-4">
                <Swiper.Next className={classNext} />
            </div>
        </>
    )
}

Swiper.Next = ({ className = 'swiper-next' }) => {
    return (
        <button className={className}>
            <i className="far fa-angle-right"></i>
        </button>
    )
}

Swiper.Prev = ({ className = 'swiper-prev' }) => {
    return (
        <button className={className}>
            <i className="far fa-angle-left"></i>
        </button>
    )
}
