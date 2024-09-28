import { useState } from "react"
import { SubHeading } from "../components/SubHeading"
import { Button } from "../components/Button"
import { useSearchParams } from "react-router-dom"
import axios from 'axios'

export const SendMoney = () => {

    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const [amount, setAmount] = useState(0);
    return <div className=" flex flex-col justify-center items-center bg-slate-200 h-screen">
        {/* Actual Element */}
        <div className=" border-2 w-96 shadow-lg rounded-lg bg-white flex flex-col justify-between h-80 py-7 px-7">
            <div className="">
                <h2 className="font-bold text-3xl text-center">Send Money</h2>
            </div>
            <div className="flex flex-col">
                <div className="flex items-center mb-1">
                    <div className="flex mr-2  bg-[#002970] rounded-full items-center justify-center w-10 h-10 ">
                        <span className="font-semibold text-2xl text-white">{name[0].toUpperCase()}</span>
                    </div>
                    <h3 className="font-semibold text-xl">{name}</h3>  {/* Hard Coded for now only */}
                </div>
                <div className="flex flex-col my-1">
                    <label htmlFor="amount"
                        className="font-semibold text-sm">
                        Amount (in Rs)
                    </label>
                    <input type="text"
                        onChange={(e) => {
                            setAmount(e.target.value)
                        }}
                        name="amount" id="amount"
                        className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm mb-3 mt-1 outline-none"
                        placeholder="Enter Amount"
                    />
                </div>
                <Button onClick={() => {
                    axios.post("http://localhost:3000/api/vi/account/transfer", {
                        to: id,
                        amount
                    }, {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("token")
                        }
                    })
                }} label={"Initiate Transfer"} />

                {/* <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 w-full justify-normal rounded-md text-sm font-medium">Initiate Transfer</button> */}
            </div>
        </div>
    </div>
}