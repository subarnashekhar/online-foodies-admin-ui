import React, { use, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import AddFood from './pages/AddFood/AddFood';
import ListFood from './pages/ListFood/ListFood';
import Orders from './pages/Orders/Orders';
import Sidebar from './components/Sidebar/Sidebar';
import Menubar from './components/Menubar/Menubar';
import { ToastContainer } from 'react-toastify';
import LoginPage from './pages/LoginPage/LoginPage';
import RedirectPage from './pages/RedirectPage/RedirectPage';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

const App = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  }
  return (
    <div className="d-flex" id="wrapper">
            
            <Sidebar sidebarVisible={sidebarVisible}/>
            
            <div id="page-content-wrapper">
                
                <Menubar toggleSidebar={toggleSidebar} />
                <ToastContainer />
                
                <div className="container-fluid">
                    <Routes>
                      <Route path='/login' element={<LoginPage />}/>
                      <Route path='/oauth2/idpresponse' element={<RedirectPage/>}></Route>
                      <Route path='/add' element={<ProtectedRoute element={<AddFood />} />} />
                      <Route path='/list' element={<ProtectedRoute element={<ListFood />} />} />
                      <Route path='/orders' element={<ProtectedRoute element={<Orders />} />} />
                      <Route path='/' element={<ProtectedRoute element={<ListFood />} />} />
                    </Routes>
                </div>
            </div>
        </div>
  )
}

export default App;