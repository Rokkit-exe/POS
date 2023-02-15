import React, { useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate, Outlet } from 'react-router-dom'
import Client from "../objects/Client.jsx"

function Pivot() {

    const navigate = useNavigate()

    const [clients, setClients] = useState(Array.from({length: 30}, (x, i) => ({...Client, id: i + 1})))
    
    const [cart, setCart] = useState([])
    const [cartSubTotal, setCartSubTotal] = useState(0)
    const [tps, setTps] = useState(0)
    const [tvq, setTvq] = useState(0)
    const [cartTotal, setCartTotal] = useState(0)
    const [table, setTable] = useState(0)

    const handleClientClick = (client) => navigate("/main", {state: client })

    return (
        <div className='pos-page'>
            <header className=" d-flex bg-dark bg-gradient header">
                <ul className=" pivot-list d-flex flex-row justify-content-between align-items-center">
                    {clients ? clients.map((client, key) => 
                        <li className="d-flex justify-content-center align-items-center flex-column" 
                            style={client.active ? {color: 'orangered'} : {color: 'lightgray'}}
                            onClick={() => handleClientClick()}>
                            <div className="pivot-icon d-flex justify-content-center align-items-center flex-column">
                                <i class="bi bi-person-fill"></i>
                                <div className="pivot-item-text">{client.id}</div>
                            </div>
                        </li>
                    )
                    : ""}
                </ul>
            </header>

            <div className="bg-dark main-panel d-flex flex-row">

                {/* left panel */}
                <div className="side-panel bg-dark">
                    <div className="d-flex flex-row justify-content-between align-items-center bg-gradient side-panel-top">
                        <div className="text-light ps-2">Client 1</div>
                    </div>
                    <div className='d-flex flex-column'>
                        <div className='flex cart-container'>
                            <ul className='light'> 
                                {cart ? cart.map((item) => 
                                <li className='light d-flex flex-row justify-content-between'>
                                    <div>{item.name}</div>
                                    <div className='mx-2'>{item.price}$</div>
                                </li>) : {}}
                            </ul>
                        </div>
                        <div className='light border border-light total-container'>
                            <p>SubTotal: {cartSubTotal}$</p>
                            <p>TPS: {tps.toFixed(2)}$</p>
                            <p>TVQ: {tvq.toFixed(2)}$</p>
                            <p>Total: {cartTotal.toFixed(2)}$</p>
                        </div>
                    </div>
                </div>

                {/* mid panel */}
                <div className="mid-panel bg-dark d-flex flex-column justify-content-between">
                    <div className='text-container'>
                        <div className='d-flex flex-column mb-2 mx-5 title-1'>Sélectionner un client</div>
                        <div className='text-light mb-2 mx-5 px-3 title-2 button'>Ajouter un client</div>            
                    </div>
                    <ul className="d-flex text-light panel-list flex-column">
                        {clients ? clients.map((client, key) => client.active ?
                            <li className="pivot-item d-flex flex-column mb-2">
                                <div className="d-flex justify-content-between">
                                    <div className='d-flex flex-row'>
                                        <i class="bi bi-person-fill mx-2"></i>
                                        <div className="pivot-item-text">{"client " + client.id}</div>
                                    </div>
                                    <div className='pivot-item-text mx-3'>{client.name ? client.name : "---"}</div>
                                    <div className='pivot-item-text mx-3 d-flex justify-content-end'>{client.articles ? client.articles.length + " articles" : "0 articles"}</div>
                                </div>
                            </li>
                            : undefined
                        )
                        : ""}
                    </ul>
                </div>

                {/* right panel */}
                <div className="side-panel bg-dark d-flex flex-row justify-content-between">
                    
                </div>
            </div>

            <div className="footer bg-dark bg-gradient">
                <ul className="text-light footer-list d-flex flex-row">
                    <li className="footer-item d-flex justify-content-center align-items-center flex-column">
                        <div className="">
                            <div className="footer-icon d-flex justify-content-center align-items-center"><i className="bi bi-box-arrow-left"></i></div>
                            <div className="footer-item-text d-flex justify-content-center align-items-center">Déconnexion</div>
                        </div>
                    </li>
                    <li className="footer-item d-flex justify-content-center align-items-center">
                        <div>
                            <div className="footer-icon d-flex justify-content-center align-items-center"><i className="bi bi-x-lg"></i></div>
                            <div className="footer-item-text d-flex justify-content-center align-items-center">Supprimer</div>
                        </div>
                        
                    </li>
                    <li className="footer-item d-flex justify-content-center align-items-center">
                        <div>
                            <div className="footer-icon d-flex justify-content-center align-items-center"><i className="bi bi-card-checklist"></i></div>
                            <div className="footer-item-text d-flex justify-content-center align-items-center">Ingredients</div>
                        </div>
                        
                    </li>
                    <li className="footer-item d-flex justify-content-center align-items-center">
                        <div>
                            <div className="footer-icon d-flex justify-content-center align-items-center"><i className="bi bi-list-ol"></i></div>
                            <div className="footer-item-text d-flex justify-content-center align-items-center">Services</div>
                        </div>
                        
                    </li>
                    <li className="footer-item d-flex justify-content-center align-items-center">
                        <div>
                            <div className="footer-icon d-flex justify-content-center align-items-center"><i className="bi bi-chat-right-text"></i></div>
                            <div className="footer-item-text d-flex justify-content-center align-items-center">Notes</div>
                        </div>
                        
                    </li>
                    <li className="footer-item d-flex justify-content-center align-items-center">
                        <div>
                            <div className="footer-icon d-flex justify-content-center align-items-center"><i className="bi bi-credit-card"></i></div>
                            <div className="footer-item-text d-flex justify-content-center align-items-center">Paiement</div>
                        </div>
                        
                    </li>
                    <li className="footer-item d-flex justify-content-center align-items-center">
                        <div>
                            <div className="footer-icon d-flex justify-content-center align-items-center"><i className="bi bi-slash-circle"></i></div>
                            <div className="footer-item-text d-flex justify-content-center align-items-center">Annuler</div>
                        </div>
                        
                    </li>
                    <li className="footer-item d-flex justify-content-center align-items-center">
                        <div>
                            <div className="footer-icon d-flex justify-content-center align-items-center"><i className="bi bi-check-circle"></i></div>
                            <div className="footer-item-text d-flex justify-content-center align-items-center">Continuer</div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        )
    }

export default Pivot
