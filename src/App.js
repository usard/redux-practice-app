import CartContainer from "./components/CartContainer";
import Navbar from "./components/Navbar";
import Modal from "./components/Modal";
import { calculateTotal, getCartItems } from "./features/cart/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const { cart_items } = useSelector((store) => store.cart);
  const { isModalOpen } = useSelector((store) => store.modal);
  // console.log(useSelector((store) => store.modal));
  useEffect(() => {
    dispatch(calculateTotal());
  }, [cart_items]);

  useEffect(() => {
    dispatch(getCartItems());
  }, []);

  console.log("app re-rendered");
  return (
    <>
      {isModalOpen && <Modal />}
      <Navbar />
      <CartContainer />
    </>
  );
}
export default App;
