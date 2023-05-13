import React from "react";
import "./CartItem.css";
import { Link } from "react-router-dom";

const CartItem = ({ item, deleteCartItem }) => {
  return (
    <div className="CartItemCard">
      <img src={item.image} alt="ssa" />
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`Price: ${item.price}`}</span>
        <p
          onClick={() => {
            deleteCartItem(item.product);
          }}
        >
          Remove
        </p>
      </div>
    </div>
  );
};

export default CartItem;
