import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import InputContainer from '../components/InputContainer'
import NumberPad from '../components/NumberPad'

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
        <div className="d-flex flex-column justify-content-center align-items-center text-light bg-dark bg-gradient connection-container">
            <InputContainer title="Enter employe number" inputType="password" input={code}/>
            <NumberPad input={code} setInput={setcode} remove={remove} connect={connect}/>
        </div>
    )
}

export default Connection