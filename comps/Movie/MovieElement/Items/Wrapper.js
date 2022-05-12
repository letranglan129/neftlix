
export default function MovieItemWrapper({ src, className, children }) {
    return (
        <div className={`flex items-center bg-white cursor-pointer dark:bg-transparent border-2 border-transparent dark:border-[#42434e] p-1 md:p-[10px] rounded-[20px] w-[180px] md:w-[280px] ${className}`}>
            <img
                src={src || "https://picsum.photos/200"} 
                alt=""
                className="w-[60px] h-[80px] md:w-[80px] md:h-[100px] rounded-xl mr-2 md:mr-6"
            />
            {children}
        </div>
    )
}
