import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import MessageBox from '../components/MessageBox';
import {Change_Stock} from '../store/action/FetchData';
import {CreateOrder} from '../store/action/OrderAction';

const PlaceOrder = props => {
  const cart = useSelector(state => state.cart);
  const {cartItems, shippingAddress} = cart;
  const orderCreate = useSelector(state => state.orderCreate);
  const {loading, success, error, order} = orderCreate;

  if (!shippingAddress.address) {
    props.navigation.navigate('Shipping');
  }

  const dispatch = useDispatch();

  const placeOrderHandler = () => {
    for (var i = 0; i < cartItems.length; i++) {
      dispatch(
        Change_Stock(
          cartItems[i].product,
          cartItems[i].quantity,
          cartItems[i].stock,
          cartItems[i].size,
        ),
      );
    }
    dispatch(CreateOrder({...cart, orderItems: cartItems}));
  };

  const toPrice = num => Number(num.toFixed(2));

  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0),
  );
  cart.shippingPrice = cart.itemsPrice >= 5000 ? toPrice(0) : toPrice(100);
  cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const HeaderComponent = () => (
    <View>
      <View style={styles.card}>
        <Text style={styles.heading}>Shipping</Text>
        <View>
          <View style={{flexDirection: 'row', marginBottom: 5}}>
            <Text style={styles.label}>Name:</Text>
            <Text>{cart.shippingAddress.fullname}</Text>
          </View>

          <View style={{flexDirection: 'row', marginBottom: 5}}>
            <Text style={styles.label}>Mobile Number:</Text>
            <Text>{cart.shippingAddress.number}</Text>
          </View>

          <View style={{flexDirection: 'row', marginBottom: 5}}>
            <Text style={styles.label}>Address:</Text>
            <Text style={{width: '80%'}}>
              {cart.shippingAddress.address}, {cart.shippingAddress.city},{' '}
              {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.heading}>Payment</Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.label}>Method:</Text>
          <Text>Credit Card</Text>
        </View>
      </View>

      <View
        style={{
          backgroundColor: '#fff',
          marginTop: 10,
          paddingTop: 30,
          paddingHorizontal: 10,
          paddingBottom: 10,
        }}>
        <Text style={styles.heading}>Order Items</Text>
      </View>
    </View>
  );

  const FooterComponent = () => (
    <View>
      <View style={styles.card}>
        <Text style={styles.heading}>Order Summary</Text>
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 5,
            }}>
            <Text
              style={{
                fontSize: 17,
                color: '#620d05',
                fontWeight: 'bold',
                marginBottom: 5,
              }}>
              Item:{' '}
            </Text>
            <Text style={{color: '#620d05', fontWeight: 'bold'}}>
              Rs. {cart.itemsPrice.toFixed(2)}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 5,
            }}>
            <Text
              style={{
                fontSize: 17,
                color: '#620d05',
                fontWeight: 'bold',
                marginBottom: 5,
              }}>
              Shipping:{' '}
            </Text>
            <Text style={{color: '#620d05', fontWeight: 'bold'}}>
              Rs. {cart.shippingPrice.toFixed(2)}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 5,
            }}>
            <Text
              style={{
                fontSize: 17,
                color: '#620d05',
                fontWeight: 'bold',
                marginBottom: 5,
              }}>
              Tax:{' '}
            </Text>
            <Text style={{color: '#620d05', fontWeight: 'bold'}}>
              Rs. {cart.taxPrice.toFixed(2)}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 5,
            }}>
            <Text
              style={{
                fontSize: 20,
                color: '#620d05',
                fontWeight: 'bold',
                marginBottom: 5,
              }}>
              Order Total:{' '}
            </Text>
            <Text style={{color: '#620d05', fontWeight: 'bold'}}>
              Rs. {cart.totalPrice.toFixed(2)}
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity activeOpacity={0.5} onPress={placeOrderHandler}>
        <LinearGradient
          colors={['#e74b32', '#ffb74d']}
          start={{x: 0, y: 0.35}}
          end={{x: 1, y: 0.5}}
          style={{borderRadius: 5, marginBottom: 10, marginHorizontal: 10}}>
          <Text
            style={{
              textAlign: 'center',
              color: '#fff',
              fontSize: 15,
              paddingVertical: 10,
            }}>
            Place Order
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );

  useEffect(() => {
    if (success) {
      props.navigation.navigate('OrderDetails', {
        id: order._id,
      });
      dispatch({type: 'ORDER_CREATE_RESET'});
    }
  }, [dispatch, props.navigation, success]);

  return (
    <SafeAreaView style={{flex: 1}}>
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#e74b32" />
        </View>
      ) : error ? (
        <MessageBox>{error}</MessageBox>
      ) : cartItems ? (
        <FlatList
          ListHeaderComponent={<HeaderComponent />}
          data={cartItems}
          keyExtractor={item => item.product}
          renderItem={({item}) => (
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() =>
                props.navigation.navigate('Product', {
                  id: item.product,
                })
              }>
              <View
                style={{
                  backgroundColor: '#fff',
                  paddingBottom: 20,
                  paddingHorizontal: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Image
                    style={{width: 100, height: 90}}
                    source={{uri: item.image}}
                    resizeMode="contain"
                  />
                  <View style={{width: '65%'}}>
                    <Text
                      numberOfLines={2}
                      style={{color: '#620d05', fontWeight: 'bold'}}>
                      {item.description}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 10,
                      }}>
                      <View style={{flexDirection: 'row'}}>
                        <Text
                          numberOfLines={2}
                          style={{color: '#620d05', fontWeight: 'bold'}}>
                          Rs. {item.price}{' '}
                        </Text>
                        <Text style={{color: '#620d05'}}>
                          x {item.quantity}
                        </Text>
                      </View>
                      {item.size !== 'wallete' ? (
                        <View style={{flexDirection: 'row'}}>
                          <Text style={styles.label}>Size:-</Text>
                          <Text>{item.size}</Text>
                        </View>
                      ) : null}
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
          ListFooterComponent={<FooterComponent />}
        />
      ) : null}
    </SafeAreaView>
  );
};

export default PlaceOrder;

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 10,
    paddingVertical: 30,
    backgroundColor: '#fff',
    marginTop: 10,
  },
  heading: {
    fontSize: 18,
    color: '#620d05',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  label: {
    marginRight: 5,
    color: '#620d05',
    fontWeight: 'bold',
  },
});
