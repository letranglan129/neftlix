export default function Avatar({user}) {
    return (
        <div className="flex items-center">
            <img
                src={user?.photoURL || "/images/avatar-default.png"}
                alt=""
                className="w-[50px] h-[50px] rounded-2xl"
            />
            <div className="ml-2">
                <p className="text name text-lg font-bold line-clamp-1">
                    {user?.displayName || "User"}
                </p>
                {user?.email && <p className="text email text-sm line-clamp-1">
                    {user?.email}
                </p>}
            </div>
        </div>
    )
}
