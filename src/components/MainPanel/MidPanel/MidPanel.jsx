import React from 'react'

function MidPanel({children}) {
  return (
    <div className="mid-panel bg-dark d-flex flex-column justify-content-between">
        {children}
    </div>
  )
}

export default MidPanel