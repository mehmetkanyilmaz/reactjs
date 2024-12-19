import React from 'react'

import "./styles.css"

import { Box } from '@chakra-ui/react';

import { useAuth } from '../../contexts/AuthContext';

import { Link, Outlet, useNavigate } from "react-router-dom";

function Admin() {
    const { user } = useAuth()

    const navigate = useNavigate();

    if(user.role != "Admin") {
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