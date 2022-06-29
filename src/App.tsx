import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CartPage from './pages/cart/cart-page';
import Checkout from './pages/cart/checkout';
import ShippingAddress from './pages/cart/shipping-address';
import HomePage from './pages/home';
import ProductDetails from './pages/product-details';
import Login from './pages/users/login';
import { Toaster } from 'react-hot-toast';
import DashboardPage from './pages/dashboard/dashboard-page';
import ProductTable from './pages/dashboard/products/product-table';
import UserTable from './pages/dashboard/users/users-table';
import ProductUpdate from './pages/dashboard/products/product-update';
import Register from './pages/users/regitser';
import Profile from './pages/users/profile';
import Contact from './pages/contact/contact';
import OrdersTable from './pages/dashboard/orders/order-table';
import OrderDetails from './pages/cart/order-details';
import Products from './pages/products';
import AuthProvider from './utils/auth-provider';
import AdminProvider from './utils/admin-provider';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/home' element={<Products />} />
        <Route path='/search/:keyword' element={<Products />} />
        <Route path='/page/:pageNumber' element={<Products />} />
        <Route path='/products/:id' element={<ProductDetails />} />
        <Route path='/cart' element={<CartPage />} />
        <Route
          path='/shipping-address'
          element={
            <AuthProvider>
              <ShippingAddress />
            </AuthProvider>
          }
        />
        <Route
          path='/checkout'
          element={
            <AuthProvider>
              <Checkout />
            </AuthProvider>
          }
        />
        <Route
          path='/profile/:id'
          element={
            <AuthProvider>
              <Profile />
            </AuthProvider>
          }
        />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route
          path='/orders/:id'
          element={
            <AuthProvider>
              <OrderDetails />
            </AuthProvider>
          }
        />
        <Route
          path='/dashboard'
          element={
            <AdminProvider>
              <DashboardPage />
            </AdminProvider>
          }
        />
        <Route
          path='/dashboard/product-list'
          element={
            <AdminProvider>
              <ProductTable />
            </AdminProvider>
          }
        />
        <Route
          path='/dashboard/product-list/:pageNumber'
          element={
            <AdminProvider>
              <ProductTable />
            </AdminProvider>
          }
        />
        <Route
          path='/dashboard/user-list'
          element={
            <AdminProvider>
              <UserTable />
            </AdminProvider>
          }
        />
        <Route
          path='/dashboard/orders-list'
          element={
            <AdminProvider>
              <OrdersTable />
            </AdminProvider>
          }
        />
        <Route
          path='/dashboard/product-edit/:id'
          element={
            <AdminProvider>
              <ProductUpdate />
            </AdminProvider>
          }
        />
        <Route path='/contact' element={<Contact />} />
      </Routes>
      <Toaster position='top-center' reverseOrder={false} />
    </Router>
  );
};

export default App;
