import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Connection() {
    const databaseURL = process.env.REACT_APP_DATABASE_URL

    const [code, setcode] = useState("")
    const [users, setUsers] = useState([])

    const navigate = useNavigate()

    const fetchUsers = async() => {
        const result = await axios(`${databaseURL}users`)
        setUsers(await result.data)
    }

    const connect = () => users.forEach((user) => user.number === code ? navigate("/table", {state: {user: user}}) : setcode(""))

    const remove = () => setcode(code.slice(0, code.length - 1));

    useEffect(() => {
        fetchUsers()
    },[])


    return (
        <div className="d-flex flex-column justify-content-center align-items-center text-light mt-5 bg-dark bg-gradient connection-container">
            <div className="mb-3">
                <h2>Enter employe number</h2>
            </div>
            <div className='flex-row mb-3'>
                <input type="password" value={code} className="connection-input border border-success" readOnly></input>
            </div>
            <div className="d-flex flex-row">
                <i className="bi bi-1-circle icons-connection  m-2" onClick={() => setcode(code + 1)}></i>
                <i className="bi bi-2-circle icons-connection  m-2" onClick={() => setcode(code + 2)}></i>
                <i className="bi bi-3-circle icons-connection  m-2" onClick={() => setcode(code + 3)}></i>
            </div>
            <div className="d-flex flex-row">
                <i className="bi bi-4-circle icons-connection  m-2" onClick={() => setcode(code + 4)}></i>
                <i className="bi bi-5-circle icons-connection  m-2" onClick={() => setcode(code + 5)}></i>
                <i className="bi bi-6-circle icons-connection  m-2" onClick={() => setcode(code + 6)}></i>
            </div>
            <div className="d-flex flex-row">
                <i className="bi bi-7-circle icons-connection  m-2" onClick={() => setcode(code + 7)}></i>
                <i className="bi bi-8-circle icons-connection  m-2" onClick={() => setcode(code + 8)}></i>
                <i className="bi bi-9-circle icons-connection  m-2" onClick={() => setcode(code + 9)}></i>
            </div>
            <div className="d-flex flex-row">
                <i className="bi bi-arrow-left-circle icons-connection  m-2" onClick={() => remove()}></i>
                <i className="bi bi-0-circle icons-connection  m-2" onClick={() => setcode(code + 0)}></i>
                <i className="bi bi-arrow-right-circle icons-connection  m-2" onClick={() => connect()}></i>
            </div>
        </div>
    )
}

export default Connection