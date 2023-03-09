import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import CartContainer from '../components/MainPanel/SidePanel/CartContainer'
import CartItemsContainer from '../components/MainPanel/SidePanel/CartItemsContainer'
import CartItemsList from '../components/MainPanel/SidePanel/CartItemsList'
import ClientNavigationContainer from '../components/Header/ClientNavigationContainer'
import FooterButton from '../components/Footer/FooterButton'
import Header from '../components/Header/Header'
import MainPanel from '../components/MainPanel/MainPanel'
import MidPanel from '../components/MainPanel/MidPanel/MidPanel'
import PriceContainer from '../components/MainPanel/SidePanel/PriceContainer'
import SidePanel from '../components/MainPanel/SidePanel/SidePanel'
import StatusContainer from '../components/Header/StatusContainer'
import TopSidePanelContainer from '../components/MainPanel/SidePanel/TopSidePanelContainer'
import NoteContainer from '../components/MainPanel/MidPanel/NoteContainer'
import ItemsList from '../components/MainPanel/MidPanel/ItemsList'
import FooterContainer from '../components/Footer/FooterContainer'
import FooterButtonList from '../components/Footer/FooterButtonList'


function Main() {
    const databaseURL = process.env.REACT_APP_DATABASE_URL

    const navigate = useNavigate()
    const location = useLocation()

    const TPS = 0.05
    const TVQ = 0.09

    const user = location.state.user

    const [table, setTable] = useState(location.state.table)
    const [curClient, setCurClient] = useState(location.state.curClient ? location.state.curClient : table.clients[0])
    const [categories, setCategories] = useState([])
    const [items, setitems] = useState([])
    const [cartSubTotal, setCartSubTotal] = useState(0)
    const [tps, setTps] = useState(cartSubTotal * TPS)
    const [tvq, setTvq] = useState(cartSubTotal * TVQ)
    const [cartTotal, setCartTotal] = useState(cartSubTotal + tps + tvq)
    const [selectedItem, setSelectedItem] = useState({})
    const [orders, setOrders] = useState()
    const [note, setNote] = useState("")

    const [showNoteBox, setShowNoteBox] = useState(false)

    const isClientActive = (client) => client.cart.length >= 1 || client.articles.length >= 1
    const isTableActive = (table) => table.clients.forEach((client) => isClientActive(client) ? true : undefined)
    
    const addItemToCart = (item) => {
        let curClientCart = curClient.cart ? [...curClient.cart, {...item, cartId: curClient.cart.length}] : [{...item, cartId: 0}]
        setCurClient({...curClient, cart: curClientCart})
    }
        
    const removeItemFromCart = (item) => setCurClient({...curClient, cart: [...curClient.cart.filter(elem => item.cartId !== elem.cartId)]})
    
    const handleSelect = (item) => setSelectedItem(selectedItem === item ? {} : item)

    const handlePunch = () => {}

    const updateTotal= () => {
        setCartSubTotal(curClient.cart ? curClient.cart.reduce((total, x) => total + x.price, 0) : 0)
        setTps(cartSubTotal * TPS)
        setTvq(cartSubTotal * TVQ)
        setCartTotal(cartSubTotal + tps + tvq)
    }

    const removeItemFromOrder = (item) => orders.filter(elem => item !== elem)

    const changeClient = (newClient) => {
        setTable(
            {
                ...table,
                active: isTableActive(table),
                clients: table.clients.map((client) => client.id === table.clients[curClient.id - 1].id ? 
                    {...curClient, active: isClientActive(curClient)} 
                    : client)
            }
        )
        setCurClient(newClient)
    }


    const fetchProducts = async(categorie) => {
        const result = await axios.get(databaseURL + categorie)
        setCategories(await result.data)
    }

    const addNote = () => {
        setCurClient({...curClient, cart: curClient.cart.map((elem => selectedItem === elem ? {...elem, note: note}: elem))})
        setNote("")
        setShowNoteBox(false)
    }

    useEffect(() => {
        fetchProducts("categories")
    },[])

    useEffect(() => {
        setCartSubTotal(curClient.cart ? curClient.cart.reduce((total, x) => total + x.price, 0) : 0)
        setTable(
            {
                ...table,
                active: isTableActive(table),
                clients: table.clients.map((client) => client.id === table.clients[curClient.id - 1].id ? 
                    {...curClient, active: isClientActive(curClient)} 
                    : client)
            }
        )
        console.log(table)
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
            <Header>
                <div className="text-light d-flex justify-content-start">
                    <h2 className="mx-3 title" onClick={() => navigate("/connection")}>Cluster</h2>
                </div>
                <ClientNavigationContainer 
                    leftArrowClick={changeClient(curClient.id > 1 ? table.clients[curClient.id - 2] : table.clients[curClient.id - 1])} 
                    rightArrowClick={navigate("/pivot", {state: {user: user, table: table}})} 
                    pivotIconClick={changeClient(table.clients[curClient.id])}/>
                <StatusContainer username={user.name} tableNumber={table.id} clientNumber={curClient.id}/>
            </Header>
            <MainPanel>
                {/* left panel */}
                <SidePanel>
                    <TopSidePanelContainer plusIconClick={addItemToCart} minusIconClick={removeItemFromCart} curClient={curClient} selectedItem={selectedItem}/>
                    <CartContainer>
                        <CartItemsContainer>
                            <CartItemsList curClient={curClient} selectedItem={selectedItem} onChange={updateTotal} itemClick={handleSelect}/>
                        </CartItemsContainer>
                        <PriceContainer subTotal={cartSubTotal} tps={tps} tvq={tvq} total={cartTotal}/>
                    </CartContainer>
                </SidePanel>

                {/* mid panel */}

                <MidPanel>
                    <ItemsList items={items} itemClick={addItemToCart}/>
                    <NoteContainer note={note} setNote={setNote} addNote={addNote} showNoteBox={showNoteBox}/>
                </MidPanel>
                

                {/* right panel */}
                <SidePanel>
                    <ul className="text-light panel-list">
                        {categories.map((cat, key) => 
                            <li key={key} className="list-item" onClick={() => setitems(cat.items)}>{cat.name}</li>
                        )}
                    </ul>
                </SidePanel>
            </MainPanel>
            

            <FooterContainer>
                <FooterButtonList>
                    <FooterButton title="Déconnexion" color="yellow" icon="bi-box-arrow-left" click={() => navigate("/connection")}/>
                    <FooterButton title="Supprimer" color="red" icon="bi-x-lg" click={() => removeItemFromCart(selectedItem)}/>
                    <FooterButton title="Ingredients" color="orange" icon="bi-card-checklist" click={() => true}/>
                    <FooterButton title="Services" color="pink" icon="bi-list-ol" click={() => true}/>
                    <FooterButton title="Notes" color="lightblue" icon="bi-chat-right-text" click={() => setShowNoteBox(!showNoteBox)}/>
                    <FooterButton title="Payment" color="blue" icon="bi-credit-card" click={() => true}/>
                    <FooterButton title="Annuler" color="red" icon="bi-slash-circle" click={() => true}/>
                    <FooterButton title="Continuer" color="green" icon="bi-check-circle" click={() => handlePunch()}/>
                </FooterButtonList>
            </FooterContainer>
        </div>
        
    )
}

export default Main