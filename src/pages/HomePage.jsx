import React from 'react'
import { Link } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'

function HomePage() {
    return (
        <MainLayout>
            <div className='bg-light p-5 mt-4 rounded-3'>
                <h1>Welcome the simple POS for small buiseness</h1>
                <p>Labore tempor ipsum duis ea exercitation laboris laborum mollit qui exercitation.</p>
                <p>If you have an issue, 123-456-7890 anytime</p>
                <Link to="/pos" className="btn btn-primary">Click here to sell products</Link>
            </div>
        </MainLayout>
        
    )
}

export default HomePage