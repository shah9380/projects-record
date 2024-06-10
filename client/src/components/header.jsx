import axios from "axios"
import React from "react"
import { useNavigate } from "react-router-dom"

const Header = (props)=>{
    const navigate = useNavigate()
    const logout = async ()=>{
            await axios.get('https://familyman.onrender.com/api/logout')
            navigate('/login')
    }
    const checkUsers = async ()=>{
        try {
           const response = await axios.get('https://familyman.onrender.com/api/users')
           console.log(response.data);
           props.getUsers(response.data);
        } catch (error) {
            console.log(error)
        }
    }
    
    return(
        <header>
            <button type="buttone" onClick={logout}>Log Out</button>
            <button type="button" onClick={checkUsers}>Users</button>
        </header>
    )
}
export default Header