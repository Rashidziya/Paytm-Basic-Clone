import { useState } from "react"
import {useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios';

export function Send(){
    const navigate=useNavigate();
    const [amount,setAmount]=useState(0);
    const [searchParams,setSearchParams]=useSearchParams();
    const id=searchParams.get('id');
    const name=searchParams.get('name');
    return <div className="bg-slate-600 flex justify-center h-screen">
        <div className="flex flex-col justify-center h-full">
            <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
                <div className="flex flex-col space-y-1.5 p-4">
                    <h2 className="font-bold text-3xl text-center">Send Money</h2>
                </div>
                <div className="p-6">
                    <div className="flex items-center space-x-4">
                        <div className="flex flex-col items-center justify-center rounded-full bg-green-500 h-12 w-12">
                            <span className="text-2xl text-white">{name[0].toUpperCase()}</span>
                        </div>
                        <h2 className="font-semibold text-2xl">{name}</h2>
                    </div>
                    <div className="space-y-4">
                        <div className="space-y-2 flex flex-col">
                            <labe>
                                Amount in $
                            </labe>
                            <input onChange={(e)=>{
                                setAmount(e.target.value);
                            }} type="text" placeholder="Enter Amount" 
                            className="h-10 w-full rounded-md"/>
                        </div>
                        <button onClick={()=>{
                            axios.post("http://localhost:3000/api/v1/account/Transfer",{
                                to:id,
                                amount,
                            },{
                                headers:{
                                    Authorization:"Bearer "+ localStorage.getItem("token")
                                }
                            })
                            navigate('/Dashboard');
                        }} className="w-full bg-green-500 h-10 rounded-md text-white font-semibold px-6 py-2">Send Money</button>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
}