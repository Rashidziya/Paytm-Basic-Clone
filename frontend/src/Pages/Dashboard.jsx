import { Appbar } from "../Components/Appbar"
import { Balance } from "../Components/Balance"
import { Users } from "../Components/Users"
export function Dashboard(){
    return <div className="flex justify-center">
        <div className="mt-4 w-4/6">
            <Appbar/>
            <Balance amount={"10,000"}/>
            <Users />
        </div>
       
    </div>
}