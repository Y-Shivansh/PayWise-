export const Appbar = ({firstName}) => {
    return <div className="bg-[#e0f5fd] flex justify-between h-14 rounded-2xl items-center shadow-md px-4 ">
        <div className="text-lg font-bold text-[#002970]">
            Pay<span className="text-[#00baf2]">tm</span>
        </div>
        <div className="flex items-center">
            <div className="text-[#002970] font-semibold">
                <span className="text-[#00baf2] font-bold"> Hello👋</span> {firstName}
            </div>
            <div className="ml-2 bg-[#002970] h-9 w-9 flex justify-center items-center rounded-full">
                <div className=" font-semibold text-white text-xl">{firstName[0]}</div>
            </div>
        </div>
    </div>
}