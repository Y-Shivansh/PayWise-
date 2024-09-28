export const Balance = ({value}) => {
    return <div className="flex items-center my-4">
        <div className="font-bold text-sm">
            Your balance: 
        </div>
        <div className=" font-semibold ml-2 text-sm">
            Rs {value}
        </div>
    </div>
}