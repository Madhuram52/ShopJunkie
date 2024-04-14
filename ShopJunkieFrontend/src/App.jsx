import React from 'react';
import './App.css'
import { Route, Routes, Navigate, renderMatches } from 'react-router-dom';
import { useAuth } from './hooks/auth-hook';
import { AuthContext } from './Contexts/auth-context';
import SearchProducts from './Pages/SearchProducts';
import Home from './Pages/Home';
import Auth from './Pages/Auth';
import Owner from './Pages/Owner';
import Customer from './Pages/Customer';
import SearchShop from './Pages/SearchShop';

function App() {

  const {token, login, logout , shopId} = useAuth();

  let routes;
  if (token) {
    routes = (
      <>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchProducts />} />
        <Route path="/searchshop" element={<SearchShop />}></Route>
        <Route path="/searchprod" element={<SearchProducts />} />
        <Route path="/:sid/owner" element={<Owner />} />
        <Route path="/:sid/customer" element={<Customer loadAll={false} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </>
    );
  }
  else {
    routes = (
      <>
        <Route path="/" element={<Home />} />
        <Route path="/searchshop" element={<SearchShop />}></Route>
        <Route path="/searchprod" element={<SearchProducts />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </>
    );
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn: !!token, token: token, shopId: shopId, login: login, logout: logout }}>
      <Routes>
        {routes}
      </Routes>
    </AuthContext.Provider>
  );
}

export default App
