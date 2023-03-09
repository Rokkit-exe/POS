import React from 'react'

function CartItemsContainer({children}) {
  return (
    <div className='d-flex cart-container align-items-stretch'>
        {children}
    </div>
  )
}

export default CartItemsContainer