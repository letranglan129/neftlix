import Link from 'next/link'
import { MovieItem } from '../../Movie'
import Loading from '../../Loading'

export default function Results({
    loading,
    list,
    topic,
    title,
    conditionShow,
}) {
    return (
        <div className="grid grid-cols-12 lg:grid-cols-10 gap-4">
            <div className="col-span-12 lg:col-span-10">
                <h2 className="text text-2xl">
                    {topic && title && (
                        <>
                            <b className="font-semibold">{topic}:</b>{' '}
                            <span>{title}</span>
                        </>
                    )}
                    {topic && !title && (
                        <b className="font-semibold">{topic}</b>
                    )}
                </h2>
            </div>

            {loading && (
                <div className="col-span-12 flex justify-center py-12">
                    <Loading />
                </div>
            )}

            {!loading && list.length === 0 && (
                <div className="col-span-12">
                    <div className="mx-auto max-w-xs">
                        <img src="/images/no-results.svg" alt="" />
                    </div>
                    <h2 className="text text-center text-xl font-semibold">
                        We couldn't find any results
                    </h2>
                    <p className="text text-center">
                        Make sure all words are spelled correctly or try another
                        keyword.
                    </p>
                </div>
            )}

            {!loading &&
                list.length > 0 &&
                list?.map(
                    (item, index) =>
                        conditionShow && (
                            <div
                                className="col-span-6 sm:col-span-4 960:!col-span-3 lg:!col-span-2"
                                key={index}
                            >
                                <Link href={`/movies/${item?.id}`}>
                                    <a>
                                        <MovieItem
                                            title={
                                                item?.title ||
                                                item?.name ||
                                                item?.original_name
                                            }
                                            imdb={item?.vote_average || 0}
                                            releaseDate={
                                                item?.release_date?.split(
                                                    '-'
                                                )[0]
                                            }
                                            src={`${process.env.NEXT_PUBLIC_IMAGES_W200_URL}${item?.poster_path}`}
                                        />
                                    </a>
                                </Link>
                            </div>
                        )
                )}
        </div>
    )
}
