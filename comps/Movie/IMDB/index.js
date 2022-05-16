import { memo } from 'react'

const IMDB = ({ imdb, className }) => {
    return (
        <div
            className={`px-3 text-center py-1 border-2 bg-[#fffae8] dark:bg-[#38352d] dark:text-white border-[#ffcd1b] rounded-lg mr-4 ${className}`}
        >
            <span className="text-[#ffcd1b] mr-1">
                <i className="fas fa-star"></i>
            </span>
            <span className="font-bold">{imdb?.toString()}</span>
        </div>
    )
}

export default memo(IMDB)
