import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserProfile from "./pages/user/UserProfile";
import UserOrders from "./pages/user/UserOrders";
import UserCartDetails from "./pages/user/UserCartDetails";
import UserOrderDetails from "./pages/user/UserOrderDetails";
import ProtectedRoutes from "./components/ProtectedRoutes";
import AdminUser from "./pages/admin/AdminUser";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminOrderDetails from "./pages/admin/AdminOrderDetails";
import RoutesWithUserChat from "./components/user/RoutesWithUserChat";
import UserSidebar from "./components/user/UserSidebar";
import UserChangePassword from "./pages/user/UserChangePassword";
import AdminSidebar from "./components/admin/AdminSidebar";
import AdminEditProduct from "./pages/admin/AdminEditProduct";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from "./utils/ScrollToTop";
import UserOrderConfirmation from "./pages/user/UserOrderConfirmation";
import MainLayout from "./components/layout/MainLayout";
import AdminCreateProduct from "./pages/admin/AdminCreateProduct";
import AdminCategory from "./pages/admin/AdminCategory";
import Cart from "./pages/Cart";
import AdminOrders from "./pages/admin/AdminOrders";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Admin Routes - No Header/Footer */}
          <Route element={<ProtectedRoutes admin={true} />}>
            <Route
              path="/admin/*"
              element={
                <Routes>
                  <Route
                    path="/users"
                    element={
                      <AdminSidebar>
                        <AdminUser />
                      </AdminSidebar>
                    }
                  />

                  <Route
                    path="/categories"
                    element={
                      <AdminSidebar>
                        <AdminCategory />
                      </AdminSidebar>
                    }
                  />
                  <Route
                    path="/products"
                    element={
                      <AdminSidebar>
                        <AdminProducts />
                      </AdminSidebar>
                    }
                  />
                  <Route
                    path="/create-product"
                    element={
                      <AdminSidebar>
                        <AdminCreateProduct />
                      </AdminSidebar>
                    }
                  />
                  <Route
                    path="/edit-product/:productId"
                    element={
                      <AdminSidebar>
                        <AdminEditProduct />
                      </AdminSidebar>
                    }
                  />
                  <Route
                    path="/orders"
                    element={
                      <AdminSidebar>
                        <AdminOrders />
                      </AdminSidebar>
                    }
                  />
                  <Route
                    path="/order-detail/:orderId"
                    element={
                      <AdminSidebar>
                        <AdminOrderDetails />
                      </AdminSidebar>
                    }
                  />
                  <Route
                    path="/dashboard"
                    element={
                      <AdminSidebar>
                        <AdminDashboard />
                      </AdminSidebar>
                    }
                  />
                </Routes>
              }
            />
          </Route>
          <Route
            element={
              <MainLayout>
                <RoutesWithUserChat />
              </MainLayout>
            }
          >
            {/* public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/product-list" element={<ProductList />} />
            <Route
              path="/product-list/category/:categoryName"
              element={<ProductList />}
            />
            <Route
              path="/product-details/:productId"
              element={<ProductDetails />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element="Page not exists 404" />

            {/* user routes */}
            <Route element={<ProtectedRoutes admin={false} />}>
              <Route
                path="/user/profile"
                element={
                  <UserSidebar>
                    <UserProfile />
                  </UserSidebar>
                }
              />
              <Route
                path="/user/change-password"
                element={
                  <UserSidebar>
                    <UserChangePassword />
                  </UserSidebar>
                }
              />
              <Route
                path="/user/my-orders"
                element={
                  <UserSidebar>
                    <UserOrders />
                  </UserSidebar>
                }
              />
              <Route path="/user/cart-details" element={<UserCartDetails />} />
              <Route
                path="/user/order-details/:orderId"
                element={
                  <UserSidebar>
                    <UserOrderDetails />
                  </UserSidebar>
                }
              />
              <Route
                path="/user/order-confirmation/:orderId"
                element={<UserOrderConfirmation />}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
