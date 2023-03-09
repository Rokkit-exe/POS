import React from 'react'

function ClientNavigationContainer({leftArrowClick, rightArrowClick, pivotIconClick}) {
  return (
    <div className="d-flex justify-content-center">
        <i className="bi bi-caret-left icons px-3" onClick={() => leftArrowClick()}></i>
        <i className="bi bi-people icons px-3" onClick={() => pivotIconClick()}></i>
        <i className="bi bi-caret-right icons px-3" onClick={() => rightArrowClick()}></i>
    </div>
  )
}

export default ClientNavigationContainer