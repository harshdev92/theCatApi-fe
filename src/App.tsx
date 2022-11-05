import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import './App.css'

import Cats from './components/Cats'
import UploadCatImage from './components/UploadCatImage'

function App() {
    return (
        <React.Fragment>
            <ToastContainer />
            <main className="container">
                <Router>
                    <Routes>
                        <Route path="/" element={<Cats />} />
                        <Route path="/uploads" element={<UploadCatImage />} />
                        <Route path="*" element={<h1>404</h1>} />
                    </Routes>
                </Router>
            </main>
        </React.Fragment>
    )
}

export default App
