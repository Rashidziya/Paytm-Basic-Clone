import { useEffect, useState } from "react"
import axios from 'axios';
import { useNavigate} from "react-router-dom";
import { Button } from "./Button";

function useDebounce(filter,delay){
    const [debouncedValue,setDebouncedValue]=useState(filter);
    useEffect(()=>{
        let value= setTimeout(() => {
            setDebouncedValue(filter);
        }, delay);
        return ()=>{
            clearTimeout(value);
        }
    },[filter]);

    return debouncedValue;
}

export const Users=()=>{
    const [users,setUsers]=useState([]);
    const [Filter,setFilter]=useState();
    // add debouncing technique to reduce the api calls for the searching the user every typed characters
    const debouncedValue=useDebounce(Filter,500);
    useEffect(()=>{
        axios.get("http://localhost:3000/api/v1/user/bulk?filter="+debouncedValue)
        .then((res)=>{
            setUsers(res.data.user);
        })
    },[debouncedValue]);
    
    // useEffect(()=>{
    //     axios.get("http://localhost:3000/api/v1/user/bulk?filter="+Filter)
    //     .then(function (res){
    //         setUsers(res.data.user);
    //     })
    // },[Filter]);
    // use authMidleware 
    // and also do not show yourself on the list of the users
    return <>
        <div className="font-bold mt-6 text-md ml-8">
            Users
        </div>
        <div className="my-2 ">
            <input onChange={(e)=>{
                setFilter(e.target.value);
            }}type="text" placeholder="Search users....." className="w-full py-2 px-2 border rounded border-slate-200"></input>
        </div>

        <div>
            {users.map(user=> <User user={user}/>)}
        </div>
    </>
}

function User({user}){
    const navigate=useNavigate();
    return <div className="flex justify-between">
        <div className="flex ">
            <div className="rounded-full w-12 h-12 bg-slate-200 mr-1 mt-2 flex justify-center">
                <div className="flex flex-col justify-center h-full">
                    {user.firstName[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center ">
                <div className="flex flex-col justify-center h-full">
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </div>
        <div className="flex flex-col justify-center">
            <Button onPress={(e)=>{
                navigate('/sendMoney?id='+user._id+"&name="+user.firstName);
            }} label={"Send Money"}/>
        </div>
    </div>
}