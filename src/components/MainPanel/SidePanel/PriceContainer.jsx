import React from 'react'

function PriceContainer({subTotal, tps, tvq, total}) {
  return (
    <div className='fw-bold light border border-light px-2 total-container'>
        <p>SubTotal: {subTotal}$</p>
        <p>TPS: {tps.toFixed(2)}$</p>
        <p>TVQ: {tvq.toFixed(2)}$</p>
        <p>Total: {total.toFixed(2)}$</p>
    </div>
  )
}

export default PriceContainer