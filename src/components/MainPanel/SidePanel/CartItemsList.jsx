import React from 'react'

function CartItemsList({curClient, selectedItem, onChange, itemClick}) {
  return (
    <ul className='light' onChange={() => onChange()}> 
        {curClient.cart ? curClient.cart.map((item, key) => 
            <li className='light d-flex flex-column'
                key={key}
                style={item.cartId === selectedItem.cartId ? {border: "1px solid lightgray"} : {border: "none"}}
                onClick={() => itemClick(item)}
                >
                <div className='d-flex flex-row justify-content-between'>
                    <div>{item.name}</div>
                    <div className='mx-2'>{item.price}$</div>
                </div>
                <div className='px-2'>{item.note ? `note: ${item.note}` : undefined}</div>
            </li>) : undefined}
    </ul>
  )
}

export default CartItemsList