import React from 'react'

function Header({children}) {
    return (
        <div className=" d-flex flex-row bg-dark bg-gradient header justify-content-between align-items-center">
            {children}
        </div>
    )
}

export default Header