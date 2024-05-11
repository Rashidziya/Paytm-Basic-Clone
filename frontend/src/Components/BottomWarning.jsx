import { Link } from "react-router-dom"
export function BottomWarning({label,buttonText,to}){
    return <div className="flex justify-center w-full py-2 text-sm ">
        <div>
            {label}
        </div>
        <Link className="pointer-underline pl-3 cursor-pointer " to={to}>
            {buttonText}
        </Link>
    </div>
}