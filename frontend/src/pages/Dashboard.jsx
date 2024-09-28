import axios from "axios"
import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import { useEffect, useState } from "react"

export const Dashboard = () => {
    const[balance, setBalance]= useState(0)
    const [loading, setLoading] = useState(true);
    const loggedInUser ={
        mail: JSON.parse(localStorage.getItem('user')),
        firstName: JSON.parse(localStorage.getItem('firstName')),
    } 
    useEffect(()=>{
        const fetchBalance = async()=>{
            try{
                const response = await axios.get("http://localhost:3000/api/vi/account/balance",{
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem('token')
                    }
                })
                setBalance(response.data.balance.toFixed(2));
            }
            catch (error) {
                console.error("Error fetching balance:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchBalance();
    },[balance])
       return <div className=" px-24 m-auto mt-4">
        <Appbar firstName={loggedInUser.firstName} />
        <div className="mx-5 ">
            {loading ? (<div>Loading...</div>): (<Balance value={balance}/>)}
            <Users email={loggedInUser.mail}/>
        </div>
    </div>
}