import { Heading } from "../Components/Heading"
import { SubHeading } from "../Components/SubHeading"
import { InputBox } from "../Components/InputBox"
import { Button } from "../Components/Button"
import { BottomWarning } from "../Components/BottomWarning"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
export function Signup(){
    const navigate=useNavigate();
    const [firstName,setFirstName]=useState("");
    const [lastName,setLastName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    return <div className="bg-slate-400 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Signup"}></Heading>
                <SubHeading label={"Enter your Information to Create your Account"}></SubHeading>
                <InputBox onChange={(e)=>{
                    setFirstName(e.target.value);
                }}label={"First Name"} placeHolder={"jhon"}></InputBox>
                <InputBox onChange={(e)=>{
                    setLastName(e.target.value);
                }}label={"Last Name"} placeHolder={"Doe"}></InputBox>
                <InputBox onChange={(e)=>{
                    setEmail(e.target.value);
                }}label={"E-mail"} placeHolder={"rashid@gmail.com"}></InputBox>
                <InputBox onChange={(e)=>{
                    setPassword(e.target.value);
                }}label={"Password"} placeHolder={"123456"}></InputBox>
                <div className="pt-4">
                    <Button onPress={async()=>{
                        const response=await axios.post("http://localhost:3000/api/v1/user/signup",{
                            firstName,
                            lastName,
                            email,
                            password
                        })
                        localStorage.setItem("token",response.data.token);
                        navigate("/Dashboard");
                    }}label={"Sign Up"}></Button>
                </div>
                <BottomWarning label={"Already have an account?"} buttonText={"Sign In"} to={"/signin"}/>
            </div>
        </div>
    </div>
}