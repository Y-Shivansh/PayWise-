import { useNavigate } from "react-router-dom"
import { Button } from "../components/Button"
import PaywiseBG from '../assets/PaywiseBG.jpg';
import PayWise from '../assets/PayWise.png'


export const LandingPage = () => {
    // const navigate = useNavigate()
    const navigate = useNavigate();
    return <div className="flex items-center justify-center h-screen bg-contain"
        style={{ backgroundImage: `url(${PaywiseBG})` }}>
        <div className="flex flex-col justify-between h-52 px-4 py-2 bg-white rounded-xl shadow-xl ">
            <div className="flex items-center ">
                <img className="w-9 self-center" src={PayWise} alt="logo" />
                <div className="text-2xl font-bold text-[#00baf2] flex items-center">
                    Pay<span className="text-[#002970]">Wise</span>
                </div>
            </div>
            <div className="flex flex-col space-y-4 px-16 my-10">
                <div className="w-48 shadow-md">
                    <Button label={"Sign Up"} onClick={() => navigate("/signup")} />
                </div>
                <div className="w-48 shadow-md">
                    <Button label={"Sign In"} onClick={() => navigate("/signin")} />
                </div>
            </div>
        </div>
    </div>
}