import { Navigate, Outlet } from "react-router-dom"

export default function ProtectedRoute({ rolerequired }){
    const token = localStorage.getItem("token")
    const user = JSON.parse(localStorage.getItem("user"))

    if(!token){
        return <Navigate to="/login"/>
    }

    if(rolerequired && user.role !== rolerequired){
        return <Navigate to="/"/>
    }

    return <Outlet/>
}