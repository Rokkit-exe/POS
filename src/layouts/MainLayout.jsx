import React from 'react'
import { Link } from 'react-router-dom'

function MainLayout({children}) {
    return (
        <div className='bg-dark main-layout'>
            <header>
                <nav className='navbar bg-dark bg-gradient navbar-expand border-light header'>
                    <div className='container-fluid'>
                        <Link to="/" className='navbar-brand light'>DevPOS</Link>
                    </div>
                    <div className='container-fluid'>
                        <Link to="/connection" className='navbar-brand light'>Connection</Link>
                    </div>
                    <div className='container-fluid'>
                        <Link to="/main" className='navbar-brand light'>Main</Link>
                    </div>
                    <div className='container-fluid'>
                        <Link to="/edit" className='navbar-brand light'>Edit</Link>
                    </div>
                    <div className='container-fluid'>
                        <Link to="/table" className='navbar-brand light'>Table</Link>
                    </div>
                    <div className='container-fluid'>
                        <Link to="/pivot" className='navbar-brand light'>Pivot</Link>
                    </div>
                </nav>
            </header>
            <main>
                <div className='container mt-3 bg-dark'>
                    {children}
                </div>
            </main>
        </div>
    )
}

export default MainLayout