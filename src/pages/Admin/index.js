import React from 'react'

import "./styles.css"

import { Box, Switch } from '@chakra-ui/react';

import { useAuth } from '../../contexts/AuthContext';

import { Link, Routes, Route, Outlet, useNavigate } from "react-router-dom";

import Home from './Home';
import Orders from './Orders';
import Products from './Products';

function Admin() {
    const { user } = useAuth()

    const navigate = useNavigate();

    if(user.role != "admin") {
        return navigate("/");
    }

  return (
    
    <div>
        <nav>
            <ul className="admin-menu">
                <li>
                    <Link to="/admin">Home</Link>
                </li>
                <li>
                    <Link to="/admin/orders">Orders</Link>
                </li>
                <li>
                    <Link to="/admin/products">Products</Link>
                </li>
            </ul>
        </nav>

        <Box mt={10}>
            <Outlet />
        </Box>
    </div>
    
  )
}

export default Admin