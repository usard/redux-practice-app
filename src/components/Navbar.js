import React from "react";
import { useSelector } from "react-redux";
import { CartIcon, Testing } from "../icons";
const Navbar = () => {
  const { total_amount, total_items } = useSelector((obj) => obj.cart);
  return (
    <nav>
      <Testing></Testing>
      <div className="nav-center">
        <h3>redux toolkit </h3>
        <div className="nav-container">
          <CartIcon />
          <div className="amount-container">
            <p className="total-amount">{total_items} </p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
