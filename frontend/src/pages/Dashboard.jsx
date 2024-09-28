import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"

export const Dashboard = () => {
    const loggedInUser ={
        mail: JSON.parse(localStorage.getItem('user')),
        firstName: JSON.parse(localStorage.getItem('firstName'))
    } 
    return <div className=" px-20 m-auto mt-6">
        <Appbar firstName={loggedInUser.firstName} />
        <div className="mx-5 ">
            <Balance value={10000} />
            <Users email={loggedInUser.mail}/>
        </div>
    </div>
}