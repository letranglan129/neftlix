import IMDB from '../../IMDB'

export default function MovieItem({
    title,
    imdb,
    episode,
    src,
    releaseDate,
    classContainer,
}) {
    return (
        <div
            className={`bg-white dark:bg-transparent dark:text-white border-2 border-transparent dark:border-[#42434e] p-[10px] rounded-[20px] h-full flex flex-col justify-between transition-transform duration-300 transform hover:-translate-y-3 ${classContainer}`}
        >
            <img
                src={src}
                alt=""
                onError={(e) => (e.target.src = '/images/noPhoto.jpg')}
                className="rounded-xl mb-4 h-full"
                loading="lazy"
            />
            <div>
                <div className="flex items-center text-sm mb-2">
                    <IMDB imdb={imdb?.toFixed(1)} />
                    {episode && (
                        <p className="text-light text-sm line-clamp-1">
                            {episode}
                        </p>
                    )}
                </div>
                <p className="text text-sm mb-1 line-clamp-1">
                    {releaseDate || '0'}
                </p>
                {title && (
                    <p className="text text-base font-bold mb-2 line-clamp-1">
                        {title}
                    </p>
                )}
            </div>
        </div>
    )
}
