export default function Avatar({ caster, ...props }) {
    return (
        <>
            <div className="flex items-center mb-3">
                <div className="w-[40px] h-[40px]">
                    <img
                        src={props.src}
                        className="min-w-[40px] min-h-[40px] w-[40px] h-[40px] rounded-full object-cover"
                        onError={(e) => {
                            e.target.src = '/images/avatar-default.png'
                        }}
                    />
                </div>
                <div className="ml-2 overflow-hidden">
                    <p className="text  !text-indigo-700 dark:!text-indigo-400 line-clamp-1 font-semibold">
                        {caster.name}
                    </p>
                    <p className="text text-xs line-clamp-1">
                        {caster.character}
                    </p>
                </div>
            </div>
        </>
    )
}
