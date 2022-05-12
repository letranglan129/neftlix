export default function ButtonLogin({onClick}) {
    return (
        <a
            className="flex items-center cursor-pointer"
            onClick={onClick}
        >
            <img
                src="/images/avatar-default.png"
                alt=""
                className="w-[50px] h-[50px] rounded-2xl"
            />
            <div className="ml-2">
                <p className="text name font-bold line-clamp-1">
                    Login / Register
                </p>
            </div>
        </a>
    )
}
