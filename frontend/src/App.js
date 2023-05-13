import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Header from "./component/layout/Header/Header.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import WebFont from "webfontloader";
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/Home/Home.js";
import "./App.css";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js";
import Search from "./component/Product/Search.js";
import LoginSignUp from "./component/User/LoginSignUp.js";
import { loadUser } from "./actions/userAction.js";
import { useDispatch, useSelector } from "react-redux";
import UserOptions from "./component/layout/Header/UserOptions.js";
import Profile from "./component/User/Profile.js";
import { Navigate } from "react-router-dom";
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import Payment from "./component/Cart/Payment.js";
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import MyOrders from "./component/Order/MyOrders.js";
import OrderDetails from "./component/Order/OrderDetails.js";
import Dashboard from "./component/Admin/Dashboard.js";
import ProductList from "./component/Admin/ProductList.js";
import NewProduct from "./component/Admin/NewProduct.js";
import UpdateProduct from "./component/Admin/UpdateProduct.js";
import OrderList from "./component/Admin/OrderList.js";
import ProcessOrder from "./component/Admin/ProcessOrder.js";
import UserList from "./component/Admin/UserList.js";
import UpdateUser from "./component/Admin/UpdateUser.js";
import ProductReviews from "./component/Admin/ProductReviews.js";
import NotFound from "./component/layout/NotFound/NotFound.js";

// const proxy = "https://backend-y4ka-git-main-subham-coder-24.vercel.app";



const proxy = "";
function App() {
  const dispatch = useDispatch();

  const { isAuthenticated, user, loading } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get(`${proxy}/api/v1/stripeapikey`);
    setStripeApiKey(data.StripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    dispatch(loadUser());
    getStripeApiKey();
  }, [dispatch]);
  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}

      <Routes>
        <Route extact path="/" element={<Home />} />
        <Route extact path="/product/:id" element={<ProductDetails />} />
        <Route extact path="/products" element={<Products />} />
        <Route extact path="/search/:keyword" element={<Products />} />
        <Route extact path="/Search" element={<Search />} />
        <Route
          extact
          path="/account"
          element={isAuthenticated ? <Profile /> : <Navigate to="/login" />}
        />
        <Route
          extact
          path="/me/update"
          element={
            isAuthenticated ? <UpdateProfile /> : <Navigate to="/login" />
          }
        />
        <Route
          extact
          path="/password/update"
          element={
            isAuthenticated ? <UpdatePassword /> : <Navigate to="/login" />
          }
        />
        <Route extact path="/password/forgot" element={<ForgotPassword />} />
        <Route
          extact
          path="/password/reset/:token"
          element={<ResetPassword />}
        />
        <Route extact path="/login" element={<LoginSignUp />} />
        <Route extact path="/cart" element={<Cart />} />
        <Route
          extact
          path="/shipping"
          element={isAuthenticated ? <Shipping /> : <Navigate to="/login" />}
        />
        <Route
          extact
          path="/order/confirm"
          element={
            isAuthenticated ? <ConfirmOrder /> : <Navigate to="/login" />
          }
        />

        {stripeApiKey && (
          <Route
            extact
            path="/process/payment"
            element={
              isAuthenticated ? (
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <Payment />
                </Elements>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        )}

        <Route
          extact
          path="/success"
          element={
            isAuthenticated ? <OrderSuccess /> : <Navigate to="/login" />
          }
        />
        <Route
          extact
          path="/orders"
          element={
            loading === false &&
            (isAuthenticated ? <MyOrders /> : <Navigate to="/login" />)
          }
        />
        <Route
          extact
          path="/order/:id"
          element={
            isAuthenticated ? <OrderDetails /> : <Navigate to="/login" />
          }
        />
        <Route
          extact
          path="/admin/dashboard"
          element={
            //bad me add karunga
            loading === false &&
            (isAuthenticated && user.role === "admin" ? (
              <Dashboard />
            ) : (
              <Navigate to="/login" />
            ))
          }
        />
        <Route
          extact
          path="/admin/products"
          element={
            //bad me add karunga
            loading === false &&
            (isAuthenticated && user.role === "admin" ? (
              <ProductList />
            ) : (
              <Navigate to="/login" />
            ))
          }
        />
        <Route
          extact
          path="/admin/product"
          element={
            loading === false &&
            (isAuthenticated && user.role === "admin" ? (
              <NewProduct />
            ) : (
              <Navigate to="/login" />
            ))
          }
        />
        <Route
          extact
          path="/admin/product/:id"
          element={
            loading === false &&
            (isAuthenticated && user.role === "admin" ? (
              <UpdateProduct />
            ) : (
              <Navigate to="/login" />
            ))
          }
        />
        <Route
          extact
          path="/admin/orders"
          element={
            loading === false &&
            (isAuthenticated && user.role === "admin" ? (
              <OrderList />
            ) : (
              <Navigate to="/login" />
            ))
          }
        />
        <Route
          extact
          path="/admin/order/:id"
          element={
            loading === false &&
            (isAuthenticated && user.role === "admin" ? (
              <ProcessOrder />
            ) : (
              <Navigate to="/login" />
            ))
          }
        />
        <Route
          extact
          path="/admin/users"
          element={
            loading === false &&
            (isAuthenticated && user.role === "admin" ? (
              <UserList />
            ) : (
              <Navigate to="/login" />
            ))
          }
        />
        <Route
          extact
          path="/admin/user/:id"
          element={
            loading === false &&
            (isAuthenticated && user.role === "admin" ? (
              <UpdateUser />
            ) : (
              <Navigate to="/login" />
            ))
          }
        />
        <Route
          extact
          path="/admin/reviews"
          element={
            loading === false &&
            (isAuthenticated && user.role === "admin" ? (
              <ProductReviews />
            ) : (
              <Navigate to="/login" />
            ))
          }
        />
        <Route
          path="*"
          element={
            window.location.pathname === "/process/payment" ? null : (
              <NotFound />
            )
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}
export default App;
