import { Button } from "../Components/Button";
import { BottomWarning } from "../Components/BottomWarning";
import { Heading } from "../Components/Heading";
import { InputBox } from "../Components/InputBox";
import { SubHeading } from "../Components/SubHeading";
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export function Signin(){
    const navigate=useNavigate();
    const [email,setEmail]=useState('');
    const [Password,setPassword]=useState('');
 
    return <div className="bg-slate-400 flex justify-center h-screen items-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
            <Heading label={"Sign In"}/>
            <SubHeading label={"Use your Email and Password to Signin"}/>
            <InputBox onChange={(e)=>{
                setEmail(e.target.value);
            }}label={"E-mail"} placeHolder={"rashid@gmail.com"}/>
            <InputBox onChange={(e)=>{
                setPassword(e.target.value);
            }} label={"Password"} placeHolder={"@1234"}/>
            <div className="pt-3">
                <Button onPress={async ()=>{
                    const response=await axios.post("http://localhost:3000/api/v1/user/signin",{
                        email:email,
                        password:Password
                    })
                    localStorage.setItem("token",response.data.token);
                    navigate("/Dashboard");
                }}label={"Sign In"}/>
            </div>
            <BottomWarning label={"Don't have an Account ?"} buttonText={"Sgin up"} to={"/signup"}/>
        </div>
    </div>
}