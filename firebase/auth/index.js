import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
    FacebookAuthProvider,
    GithubAuthProvider,
} from 'firebase/auth'
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'
import { toast } from 'react-toastify'
import { auth, db } from '../config'

const configToast = {
    position: 'bottom-left',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
}

const handleError = (code, email = 'Email') => {
    switch (code) {
        case 'auth/email-already-in-use':
            return toast.error(
                <div>
                    <b>Email</b> already in use
                </div>,
                configToast
            )
        case 'auth/invalid-email':
            return toast.error(
                <div>
                    <b>Email</b> is invalid
                </div>,
                configToast
            )
        case 'auth/weak-password':
            return toast.error(
                <div>
                    <b>Password</b> is weak
                </div>,
                configToast
            )

        case 'auth/user-not-found':
            return toast.error(
                <div>
                    <b>Email</b> not found
                </div>,
                configToast
            )
        case 'auth/wrong-password':
            return toast.error(
                <div>
                    <b>Password</b> is wrong
                </div>,
                configToast
            )
        case 'auth/invalid-email':
            return toast.error(
                <div>
                    <b>Email</b> is invalid
                </div>,
                configToast
            )
        case 'auth/account-exists-with-different-credential':
            return toast.error(
                <div>
                    <b>{email}</b> is already registered with another provider
                </div>,
                configToast
            )
        case 'auth/user-disabled':
            return toast.error(
                <div>
                    <b>{email}</b> is disabled
                </div>,
                configToast
            )
        default:
            toast.error(
                <div>
                    <b>Error!</b>
                </div>,
                configToast
            )
    }
}

const loginWithPopup = async (providerName) => {
    if(!providerName) return 

    let provider

    switch (providerName) {
        case 'Facebook':
            provider = new FacebookAuthProvider()
            break
        case 'Github':
            provider = new GithubAuthProvider()
            break
        case 'Google':
            provider = new GoogleAuthProvider()
            break
        default:
            return
    }

    try {
        const res = await signInWithPopup(auth, provider)
        const user = res.user
        console.log(user)

        const q = query(collection(db, 'users'), where('uid', '==', user.uid))
        const doc = await getDocs(q)
        if (doc.docs.length === 0) {
            await addDoc(collection(db, 'users'), {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                authProvider: providerName,
            })
        }

        toast.success(
            <div>
                Login success with <b>{user?.email || providerName}</b>
            </div>,
            configToast
        )
    } catch (error) {
        handleError(error.code)
    }
}

const registerWithEmailAndPassword = async ({ name, email, password }) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password)

        const user = res.user
        await addDoc(collection(db, 'users'), {
            uid: user.uid,
            email: user.email,
            displayName: name,
            authProvider: 'local',
        })

        toast.success(<div>Register success with {email}</div>, configToast)
    } catch (error) {
        handleError(error.code, email)
    }
}

const loginWithEmailAndPassword = async ({ email, password }) => {
    try {
        const res = await signInWithEmailAndPassword(auth, email, password)

        toast.success(
            <div>
                Login success with <b>{email}</b>
            </div>,
            configToast
        )
    } catch (error) {
        handleError(error.code, email)
    }
}

const logout = () => {
    auth.signOut()
}

export {
    loginWithPopup,
    registerWithEmailAndPassword,
    loginWithEmailAndPassword,
    logout,
}
