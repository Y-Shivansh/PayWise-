import { useEffect, useState } from "react"
import { Button } from "./Button"
import { Navigate, useNavigate } from "react-router-dom";
import axios from 'axios'
export const Users = ({email}) => {
    // for now, will be fetched from DB later
    const [users, setUsers] = useState([])
    const [filter, SetFilter] = useState("");
    useEffect( () => {
        const fetchUsers = async() => {
            try {
                const response = await axios.get("http://localhost:3000/api/vi/user/bulk?filter=" + filter);
                const filteredUsers = response.data.user.filter(user => user.email !== email)
                setUsers(filteredUsers)
            }
            catch (err){
                console.log("Error Loading Users");
                
            }
        }
        fetchUsers();
    }, [filter])
    return <div className="bg-[#e0f5fd] shadow-md p-5 rounded-2xl">
        <div className="font-bold text-sm">
            Users
        </div>
        <div className="my-2">
            <input type="text"
                onChange={(e) => {
                    SetFilter(e.target.value)
                }}
                className=" text-sm font-medium w-full px-2 py-1 border rounded-lg outline-none border-slate-200" placeholder="Search users..." />
        </div>
        <div className="">
            {users.map(user => <User key={user._id} user={user} />)}
        </div>
    </div>
}
function User({ user }) {
    const navigate = useNavigate();
    return <div className="mt-5 items-center flex justify-between">
        <div className="flex items-center ">
            <div className="flex">
                <div className="bg-[#002970] h-9 w-9 font-semibold text-white flex justify-center items-center rounded-full">
                    {user.firstName[0]}
                </div>
            </div>
            <div className="ml-3 font-medium text-sm">
                {user.firstName} {user.lastname}
            </div>
        </div>
        <div className="">
            <Button onClick={(e) => {
                navigate("/send?id=" + user._id+ "&name="+ user.firstName)
            }} label={"Send Money"} />
        </div>
    </div>
}