import React from 'react'

function NumberPad({input, setInput, remove, connect}) {
  return (
    <div className='d-flex flex-column justify-content-center align-items-center'>
        <div className="d-flex flex-row">
            <i className="bi bi-1-circle icons-connection  m-2" onClick={() => setInput(input + 1)}></i>
            <i className="bi bi-2-circle icons-connection  m-2" onClick={() => setInput(input + 2)}></i>
            <i className="bi bi-3-circle icons-connection  m-2" onClick={() => setInput(input + 3)}></i>
        </div>
        <div className="d-flex flex-row">
            <i className="bi bi-4-circle icons-connection  m-2" onClick={() => setInput(input + 4)}></i>
            <i className="bi bi-5-circle icons-connection  m-2" onClick={() => setInput(input + 5)}></i>
            <i className="bi bi-6-circle icons-connection  m-2" onClick={() => setInput(input + 6)}></i>
        </div>
        <div className="d-flex flex-row">
            <i className="bi bi-7-circle icons-connection  m-2" onClick={() => setInput(input + 7)}></i>
            <i className="bi bi-8-circle icons-connection  m-2" onClick={() => setInput(input + 8)}></i>
            <i className="bi bi-9-circle icons-connection  m-2" onClick={() => setInput(input + 9)}></i>
        </div>
        <div className="d-flex flex-row">
            <i className="bi bi-arrow-left-circle icons-connection  m-2" onClick={() => remove()}></i>
            <i className="bi bi-0-circle icons-connection  m-2" onClick={() => setInput(input + 0)}></i>
            <i className="bi bi-arrow-right-circle icons-connection  m-2" onClick={() => connect()}></i>
        </div>
    </div>
  )
}

export default NumberPad