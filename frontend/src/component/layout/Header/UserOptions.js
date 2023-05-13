import React, { Fragment, useState } from "react";
import "./Header.css";
import { SpeedDial, SpeedDialAction, Backdrop } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import {
  Dashboard,
  Person,
  ExitToApp,
  ListAlt,
  ShoppingCart,
} from "@mui/icons-material";
import { logout } from "../../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";

const UserOptions = ({ user }) => {
  const { cartItems } = useSelector((state) => state.cart);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();
  const options = [
    { icon: <ListAlt />, name: "Order", fun: orders },
    { icon: <Person />, name: "Profile", fun: account },
    {
      icon: (
        <ShoppingCart
          style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
        />
      ),
      name: `Cart(${cartItems.length})`,
      fun: cart,
    },
    { icon: <ExitToApp />, name: "Logout", fun: logoutUser },
  ];

  if (user.role === "admin") {
    options.unshift({ icon: <Dashboard />, name: "Dashboard", fun: dashboard });
  }

  function dashboard() {
    navigate("/admin/dashboard");
  }
  function orders() {
    navigate("/orders");
  }
  function account() {
    navigate("/account");
  }
  function logoutUser() {
    dispatch(logout());
    alert.success("Logout Successfully");
  }
  function cart() {
    navigate("/Cart");
  }

  return (
    <Fragment>
      <Backdrop open={open} style={{ zIndex: 10 }} />
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        style={{ zIndex: "11" }}
        open={open}
        direction="down"
        className="speedDial"
        icon={
          <img
            className="SpeedDialIcon"
            src={user.avatar.url ? user.avatar.url : "/Profile.png"}
            alt="Profile"
          />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.fun}
          />
        ))}
      </SpeedDial>
    </Fragment>
  );
};

export default UserOptions;
