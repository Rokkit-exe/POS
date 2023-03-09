import React from 'react'

function ItemsList({items, itemClick}) {
  return (
    <div>
        <ul className="d-flex text-light panel-list flex-column">
            {items ? items.map((item, key) => 
                <li key={key} className="list-item" onClick={() => {
                    itemClick(item)
                }}>{item.name}</li>
            )
            : <li className="list-item">Loading</li>}                        
        </ul>
    </div>
  )
}

export default ItemsList