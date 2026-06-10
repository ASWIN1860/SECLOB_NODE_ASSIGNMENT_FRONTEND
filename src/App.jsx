import { useState } from 'react'
import './App.css'
import {Routes,Route} from 'react-router-dom'

import Authpage from './components/Authpage'
import Home from './components/Home'
import Header from './components/Header'
import ProductDetails from './components/ProductDetails'

function App() {
  

  return (
    <>
      <Routes>
        <Route path='/' element={<Authpage/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/productdetails' element={<ProductDetails/>}/>
      </Routes>
    </>
  )
}

export default App
