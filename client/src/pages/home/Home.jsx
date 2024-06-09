import React, { useState } from "react"
import Header from "../../components/header"

const Home = ()=>{
    const[user, setUser] = useState([]);
    const getUsers = (users)=>{
        setUser(prev => [...prev, ...users])
        console.log("userjksvmf", users)
    }
    return(
        <div>
            <Header getUsers={getUsers}></Header>
            {
                user.map((item, index)=>{
                    return(
                        <ul>
                            <li>
                                <h3>User-: {index}</h3>
                                <p>First Name {item.firstName}</p>
                                <p>Last Name {item.lastName}</p>
                            </li>
                        </ul>
                    )
                })
            }
        </div>
    )
}

export default Home