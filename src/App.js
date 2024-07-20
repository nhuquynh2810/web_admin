import 'bootstrap/dist/css/bootstrap.min.css';



import './App.css';
import Login from './screens/Login';
import Home from './screens/Home';
import Products from './screens/Products';
import Insert from './screens/Insert';
import Update from './screens/Update';
import PageNotFound from './screens/PageNotFound'

import {
  BrowserRouter as Router, Routes, Route,
  Navigate, Outlet
} from 'react-router-dom';
import React, { useState } from 'react';

function App() {

  // đọc thông tin user từ localStorage
  const getUserInfoFromLocalStorage = () => {
    const userInfo = localStorage.getItem('user');
    if (userInfo) {
      return JSON.parse(userInfo);
    }
    return null;
  }
  // lưu thông tin user vào localStorage
  const saveUserInfoToLocalStorage = (userInfo) => {
    if (!userInfo) {
      localStorage.removeItem('user');
      setUser(null);
    } else {
      localStorage.setItem('user', JSON.stringify(userInfo));
      setUser(userInfo);
    }
  }
  // state user
  const [user, setUser] = useState(getUserInfoFromLocalStorage());

  // các route không cần login
  const PublicRoute = () => {
    if (user) { // nếu đã login thì cho vào trang chủ
      return <Navigate to="/" />
    }
    return <Outlet /> // cho đi tiếp
  }

  // các route cần login
  const PrivateRoute = () => {
    if (!user) { // nếu chưa login thì cho vào trang login
      return <Navigate to="/login" />
    }
    return <Outlet />
  }

  return (
    <div className="container">
      <Router>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login saveUser=
              {saveUserInfoToLocalStorage} />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/insert-product" element={<Insert />} />
            <Route path="/update-product/:id" element={<Update />} />
            <Route path="*" element={<PageNotFound />}
            />
          </Route>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
