import React from 'react'

function StatusContainer({username, tableNumber, clientNumber}) {
  return (
    <div className="pe-5 me-3">
        <p className="username">User: {username}</p>
        <p className="clientname text-light">Table: {tableNumber}</p>
        <p className="clientname text-light">Client: {clientNumber}</p>
    </div>
  )
}

export default StatusContainer