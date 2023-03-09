import React from 'react'

function MainPanel({children}) {
  return (
    <div className="bg-dark main-panel d-flex flex-row">
        {children}
    </div>
  )
}

export default MainPanel