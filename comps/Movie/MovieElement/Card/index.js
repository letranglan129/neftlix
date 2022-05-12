import MovieItemWrapper from '../Items/Wrapper'

export default function MovieCard({ title, espisode, process, time }) {
    return (
        <MovieItemWrapper>
            <div>
                <p className="text text-sm md:text-base font-bold mb-2 line-clamp-1">
                    {title || 'The King of Fighters'}
                </p>

                {espisode && (
                    <p className="text-light text-xs md:text-sm mb-2 line-clamp-1">
                        {espisode}
                    </p>
                )}

                {time && (
                    <p className="text-blue-600 text-xs md:text-base font-semibold">
                        {time}
                    </p>
                )}

                {process && (
                    <div className='relative w-full h-[6px] bg-[#fcd8da] rounded-md overflow-hidden'>
                        <div className='absolute top-0 left-0 bottom-0 bg-[#f13e45]' style={{
                            // width: `${process.numerator / process.denominator * 100}%`
                            // width: `${(Math.random() * 100).toFixed(0)}%`
                            width: `${process.numerator / process.denominator * 100}%`
                        }}></div>
                    </div>
                )}

                {/* {process && (
                    <p className="text-red-700 text-xs md:text-base font-semibold">
                        {process.numerator} / {process.denominator}
                    </p>
                )} */}
            </div>
        </MovieItemWrapper>
    )
}
