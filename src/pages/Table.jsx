import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import Client from '../objects/Client'
import TableObject from '../objects/TableObject'
import NumberPad from '../components/NumberPad'
import InputContainer from '../components/InputContainer'

function Table() {
    const databaseURL = process.env.REACT_APP_DATABASE_URL

    const location = useLocation()
    const user = location.state.user

    const [tableNumber, setTableNumber] = useState("")
    const [table, setTable] = useState(undefined)
    const [tables, setTables] = useState([])

    const navigate = useNavigate()

    const handleSelectTable = () => {
        setTable(tables.find((x) => x.id === parseInt(tableNumber)) ? 
        tables.find((x) => x.id === parseInt(tableNumber)) : 
        {id: parseInt(tableNumber), clients: Array.from({length: 30}, (x, i) => ({...Client, id: i + 1})), active: false})
    }

    const remove = () => setTableNumber(tableNumber.slice(0, tableNumber.length - 1));

    const fetchTables = async() => {
        const result = await axios.get(`${databaseURL}tables`)
        setTables(await result.data)
    }

    useEffect(() => {
        if (table && !table.active) 
            navigate("/main", {state: {user: user, table: table}})
        else if (table && table.active)
            navigate("/pivot", {state: {user: user, table: table}})
    },[table])

    useEffect(() => {
        fetchTables()
    },[])

    return (
        <div className="d-flex flex-column justify-content-center align-items-center text-light bg-dark bg-gradient connection-container">
            <InputContainer title="Enter table number" inputType="text" input={tableNumber}/>
            <NumberPad input={tableNumber} setInput={setTableNumber} remove={remove} connect={handleSelectTable} />
        </div>
    )
}

export default Table