//import './App.css'
import Layout from './components/Layout'
import { CssBaseline } from '@mui/material';
import { Routes, Route } from 'react-router';
import Dashboard from './modules/Dashboard/Dashboard';
import ListUsers from './modules/Users/ListUsers';
import ListRoles from './modules/Roles/ListRoles';
import ListProductions from './modules/Productions/ListProductions';
import ListOrders from './modules/Orders/ListOrders';
import Login from './components/Login';
import EditUsers from './modules/Users/EditUsers';
import EditRoles from './modules/Roles/EditRoles';
import EditOrders from './modules/Orders/EditOrders';
import EditProductions from './modules/Productions/EditProductions';

function App() {

  return (
    <>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<ListUsers />} />
          <Route path="/users/edit" element={<EditUsers />} />
          <Route path="/roles" element={<ListRoles />} />
          <Route path="/roles/edit" element={<EditRoles />} />
          <Route path="/orders" element={<ListOrders />} />
          <Route path="/orders/edit" element={<EditOrders />} />
          <Route path="/productions" element={<ListProductions />} />
          <Route path="/productions/edit" element={<EditProductions />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
      
    </>
  )
}

export default App
