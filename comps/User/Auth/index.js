import { useState } from 'react'
import Form from '../Form'

export default function Auth() {
    const [page, setPage] = useState('login')
    return (
        <div className="w-[350px] md:w-[500px] max-h-screen max-w-max m-auto rounded-2xl bg-white dark:bg-dark p-5 md:p-10 overflow-scroll hidden-scroll">
            <Form state={[page, setPage]}/>
        </div>
    )
}
