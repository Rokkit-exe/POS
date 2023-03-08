import React from 'react'


function FooterButton({title, color, icon, click}) {
    const iconText = `bi ${icon}`

    return (
        <li className="footer-item d-flex justify-content-center align-items-center flex-column">
            <div style={{color: color}} onClick={click}>
                <div style={{borderColor: color}} className="footer-icon d-flex justify-content-center align-items-center"><i className={iconText}></i></div>
                <div className="footer-item-text d-flex justify-content-center align-items-center">{title}</div>
            </div>
        </li>
    )
}

export default FooterButton