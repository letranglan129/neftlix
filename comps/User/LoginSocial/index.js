import { Button } from '../../Button'
import { loginWithPopup } from '../../../firebase/auth'

export default function LoginSocial() {
    return (
        <div className="grid grid-cols-3 gap-2">
            <Button
                classCustom="w-full col-span-3 md:col-span-1 !ml-0 !bg-[#dc4e42]"
                primary={1}
                leftIcon={<i className="fab fa-google"></i>}
                onClick={() => loginWithPopup('Google')}
            >
                Google
            </Button>
            <Button
                classCustom="w-full col-span-3 md:col-span-1 !ml-0 !bg-[#3b5999]"
                primary={1}
                leftIcon={<i className="fab fa-facebook"></i>}
                onClick={() =>loginWithPopup('Facebook')}
            >
                Facebook
            </Button>
            <Button
                classCustom="w-full col-span-3 md:col-span-1 !ml-0 !bg-[#1b1e23]"
                primary={1}
                leftIcon={<i className="fab fa-github"></i>}
                onClick={() => loginWithPopup('Github')}
            >
                Github
            </Button>
        </div>
    )
}
