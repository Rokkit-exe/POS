import React from 'react'

function TopSidePanelContainer({plusIconClick, minusIconClick, curClient, selectedItem}) {
  return (
    <div className="d-flex flex-row justify-content-between align-items-center bg-gradient side-panel-top">
        <div className="text-light ps-2">Client: {curClient.id}</div>
        <div>
            <i className="bi bi-plus icons" onClick={() => plusIconClick(selectedItem)}></i>
            <i className="bi bi-dash icons" onClick={() => minusIconClick(selectedItem)}></i>
        </div>
    </div>
  )
}

export default TopSidePanelContainer