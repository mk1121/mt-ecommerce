import { BrowserRouter as Router, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";

import Footer from "./components/layout/Footer";

import ProductDetails from "./components/product/ProductDetails";
import Home from "./components/Home";
import Header from "./components/layout/Header";

// Cart Imports
import Shipping from "./components/cart/Shipping";
import Cart from "./components/cart/Cart";
import OrderSuccess from "./components/cart/OrderSuccess";
import Payment from "./components/cart/Payment";
import ConfirmOrder from "./components/cart/ConfirmOrder";

// Order Imports
import OrderDetails from "./components/order/OrderDetails";
import ListOrders from "./components/order/ListOrders";

// Auth or User imports
import Register from "./components/user/Register";
import Profile from "./components/user/Profile";
import Login from "./components/user/Login";
import UpdatePassword from "./components/user/UpdatePassword";
import ForgotPassword from "./components/user/ForgotPassword";
import NewPassword from "./components/user/NewPassword";
import UpdateProfile from "./components/user/UpdateProfile";

// Admin Imports
import ProductsList from "./components/admin/ProductsList";
import Dashboard from "./components/admin/Dashboard";
import UpdateProduct from "./components/admin/UpdateProduct";
import NewProduct from "./components/admin/NewProduct";
import ProcessOrder from "./components/admin/ProcessOrder";
import OrdersList from "./components/admin/OrdersList";
import UsersList from "./components/admin/UsersList";
import ProductReviews from "./components/admin/ProductReviews";
import UpdateUser from "./components/admin/UpdateUser";

import { loadUser } from "./actions/userActions";
import axios from "axios";
import { useSelector } from "react-redux";
import store from "./store";
import ProtectedRoute from "./components/route/ProtectedRoute";

// Payment
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");

  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);
  useEffect(() => {
    store.dispatch(loadUser());

    async function getStripApiKey() {
      const { data } = await axios.get("/api/v1/stripeapi");

      setStripeApiKey(data.stripeApiKey);
    }

    getStripApiKey();
  }, []);

  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container-fluid">
          <Route path="/" component={Home} exact />
          <Route path="/product/:id" component={ProductDetails} exact />
          <Route path="/search/:keyword" component={Home} />

          <Route path="/cart" component={Cart} exact />
          <ProtectedRoute path="/confirm" component={ConfirmOrder} exact />
          <ProtectedRoute path="/success" component={OrderSuccess} />
          <ProtectedRoute path="/shipping" component={Shipping} />
          {stripeApiKey && (
            <Elements stripe={loadStripe(stripeApiKey)}>
              <ProtectedRoute path="/payment" component={Payment} />
            </Elements>
          )}

          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/password/reset/:token" component={NewPassword} exact />
          <Route path="/password/forgot" component={ForgotPassword} exact />
          <ProtectedRoute path="/me/update" component={UpdateProfile} exact />
          <ProtectedRoute
            path="/password/update"
            component={UpdatePassword}
            exact
          />
          <ProtectedRoute path="/me" component={Profile} exact />

          <ProtectedRoute path="/order/:id" component={OrderDetails} exact />
          <ProtectedRoute path="/orders/me" component={ListOrders} exact />
        </div>

        <ProtectedRoute
          path="/admin/product"
          isAdmin={true}
          component={NewProduct}
          exact
        />
        <ProtectedRoute
          path="/dashboard"
          isAdmin={true}
          component={Dashboard}
          exact
        />
        <ProtectedRoute
          path="/admin/products"
          isAdmin={true}
          component={ProductsList}
          exact
        />
        <ProtectedRoute
          path="/admin/order/:id"
          isAdmin={true}
          component={ProcessOrder}
          exact
        />
        <ProtectedRoute
          path="/admin/product/:id"
          isAdmin={true}
          component={UpdateProduct}
          exact
        />
        <ProtectedRoute
          path="/admin/orders"
          isAdmin={true}
          component={OrdersList}
          exact
        />
        <ProtectedRoute
          path="/admin/users"
          isAdmin={true}
          component={UsersList}
          exact
        />
        <ProtectedRoute
          path="/admin/reviews"
          isAdmin={true}
          component={ProductReviews}
          exact
        />
        <ProtectedRoute
          path="/admin/user/:id"
          isAdmin={true}
          component={UpdateUser}
          exact
        />

        {!loading && (!isAuthenticated || user.role !== "admin") && <Footer />}
      </div>
    </Router>
  );
}

export default App;
