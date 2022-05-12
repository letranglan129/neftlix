import Link from 'next/link'
import { useRouter } from 'next/router'

export default function ErrorPage() {
    const router = useRouter()

    return (
        <div className="grid grid-cols-12">
            <div className="col-span-8">
                <h2 className="text-5xl font-extrabold text-[#5865f2] mb-6">
                    WRONG TURN?
                </h2>
                <p className="text-lg font-light mb-5">
                    You look lost, stranger. You know what helps when you&#39;re
                    lost? A piping hot bowl of noodles. Take a seat, we&#39;re
                    frantically at work here cooking up something good. Oh, you
                    need something to read? These might help you:
                </p>
                <div className='mb-2'>
                    <Link href="/">
                        <a className="text-lg text-blue-500">Go to Home page</a>
                    </Link>
                </div>
                <div className='mb-2 cursor-pointer'>
                    <a
                        className="text-lg text-blue-500"
                        onClick={() => router.back()}
                    >
                        Go back
                    </a>
                </div>
            </div>
            <div className="col-span-4">
                {/* <Image src={'/images/error.gif'} height={400} width={400}/> */}
                <img src="/images/error.gif" alt="" />
            </div>
        </div>
    )
}
