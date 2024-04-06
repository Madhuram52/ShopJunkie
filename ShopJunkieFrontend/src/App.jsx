import './App.css'
import { useState, useCallback } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { AuthContext } from './Contexts/auth-context';
import SearchProducts from './Pages/SearchProducts';
import Home from './Pages/Home';
import Auth from './Pages/Auth';
import Owner from './Pages/Owner';
import Customer from './Pages/Customer';
import SearchShop from './Pages/SearchShop';
function App() {

  const [isLoggedIn, setIsLoggedin] = useState(false);
  const [shopId, setShopId]= useState(null);

  const login = useCallback((sid) => {
    setIsLoggedin(true)
    setShopId(sid)
  }, [])

  const logout = useCallback(() => {
    setIsLoggedin(false)
    setShopId(null)
  }, [])
  // let isLoggedIn=1;
  let routes;
  if (isLoggedIn) {
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
    <AuthContext.Provider value={{ isLoggedIn: isLoggedIn, shopId: shopId, login: login, logout: logout }}>
      <Routes>
        {routes}
      </Routes>
    </AuthContext.Provider>
  );
}

export default App
