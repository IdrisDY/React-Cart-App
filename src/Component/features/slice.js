import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import cartItems from '../../cartItems';
import axios from 'axios'
const url = 'https://course-api.com/react-useReducer-cart-project';

const initialState = {
  cartItems: [],
  amount: 1,
  total: 0,
  isLoading: true,
};

export const getCartItems = 
createAsyncThunk('cart/getCartItems', async(name,thunkAPI) => {
  try {
    console.log(name);
    console.log(thunkAPI);
    console.log(thunkAPI.getState());
    // thunkAPI.dispatch(openModal());
    const resp = await axios(url);

    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue('something went wrong');
  }
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers:{ 
    clearCart:(state) => { state.cartItems= []},

    removeItem: (state, action) => {
      console.log(action)
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    toggleChange: (state, { payload }) => {
      console.log(payload)
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
     payload.type === 'increase'? cartItem.amount = cartItem.amount + 1:  cartItem.amount = cartItem.amount - 1;
     ;
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.amount = amount;
      state.total = total.toFixed(2);
    },
  },
  extraReducers: {
    [getCartItems.pending]: (state) => {
      state.isLoading = true;
    },
    [getCartItems.fulfilled]: (state, action) => {
      console.log(action);
      state.isLoading = false;
      state.cartItems = action.payload;
    },
    [getCartItems.rejected]: (state) => {
      state.isLoading = false;
    },
  },

});

export const { clearCart, removeItem, toggleChange, decrease, calculateTotals } =
  cartSlice.actions;
  export default cartSlice.reducer;