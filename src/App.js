import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './Context/CartContext';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer';
import ProtectedRoute from './Components/ProtectedRoute';

// Public Pages
import Home from './Pages/Home';
import About from './Pages/About';
import Categories from './Pages/Categories';
import CategoryDetail from './Pages/CategoryDetail';
import Products from './Pages/Products';
import ProductDetail from './Pages/ProductDetail';
import Cart from './Pages/Cart';
import Checkout from './Pages/Checkout';
import OrderConfirmation from './Pages/OrderConfirmation';

// Admin Pages
import AdminLogin from './Pages/Admin/AdminLogin';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import AdminOrders from './Pages/Admin/AdminOrders';
import ProductList from './Pages/Admin/ProductList';
import ProductEditScreen from './Pages/Admin/ProductEditScreen';

export default function App() {
  return (
    <CartProvider>
      <Routes>
        {/* Admin Routes (No Navbar/Footer) */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute>
              <AdminOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <ProtectedRoute>
              <ProductList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/products/new"
          element={
            <ProtectedRoute>
              <ProductEditScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/products/:id/edit"
          element={
            <ProtectedRoute>
              <ProductEditScreen />
            </ProtectedRoute>
          }
        />

        {/* Public Routes (With Navbar/Footer) */}
        <Route
          path="/*"
          element={
            <div className="flex flex-col min-h-screen text-slate-800">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/categories" element={<Categories />} />
                  <Route path="/category/:id" element={<CategoryDetail />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/products/:id" element={<ProductDetail />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />

                  {/* Fallback to home */}
                  <Route path="*" element={<Home />} />
                </Routes>
              </main>
              <Footer />
            </div>
          }
        />
      </Routes>
    </CartProvider>
  );
}