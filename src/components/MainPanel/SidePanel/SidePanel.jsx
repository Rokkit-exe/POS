import React from 'react'

function SidePanel({children}) {
  return (
    <div className="side-panel bg-dark">
        {children}
    </div>
  )
}

export default SidePanel