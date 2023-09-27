import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import cartItems from "../../cartItems";
const initialState = {
  cart_items: [],
  total_amount: 0,
  total_items: 0,
  isLoading: true,
  isError: false,
};
const url = "https://course-api.com/react-useReducer-cart-project";
// export const getCartItems = createAsyncThunk("cart/getCartItems", async () => {
//   fetch(url)
//     .then((resp) => resp.json())
//     .catch((error) => console.log("fetch :", error));
// });

export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  async (name, thunkAPI) => {
    try {
      // console.log(name);
      // console.log(thunkAPI);
      // console.log(thunkAPI.getState());
      // thunkAPI.dispatch(openModal());
      const resp = await axios(url);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cart_items = [];
    },
    removeItem: (state, action) => {
      const id = action.payload;
      state.cart_items = [...state.cart_items].filter((item) => item.id !== id);
      console.log(state.cart_items);
    },
    // increase: (state, action) => {
    //   const id = action.payload;
    //   state.cart_items.find((item) => item.id === id).amount += 1;
    // },
    // decrease: (state, action) => {
    //   const id = action.payload;
    //   state.cart_items.find((item) => item.id === id).amount -= 1;
    // },
    toggleCount: (state, action) => {
      const { id, type } = action.payload;
      if (type === "inc") {
        state.cart_items.find((item) => item.id === id).amount += 1;
        state.total_items += 1;
      } else {
        state.cart_items.find((item) => item.id === id).amount -= 1;
        state.total_items -= 1;
      }
    },
    calculateTotal: (state) => {
      const prices = state?.cart_items?.map((item) => item.price * item.amount);
      console.log("prices :", prices);
      state.total_amount = prices?.reduce((x, y) => {
        return x + y;
      }, 0);
      console.log(state.total_amount);
    },
  },
  // extraReducers: {
  //   [getCartItems.pending]: (state) => {
  //     state.isLoading = true;
  //   },
  //   [getCartItems.fulfilled]: (state, action) => {
  //     state.isLoading = false;
  //     state.cart_items = action.payload;
  //   },
  //   [getCartItems.rejected]: (state) => {
  //     state.isLoading = false;
  //     state.isError = true;
  //   },
  // },
  extraReducers: (builder) => {
    builder
      .addCase(getCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        // console.log(action);
        state.isLoading = false;
        state.cart_items = action.payload;
      })
      .addCase(getCartItems.rejected, (state, action) => {
        console.log(action);
        state.isLoading = false;
      });
  },
});

console.log("cart slice :", cartSlice);
export const {
  clearCart,
  removeItem,
  increase,
  decrease,
  toggleCount,
  calculateTotal,
} = cartSlice.actions;
// console.log(typeof cartSlice.actions.clearCart);
export default cartSlice.reducer;
