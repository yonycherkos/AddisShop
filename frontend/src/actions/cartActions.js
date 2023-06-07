import axios from 'axios';
import { CART_ADD_ITEM } from '../constants/cartConstants';

export const addToCart = (id, qty) => async (dispath, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);

  dispath({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });

  const cartItems = JSON.stringify(getState().cart.cartItems);
  localStorage.setItem('cartItems', cartItems);
};
