import React, { useState } from "react"
import Header from "../../components/header"
import axios from "axios";

const Home = ()=>{
    const[user, setUser] = useState([]);
    const[tradingData, setTradingData] = useState([]);
    const getUsers = (users)=>{
        setUser(prev => [...prev, ...users])
        console.log("userjksvmf", users)
    }
    const getTradeData = async ()=>{
        try {
           const response = await axios.get('https://familyman.onrender.com/api/users')
           const data = response.data
           setTradingData(prev => [...prev, ...data] )
        } catch (error) {
            console.log(error)
        }
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
            <h1>Upload Excel File</h1>
            <form action="https://familyman.onrender.com/api/uploadExcel/tradingData" method="post" enctype="multipart/form-data">
                <input type="file" name="excelFile" accept=".xlsx,.xls" />
                <button type="submit">Upload</button>
            </form>
            <button onClick={getTradeData}>Trade Data</button>
            {
                tradingData?.map((item, index)=>{
                    return(
                        <ul>
                            <li>
                                <h3>Sl.No-: {index}</h3>
                                <p>pairName {item.pairName}</p>
                                <p>news {item.news}</p>
                            </li>
                        </ul>
                    )
                })
            }
        </div>
    )
}

export default Home