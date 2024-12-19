import './App.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from './components/navbar';
import Signin from './pages/Auth/Signin';
import Signup from './pages/Auth/Signup';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Profile from './pages/Profile';
import Basket from './pages/Basket';
import Error404 from './pages/Error404';
import Admin from './pages/Admin';
import Orders from './pages/Admin/Orders';
import AdminProducts from './pages/Admin/Products';
import Home from './pages/Admin/Home';
import AdminProductDetail from './pages/Admin/ProductDetail';
import NewProduct from './pages/Admin/Products/new';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div>
          <Navbar />

          <div id='content'>
            <Routes>
              <Route path="/" exact Component={Products} />
              <Route path="/product/:productId" Component={ProductDetail} />
              <Route path="/signin" Component={Signin} />
              <Route path="/signup" Component={Signup} />
              <Route path="/basket" Component={Basket} />
              <Route path="/profile" Component={Profile} />
              <Route path="/admin" Component={Admin} >
                <Route path="/admin" exact Component={Home} />
                <Route path="/admin/orders" Component={Orders} />
                <Route path="/admin/products" Component={AdminProducts} />
                <Route path="/admin/products/:productId" Component={AdminProductDetail} />
                <Route path="/admin/products/new" Component={NewProduct} />
              </Route>
              <Route path="*" Component={Error404} />
            </Routes>
          </div>

        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
