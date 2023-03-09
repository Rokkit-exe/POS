import React from 'react'

function FooterButtonList({children}) {
  return (
    <ul className="text-light footer-list d-flex flex-row">
        {children}
    </ul>
  )
}

export default FooterButtonList