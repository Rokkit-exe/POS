import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'


function Main() {
    const databaseURL = process.env.REACT_APP_DATABASE_URL

    const TPS = 0.05
    const TVQ = 0.09

    const location = useLocation()
    const user = location.state.user
    const table = location.state.table
    
    
    const [clients, setClients] = useState(table.clients)
    const [curClient, setCurClient] = useState(clients[0])
    const [categories, setCategories] = useState([])
    const [items, setitems] = useState([])
    const [cartSubTotal, setCartSubTotal] = useState(0)
    const [tps, setTps] = useState(cartSubTotal * TPS)
    const [tvq, setTvq] = useState(cartSubTotal * TVQ)
    const [cartTotal, setCartTotal] = useState(cartSubTotal + tps + tvq)
    const [selectedItem, setSelectedItem] = useState([])
    const [selectedKey, setSelectedKey] = useState(-1)
    const [orders, setOrders] = useState()
    
    const addItemToCart = (item) => {
        let curClientCart = curClient.cart ? [...curClient.cart, {...item, cartId: curClient.cart.length}] : [{...item, cartId: 0}]
        setCurClient({...curClient, cart: curClientCart})
    }
        
        
    const removeItemFromCart = (item) => {
        console.log(item)
        setCurClient(curClient.cart.filter(elem => item.cartId === elem.cartId))
    }
    
    const handleSelect = (item) => {
        if (selectedItem === item) {
            setSelectedItem({})
        }
        else {
            setSelectedItem(item)
        }
    }

    const handlePunch = () => {
        updateClients()
        console.log(curClient)
    }

    const updateClients = () => {
        setClients(clients.forEach(client => {
            client.articles = [...client.articles, ...client.cart]
            client.active = client.cart ? 1 : client.active
            client.cart = []
        }))

        console.log(curClient)
    }

    const updateTotal= () => {
        setCartSubTotal(curClient.cart ? curClient.cart.reduce((total, x) => total + x.price, 0) : 0)
        setTps(cartSubTotal * TPS)
        setTvq(cartSubTotal * TVQ)
        setCartTotal(cartSubTotal + tps + tvq)
    }

    const removeItemFromOrder = (item) => orders.filter(elem => item !== elem)


    const fetchProducts = async(categorie) => {
        const result = await axios.get(databaseURL + categorie)
        setCategories(await result.data)
    }

    useEffect(() => {
        fetchProducts("categories")
    },[])

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
            <header className=" d-flex flex-row bg-dark bg-gradient header justify-content-between align-items-center">
                <div className="text-light d-flex justify-content-start">
                    <h2 className="mx-3 title"><NavLink to="/" className="navlink">Cluster</NavLink></h2>
                </div>
                <div className="d-flex justify-content-center">
                    <i className="bi bi-caret-left icons px-3"></i>
                    <i className="bi bi-people icons px-3"></i>
                    <i className="bi bi-caret-right icons px-3"></i>
                </div>
                <div className="pe-5 me-3">
                    <p className="username">User: {user.name}</p>
                    <p className="clientname text-light">Table: {table.id}</p>
                    <p className="clientname text-light">Client: {curClient.id}</p>
                </div>
            </header>

            <div className="bg-dark main-panel d-flex flex-row">

                {/* left panel */}
                <div className="side-panel bg-dark">
                    <div className="d-flex flex-row justify-content-between align-items-center bg-gradient side-panel-top">
                        <div className="text-light ps-2">Client: {curClient.id}</div>
                        <div>
                            <i className="bi bi-plus icons" onClick={() => addItemToCart(selectedItem)}></i>
                            <i className="bi bi-dash icons" onClick={() => removeItemFromCart(selectedItem)}></i>
                        </div>
                    </div>
                    <div className='d-flex flex-column'>
                        <div className='flex cart-container'>
                            <ul className='light' onChange={() => updateTotal()}> 
                                {curClient.cart ? curClient.cart.map((item, key) => 
                                <li className='light d-flex flex-row justify-content-between'
                                    key={key}
                                    style={item.cartId === selectedItem.cartId ? {border: "1px solid lightgray"} : {border: "none"}}
                                    onClick={() => handleSelect(item)}
                                    >
                                    <div>{item.name}</div>
                                    <div className='mx-2'>{item.price}$</div>
                                </li>) : undefined}
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
                <div className="mid-panel bg-dark d-flex flex-row justify-content-between">
                    <ul className="d-flex text-light panel-list flex-column">
                        {items ? items.map((item, key) => 
                            <li key={key} className="list-item" onClick={() => {
                                addItemToCart(item)
                            }}>{item.name}</li>
                        )
                        : <li className="list-item">Loading</li>}                        
                    </ul>
                </div>

                {/* right panel */}
                <div className="side-panel bg-dark d-flex flex-row justify-content-between">
                    <ul className="text-light panel-list">
                        {categories.map((cat, key) => 
                            <li key={key} className="list-item" onClick={() => setitems(cat.items)}>{cat.name}</li>
                        )}
                    </ul>
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
                        <div onClick={() => removeItemFromCart(selectedItem)}>
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
                        <div onClick={() => handlePunch()}>
                            <div className="footer-icon d-flex justify-content-center align-items-center"><i className="bi bi-check-circle"></i></div>
                            <div className="footer-item-text d-flex justify-content-center align-items-center">Continuer</div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        
    )
}

export default Main