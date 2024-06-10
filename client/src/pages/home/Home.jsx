import React, { useState } from "react"
import Header from "../../components/header"
import axios from "axios";

const Home = ()=>{
    const[user, setUser] = useState([]);
    const[tradingData, setTradingData] = useState([]);
    const [selectedFile, setFiles] = useState(File);
    const getUsers = (users)=>{
        setUser(prev => [...users])
        console.log("userjksvmf", users)
    }
    const handleFileChange = (event) => {
        setFiles(event.target.file)
        // setFiles(prevFiles => [...prevFiles, ...selectedFiles]);
    };
    const getTradeData = async ()=>{
        try {
           const response = await axios.get('https://familyman.onrender.com/api/trading/info')
           const data = response.data
           setTradingData(prev => [...data])
        } catch (error) {
            console.log(error)
        }
    }
    const handleSubmit = async (event) =>{
        event.preventDefault();
        // files.forEach(async (fileUpload, index) => {
            const formData = new FormData();
            formData.append('file', selectedFile);
      
            try {
              await axios.post('https://familyman.onrender.com/api/uploadExcel/tradingData', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
              });
            } catch (error) {
              console.log(error)
            }
        // });  

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
            <form onSubmit={handleSubmit}>
                <h1>Upload Excel File</h1>
                <input type="file" onChange={handleFileChange} accept=".xlsx,.xls" ref={input => input && input.click()} />
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