import NextNProgress from 'nextjs-progressbar'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { store } from '../app/store'
import { DefaultLayout } from '../comps/Layouts'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <DefaultLayout>
                <NextNProgress
                    color="#29D"
                    startPosition={0.3}
                    stopDelayMs={0}
                    height={3}
                    showOnShallow={true}
                />

                <Component {...pageProps} />
            </DefaultLayout>
                <ToastContainer/>
        </Provider>
    )
}

export default MyApp
