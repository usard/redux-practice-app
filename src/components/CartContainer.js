import React from "react";
import CartItem from "./CartItem";
import { useSelector, useDispatch } from "react-redux";
// import { clearCart } from "../features/cart/cartSlice";
import { openModal } from "../features/modal/modalSlice";

export const CartContainer = () => {
  const { cart_items, total_amount, isLoading } = useSelector(
    (store) => store.cart
  );

  const dispatch = useDispatch();
  if (isLoading) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );
  } else {
    return (
      <section>
        <header>
          <h2>Your Bag</h2>
        </header>
        <div>
          {cart_items.map((item) => {
            return <CartItem key={item.id} {...item} />;
          })}
        </div>
        <footer>
          <hr />
          <div className="cart-total">
            <h4>
              Total <span>${total_amount}</span>
            </h4>
          </div>
          <button
            type="button"
            className="clear-btn"
            onClick={() => {
              dispatch(openModal());
            }}
          >
            clear cart
          </button>
        </footer>
      </section>
    );
  }
};

export default CartContainer;
