import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import Client from '../objects/Client'
import TableObject from '../objects/TableObject'

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
        {id: parseInt(tableNumber), clients: Array.from({length: 30}, (x, i) => ({...Client, id: i + 1})), active: 0})
    }

    const remove = () => setTableNumber(tableNumber.slice(0, tableNumber.length - 1));

    const fetchTables = async() => {
        const result = await axios.get(`${databaseURL}tables`)
        setTables(await result.data)
    }

    useEffect(() => {
        if (table) 
            navigate("/main", {state: {user: user, table: table}})
    },[table])

    useEffect(() => {
        fetchTables()
    },[])

    return (
        <div className="d-flex flex-column justify-content-center align-items-center text-light mt-5 bg-dark bg-gradient connection-container">
                <div className="mb-3">
                    <h2>Enter table number</h2>
                </div>
                <div className='flex-row mb-3'>
                    <input type="text" value={tableNumber} className="connection-input border border-success" readOnly></input>
                </div>
                <div className="d-flex flex-row">
                    <i className="bi bi-1-circle icons-connection  m-2" onClick={() => setTableNumber(tableNumber + 1)}></i>
                    <i className="bi bi-2-circle icons-connection  m-2" onClick={() => setTableNumber(tableNumber + 2)}></i>
                    <i className="bi bi-3-circle icons-connection  m-2" onClick={() => setTableNumber(tableNumber + 3)}></i>
                </div>
                <div className="d-flex flex-row">
                    <i className="bi bi-4-circle icons-connection  m-2" onClick={() => setTableNumber(tableNumber + 4)}></i>
                    <i className="bi bi-5-circle icons-connection  m-2" onClick={() => setTableNumber(tableNumber + 5)}></i>
                    <i className="bi bi-6-circle icons-connection  m-2" onClick={() => setTableNumber(tableNumber + 6)}></i>
                </div>
                <div className="d-flex flex-row">
                    <i className="bi bi-7-circle icons-connection  m-2" onClick={() => setTableNumber(tableNumber + 7)}></i>
                    <i className="bi bi-8-circle icons-connection  m-2" onClick={() => setTableNumber(tableNumber + 8)}></i>
                    <i className="bi bi-9-circle icons-connection  m-2" onClick={() => setTableNumber(tableNumber + 9)}></i>
                </div>
                <div className="d-flex flex-row">
                    <i className="bi bi-arrow-left-circle icons-connection  m-2" onClick={() => remove()}></i>
                    <i className="bi bi-0-circle icons-connection  m-2" onClick={() => setTableNumber(tableNumber + 0)}></i>
                    <i className="bi bi-arrow-right-circle icons-connection  m-2" onClick={() => handleSelectTable()}></i>
                </div>
            </div>
    )
}

export default Table