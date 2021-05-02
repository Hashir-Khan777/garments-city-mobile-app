import AsyncStorage from '@react-native-async-storage/async-storage';

const getData = async () => {
  try {
    const data = await AsyncStorage.getItem('cartItems');
    if (data !== null) {
      CART_INITIAL_STATE.cartItems = JSON.parse(data);
    } else {
      CART_INITIAL_STATE.cartItems = [];
    }

    const shippingAddress = await AsyncStorage.getItem('shippingAddress');
    if (shippingAddress !== null) {
      CART_INITIAL_STATE.shippingAddress = JSON.parse(shippingAddress);
    } else {
      CART_INITIAL_STATE.shippingAddress = [];
    }
  } catch (err) {
    console.log(err.message);
  }
};

const CART_INITIAL_STATE = {
  cartItems: [],
  shippingAddress: [],
};

getData();

const cartReducer = (state = CART_INITIAL_STATE, action) => {
  switch (action.type) {
    case 'CART_ADD_ITEM':
      const item = action.payload;
      const existItem = state.cartItems.find(x => x.product === item.product);
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(x =>
            x.product === existItem.product ? item : x,
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case 'CART_REMOVE_ITEM':
      return {
        ...state,
        cartItems: state.cartItems.filter(x => x.product !== action.payload),
      };

    case 'CART_SAVE_SHIPPING_ADRRESS':
      return {
        ...state,
        shippingAddress: action.payload,
      };

    case 'CART_EMPTY':
      return {
        ...state,
        cartItems: [],
      };

    default:
      return state;
  }
};

export {cartReducer};
