import React from 'react'

function InputContainer({title, inputType, input}) {
  return (
    <div className='d-flex flex-column justify-content-center align-items-center'>
        <div className="mb-3">
            <h2>{title}</h2>
        </div>
        <div className='flex-row mb-3'>
            <input type={inputType} value={input} className="connection-input border border-success" readOnly></input>
        </div>
    </div>
  )
}

export default InputContainer