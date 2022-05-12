import { onAuthStateChanged } from 'firebase/auth'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import 'swiper/css'
import { getGenres } from '../../../app/features/genreSlice'
import { getMovies } from '../../../app/features/movieSlice'
import { loadTheme } from '../../../app/features/themeSlice'
import { updateProfile, updateUserState } from '../../../app/features/userSlice'
import { auth, db } from '../../../firebase/config'
import Footer from '../comps/Footer'
import Navbar from '../comps/Navbar'
import UserMovie from '../comps/UserMovie'


export default function DefaultLayout({ children }) {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadTheme())
    }, [])
    

    useEffect(() => {
        const getName = async (uid) => {
            const citiesRef = collection(db, 'users')
            const q = query(citiesRef, where('uid', '==', uid))
            const querySnapshot = await getDocs(q)
            
            dispatch(updateProfile({ displayName: querySnapshot.docs[0]?.data()?.displayName }))
        }

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            dispatch(
                updateUserState({
                    uid: user?.uid,
                    email: user?.email,
                    displayName: user?.displayName,
                    photoURL: user?.photoURL,
                    emailVerified: user?.emailVerified,
                    providerId: user?.providerId,
                })
            )

            if (user && !user.displayName) {
                await getName(user?.uid)
            }
        })
        return unsubscribe
    }, [])

    useEffect(() => {
        dispatch(getMovies())
        dispatch(getGenres())
    }, [])

    return (
        <>
            <div className="grid grid-cols-12 min-h-screen">
                <div className="main-content col-span-12 relative 960:col-span-12">
                    <div className="main-content-wrapper">
                        <SimpleBar
                            style={{
                                maxHeight: '100vh',
                            }}
                        >
                            <Navbar />
                            <div className="container">{children}</div>
                            <Footer />
                        </SimpleBar>
                    </div>
                </div>
                <UserMovie />
            </div>
        </>
    )
}
