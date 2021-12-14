import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css';
import ProductsView from '../../views/ProductsView'
import LoginView from '../../views/LoginView'
import ProfileView from '../../views/ProfileView'
import NotFoundView from '../../views/NotFoundView'

const App = () => {
  return <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate replace to='/products' />}/>
          <Route path='/products' element={<ProductsView />} />
          <Route path='/login' element={<LoginView />} />
          <Route path='/profile' element={<ProfileView />} />
          <Route path='*' element={<NotFoundView />}/>
        </Routes>
      </BrowserRouter>
    </div>
  ;
}

export default App;
