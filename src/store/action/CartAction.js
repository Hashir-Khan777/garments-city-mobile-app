import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Add_To_Cart = (productId, quantity, size) => async (
  dispatch,
  getState,
) => {
  try {
    const {data} = await Axios.get(
      `https://thegarmentscity.herokuapp.com/api/products/${productId}`,
    );
    dispatch({
      type: 'CART_ADD_ITEM',
      payload: {
        description: data.description,
        image: data.image,
        price: data.price,
        stock:
          data.sizes &&
          data.sizes.find(x => x.size === size) &&
          data.sizes.find(x => x.size === size).stock,
        product: data._id,
        quantity,
        size,
      },
    });
    await AsyncStorage.setItem(
      'cartItems',
      JSON.stringify(getState().cart.cartItems),
    );
  } catch (err) {
    console.log(err.message);
  }
};

const Remove_From_Cart = productId => async (dispatch, getState) => {
  dispatch({type: 'CART_REMOVE_ITEM', payload: productId});
  await AsyncStorage.setItem(
    'cartItems',
    JSON.stringify(getState().cart.cartItems),
  );
};

const saveShippingAddress = data => async dispatch => {
  dispatch({type: 'CART_SAVE_SHIPPING_ADRRESS', payload: data});
  await AsyncStorage.setItem('shippingAddress', JSON.stringify(data));
};

export {Add_To_Cart, Remove_From_Cart, saveShippingAddress};
