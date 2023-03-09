import React from 'react'

function CartContainer({children}) {
  return (
    <div className='d-flex flex-column justify-content-between'>
        {children}
    </div>
  )
}

export default CartContainer