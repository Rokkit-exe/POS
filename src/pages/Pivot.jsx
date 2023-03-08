import React, { useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate, Outlet } from 'react-router-dom'
import Client from "../objects/Client.jsx"
import FooterButton from '../components/FooterButton.jsx'

function Pivot() {

    const navigate = useNavigate()
    const location = useLocation()

    const TPS = 0.05
    const TVQ = 0.09

    const user = location.state.user

    const [table, setTable] = useState(location.state.table)
    const [curClient, setCurClient] = useState(table.clients[0])
    const [cartSubTotal, setCartSubTotal] = useState(0)
    const [tps, setTps] = useState(cartSubTotal * TPS)
    const [tvq, setTvq] = useState(cartSubTotal * TVQ)
    const [cartTotal, setCartTotal] = useState(cartSubTotal + tps + tvq)
    
    const handleClientClick = (client) => navigate("/main", {state: {user: user, table: table, curClient: client}})
        
    const newClient = () => {
        let newClient = {}
        for (let i = 0; i < table.clients.length; i++ )
            if (!table.clients[i].active) {
                newClient = table.clients[i]
                break
            }
        navigate("/main", {state: {user: user, table: table, curClient: newClient}})
    }

    const updateTotal= () => {
        setCartSubTotal(curClient.cart ? curClient.cart.reduce((total, x) => total + x.price, 0) : 0)
        setTps(cartSubTotal * TPS)
        setTvq(cartSubTotal * TVQ)
        setCartTotal(cartSubTotal + tps + tvq)
    }

    const handlePunch = () => {}

    useEffect(() => {
        setCartSubTotal(curClient.cart ? curClient.cart.reduce((total, x) => total + x.price, 0) : 0)
    },[curClient])

    useEffect(() => {
        setTps(cartSubTotal * TPS)
        setTvq(cartSubTotal * TVQ)
    }, [cartSubTotal])

    useEffect(() => {
        setCartTotal(cartSubTotal + tps + tvq)
    }, [tvq])

    return (
        <div className='pos-page'>
            <header className=" d-flex bg-dark bg-gradient header">
                <ul className=" pivot-list d-flex flex-row justify-content-between align-items-center">
                    {table.clients ? table.clients.map((client, key) => 
                        <li className="d-flex justify-content-center align-items-center flex-column" 
                            style={client.active ? {color: 'orangered', borderColor: 'orangered'} : {color: 'lightgray', borderColor: 'lightgray'}}
                            onClick={() => handleClientClick(client)}>
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
                    <div className='d-flex flex-column justify-content-between'>
                        <div className='d-flex cart-container align-items-stretch'>
                            <ul className='light' onChange={() => updateTotal()}> 
                                {curClient.cart ? curClient.cart.map((item, key) => 
                                <li className='light d-flex flex-column'
                                    key={key}
                                    >
                                    <div className='d-flex flex-row justify-content-between'>
                                        <div>{item.name}</div>
                                        <div className='mx-2'>{item.price}$</div>
                                    </div>
                                    <div className='px-2'>{item.note ? `note: ${item.note}` : undefined}</div>
                                </li>) : undefined}
                            </ul>
                        </div>
                        <div className='fw-bold light border border-light px-2 total-container'>
                            <p>SubTotal: {cartSubTotal}$</p>
                            <p>TPS: {tps.toFixed(2)}$</p>
                            <p>TVQ: {tvq.toFixed(2)}$</p>
                            <p>Total: {cartTotal.toFixed(2)}$</p>
                        </div>
                    </div>
                </div>

                {/* mid panel */}
                <div className="mid-panel bg-dark d-flex flex-column">
                    <div className='text-container'>
                        <div className='d-flex flex-column mb-2 mx-5 title-1'>Sélectionner un client</div>
                        <div className='text-light mb-2 mx-5 px-3 title-2 button' onClick={() => newClient()}>Ajouter un client</div>            
                    </div>
                    <ul className="d-flex text-light panel-list flex-column">
                        {table.clients ? table.clients.map((client, key) => client.active ?
                            <li className="pivot-item d-flex flex-column mb-2" 
                                onClick={() => setCurClient(table.clients[key])}
                                style={client === curClient ? {color: 'orangered', borderColor: 'orangered'}: {color: 'lightgray', borderColor: 'lightgray'}}
                            >
                                <div className="d-flex justify-content-between">
                                    <div className='d-flex flex-row'>
                                        <i class="bi bi-person-fill mx-2"></i>
                                        <div className="pivot-item-text">{"client " + client.id}</div>
                                    </div>
                                    <div className='pivot-item-text mx-3'>{client.name ? client.name : "---"}</div>
                                    <div className='pivot-item-text mx-3 d-flex justify-content-end'>{client.cart ? client.cart.length + " articles" : "0 articles"}</div>
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
                    <FooterButton title="Déconnexion" color="yellow" icon="bi-box-arrow-left" click={() => true}/>
                    <FooterButton title="Supprimer" color="red" icon="bi-x-lg" click={() => true}/>
                    <FooterButton title="Ingredients" color="orange" icon="bi-card-checklist" click={() => true}/>
                    <FooterButton title="Services" color="pink" icon="bi-list-ol" click={() => true}/>
                    <FooterButton title="Notes" color="lightblue" icon="bi-chat-right-text" click={() => true}/>
                    <FooterButton title="Payment" color="blue" icon="bi-credit-card" click={() => true}/>
                    <FooterButton title="Annuler" color="red" icon="bi-slash-circle" click={() => true}/>
                    <FooterButton title="Continuer" color="green" icon="bi-check-circle" click={() => handlePunch()}/>
                </ul>
            </div>
        </div>
        )
    }

export default Pivot
