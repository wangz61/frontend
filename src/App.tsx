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
import CreateUsers from './modules/Users/CreateUsers';
import CreateRoles from './modules/Roles/CreateRoles';
import CreateOrders from './modules/Orders/CreateOrders';
import CreateProductions from './modules/Productions/CreateProductions';
function App() {

  return (
    <>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<ListUsers />} />
          <Route path="/users/create" element={<CreateUsers />} />
          <Route path="/users/edit" element={<EditUsers />} />
          <Route path="/roles" element={<ListRoles />} />
          <Route path="/roles/create" element={<CreateRoles />} />
          <Route path="/orders" element={<ListOrders />} />
          <Route path="/orders/create" element={<CreateOrders />} />
          <Route path="/productions" element={<ListProductions />} />
          <Route path="/productions/create" element={<CreateProductions />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
      
    </>
  )
}

export default App
