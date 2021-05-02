import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Header from '../components/Header';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {Add_To_Cart, Remove_From_Cart} from '../store/action/CartAction';
import Swipeable from 'react-native-swipeable';
import LinearGradient from 'react-native-linear-gradient';

const Cart = props => {
  const cart = useSelector(state => state.cart);
  const {cartItems} = cart;
  const userSignin = useSelector(state => state.userSignin);
  const {userInfo} = userSignin;
  const [backGroundColor, setBackGraoundColor] = useState(false);
  const dispatch = useDispatch();

  const HeaderComponent = () => (
    <>
      <Header props={props} />
      <Text
        style={{
          color: '#620d05',
          marginBottom: 10,
          marginLeft: 10,
          fontWeight: 'bold',
          fontSize: 20,
          marginTop: -10,
        }}>
        Shopping Cart
      </Text>
    </>
  );

  useEffect(() => {
    if (cartItems === null || cartItems.length <= 0) {
      dispatch({type: 'CART_EMPTY'});
    }
  }, [dispatch, cartItems.length]);

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={backGroundColor ? '#e74b32' : 'transparent'}
        translucent={true}
        animated={true}
      />
      {cartItems === null || cartItems.length <= 0 ? (
        <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
          <Header props={props} />
          <Text
            style={{
              color: '#620d05',
              marginBottom: 10,
              marginLeft: 10,
              fontWeight: 'bold',
              fontSize: 20,
              marginTop: -10,
            }}>
            Shopping Cart
          </Text>
          <View style={{marginHorizontal: 10, marginTop: -10}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  color: '#620d05',
                  fontSize: 16,
                }}>
                Your donot have any item in cart
              </Text>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => props.navigation.navigate('Home')}>
                <Text style={{color: '#551a8b'}}> Go shopping</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor: '#fff',
          }}>
          <FlatList
            ListHeaderComponent={<HeaderComponent />}
            onScroll={({nativeEvent}) => {
              if (nativeEvent.contentOffset.y > 0) {
                setBackGraoundColor(true);
              } else {
                setBackGraoundColor(false);
              }
            }}
            data={cartItems}
            contentContainerStyle={{
              paddingBottom: 10,
            }}
            keyExtractor={item => item.product}
            renderItem={({item}) => (
              <Swipeable
                rightButtons={[
                  <TouchableOpacity
                    style={{
                      flex: 0.94,
                      justifyContent: 'center',
                      paddingLeft: 20,
                      backgroundColor: 'red',
                      marginTop: 8,
                      marginLeft: 7,
                      borderRadius: 5,
                      elevation: 5,
                    }}
                    activeOpacity={0.6}
                    onPress={() =>
                      Alert.alert(
                        'Remove Product',
                        'Are you sure you want to remove product ?',
                        [
                          {
                            text: 'Cancel',
                          },
                          {
                            text: 'OK',
                            onPress: () =>
                              dispatch(Remove_From_Cart(item.product)),
                          },
                        ],
                        {cancelable: false},
                      )
                    }>
                    <IonIcon name="trash-outline" size={35} color="#fff" />
                  </TouchableOpacity>,
                ]}>
                <View style={styles.cardView}>
                  <TouchableOpacity
                    onPress={() =>
                      props.navigation.navigate('Product', {
                        id: item.product,
                      })
                    }
                    activeOpacity={0.6}>
                    <View>
                      <Image
                        source={{uri: item.image}}
                        style={styles.cardImage}
                        resizeMode="contain"
                      />
                    </View>
                  </TouchableOpacity>
                  <View>
                    <TouchableOpacity
                      onPress={() =>
                        props.navigation.navigate('Product', {
                          id: item.product,
                        })
                      }
                      activeOpacity={0.6}>
                      <View>
                        <Text
                          style={{
                            fontSize: 17,
                            width: 200,
                            fontWeight: 'bold',
                            color: '#620d05',
                          }}
                          numberOfLines={2}>
                          {item.description}
                        </Text>
                      </View>
                    </TouchableOpacity>

                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: 10,
                      }}>
                      <View>
                        <TouchableOpacity
                          onPress={() =>
                            props.navigation.navigate('Product', {
                              id: item.product,
                            })
                          }
                          activeOpacity={0.6}>
                          <Text
                            style={{
                              fontSize: 18,
                              fontWeight: 'bold',
                              color: '#e74b32',
                            }}>
                            Rs. {item.price}
                          </Text>
                        </TouchableOpacity>
                      </View>

                      <View
                        style={{
                          fles: 1,
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginRight: 20,
                        }}>
                        <TouchableOpacity
                          onPress={() =>
                            dispatch(
                              Add_To_Cart(
                                item.product,
                                item.quantity <= 1 ? 1 : item.quantity - 1,
                                item.size,
                              ),
                            )
                          }>
                          <IonIcon name="remove-outline" size={20} />
                        </TouchableOpacity>
                        <TextInput
                          placeholder="quaantity"
                          keyboardType="numeric"
                          style={{
                            textAlign: 'center',
                            width: 40,
                          }}
                          defaultValue={String(item.quantity)}
                        />
                        <TouchableOpacity
                          onPress={() =>
                            dispatch(
                              Add_To_Cart(
                                item.product,
                                item.quantity + 1,
                                item.size,
                              ),
                            )
                          }>
                          <IonIcon name="add-outline" size={20} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </Swipeable>
            )}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-evenly',
              paddingHorizontal: 40,
              paddingVertical: 10,
              borderTopRightRadius: 5,
              borderTopLeftRadius: 5,
            }}>
            <View style={{flex: 1}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text style={{color: '#000'}}>Total:</Text>
                <Text style={{color: '#000', marginLeft: 15}}>
                  Rs. {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                </Text>
              </View>
            </View>

            <View style={{flex: 1}}>
              <TouchableOpacity
                style={{alignSelf: 'flex-end'}}
                activeOpacity={0.6}
                onPress={() => {
                  if (userInfo && userInfo.length <= 0) {
                    props.navigation.navigate('Login', {
                      location: 'Shipping',
                    });
                  } else {
                    props.navigation.navigate('Shipping');
                  }
                }}>
                <LinearGradient
                  colors={['#e74b32', '#ffb74d']}
                  start={{x: 0, y: 0.35}}
                  end={{x: 1, y: 0.5}}
                  style={{borderRadius: 5}}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 15,
                      paddingHorizontal: 20,
                      paddingVertical: 7,
                    }}>
                    Checkout
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  cardView: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
    elevation: 5,
    paddingVertical: 10,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  cardImage: {
    width: 100,
    height: 100,
  },
});

export default Cart;
