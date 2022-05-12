import { useForm } from 'react-hook-form'
import { EMAIL_REG } from '../../../constant'
import {
    loginWithEmailAndPassword,
    registerWithEmailAndPassword
} from '../../../firebase/auth'
import { Button } from '../../Button'
import Checkbox from '../../Checkbox'
import Input from '../Input'
import LoginSocial from '../LoginSocial'

export default function Form({ state }) {
    const [page, setPage] = state

    const changePage = () => {
        setPage(page === 'login' ? 'register' : 'login')
    }

    return (
        <>
            {page === 'login' && (
                <>
                    <Form.Title
                        mainTitle="Login"
                        subTitle="Sign in to continue to Neftlix."
                    />
                    <Form.Login changePage={changePage} />
                </>
            )}
            {page === 'register' && (
                <>
                    <Form.Title
                        mainTitle="Sign up"
                        subTitle="Get your Neftlix account now."
                    />
                    <Form.Register changePage={changePage} />
                </>
            )}
            <div>
                <p className="text-center line-through-center ">
                    {page === 'login' && (
                        <span className="content">Or Login with</span>
                    )}
                    {page === 'register' && (
                        <span className="content">Or Sign up with</span>
                    )}
                </p>
                <LoginSocial />
            </div>
        </>
    )
}

Form.Title = ({ mainTitle, subTitle }) => {
    return (
        <div className="mb-6">
            <h2 className="text text-center text-2xl">{mainTitle}</h2>
            <h2 className="text text-center text-sm text-gray-light">{subTitle}</h2>
        </div>
    )
}

Form.Login = ({ changePage }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        loginWithEmailAndPassword(data)
    }
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <Input
                        labelTitle="Email"
                        name="email"
                        id="email"
                        type="text"
                        placeholder="a"
                        register={register}
                        validate={{
                            required: true,
                            pattern: EMAIL_REG,
                            patternMessage: 'Email is not valid',
                        }}
                        errors={errors}
                    />
                </div>
                <div className="">
                    <Input
                        labelTitle="Password"
                        name="password"
                        id="password"
                        type="password"
                        placeholder="a"
                        minLength={6}
                        register={register}
                        validate={{ required: true, minLength: 6 }}
                        errors={errors}
                    />
                </div>
                <p className="text text-right text-sm underline">
                    Forgot password???
                </p>

                <Checkbox className="mb-4">Remember me</Checkbox>
                <div className="mb-6">
                    <Button primary={1} classCustom="w-full" type="submit">
                        Login
                    </Button>
                    <div className="text text-center text-sm mt-4">
                        <span>Don't have an account?</span>
                        <Button type="button" text={1} onClick={changePage}>
                            <span>Signup now</span>
                        </Button>
                    </div>
                </div>
            </form>
        </>
    )
}

Form.Register = ({ changePage }) => {
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        registerWithEmailAndPassword(data)
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <Input
                        labelTitle="Name"
                        name="name"
                        id="name"
                        type="text"
                        placeholder="a"
                        register={register}
                        validate={{ required: true }}
                        errors={errors}
                    />
                </div>
                <div className="mb-4">
                    <Input
                        labelTitle="Email"
                        name="email"
                        id="email"
                        type="email"
                        placeholder="a"
                        register={register}
                        validate={{
                            required: true,
                            pattern: EMAIL_REG,
                            patternMessage: 'Email is not valid',
                        }}
                        errors={errors}
                    />
                </div>
                <div className="mb-4">
                    <Input
                        labelTitle="Password"
                        name="password"
                        id="password"
                        type="password"
                        placeholder="a"
                        register={register}
                        validate={{ required: true, minLength: 6 }}
                        errors={errors}
                    />
                </div>
                <div className="mb-4">
                    <Input
                        labelTitle="Repassword"
                        name="repassword"
                        id="repassword"
                        type="password"
                        placeholder="a"
                        register={register}
                        validate={{
                            required: true,
                            minLength: 6,
                            validate: {
                                comparePassword: (value) => {
                                    const { password } = getValues()
                                    return (
                                        password === value ||
                                        'Password does not match'
                                    )
                                },
                            },
                        }}
                        errors={errors}
                    />
                </div>

                <div className="mb-6">
                    <Button primary={1} classCustom="w-full" type="submit">
                        Sign up
                    </Button>
                    <div className="text text-center text-sm mt-4">
                        <span>Already have an account ?</span>
                        <Button type="button" text={1} onClick={changePage}>
                            <span>Login now</span>
                        </Button>
                    </div>
                </div>
            </form>
        </>
    )
}
