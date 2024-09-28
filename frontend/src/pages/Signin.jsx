import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export const Signin = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    return <div className="h-screen bg-[#e0f5fd] flex flex-col justify-center items-center">
        <div className="w-96 text-center p-8 bg-gray-100 rounded-xl shadow-lg">
            <Heading label={"Sign in"} />
            <SubHeading label={"Enter your login credentials"} />
            <InputBox
                label={"Email"}
                placeholder={"curk@gmail.com"}
                type={"email"}
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value)
                }}
            />
            <InputBox
                label={"Password"}
                placeholder={"12345"}
                type={"password"}
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value)
                }}
            />
            <div className=" pt-4">
                <Button
                    label={"Sign In"}
                    onClick={async () => {
                        if(!email || !password){
                            console.log("All fields are required.");
                            return;
                        }
                        try {
                            const response = await axios.post("http://localhost:3000/api/vi/user/signin", {
                                email,
                                password
                            })
                            if(response.data.message === 'Logged In successfully'){
                                localStorage.setItem('user', JSON.stringify(response.data.user));
                                localStorage.setItem('firstName', JSON.stringify(response.data.firstName));
                                navigate("/dashboard")
                            } else {
                                console.log("Signin failed: ", response.data.message);
                            }
                        }
                        catch (err) {
                            console.log("Error Logging in: ", err.data);

                        }
                    }} />
            </div>
            <BottomWarning label={"Do not have an Account?"} buttonText={"Sign Up"} to={"/signup"} />
        </div>
    </div>
}