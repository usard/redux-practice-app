import React from "react";
import { ChevronDown, ChevronUp } from "../icons";
import { useDispatch } from "react-redux";
import {
  removeItem,
  increase,
  decrease,
  toggleCount,
} from "../features/cart/cartSlice";

const CartItem = ({ id, title, price, amount, img }) => {
  const dispatch = useDispatch();
  return (
    <article className="cart-item">
      <img src={img} alt="img_na" />
      <div>
        <h4>{title}</h4>
        <h4>price : {price}</h4>
        <button
          type="button"
          onClick={() => {
            dispatch(removeItem(id));
          }}
        >
          remove
        </button>
      </div>
      <div>
        <button
          className="amount-btn"
          onClick={() => dispatch(toggleCount({ id, type: "inc" }))}
        >
          <ChevronUp />
        </button>
        <p className="amount"> {amount}</p>
        <button
          className="amount-btn"
          onClick={() => dispatch(toggleCount({ id, type: "dec" }))}
        >
          <ChevronDown />
        </button>
      </div>
    </article>
  );
};

export default CartItem;
