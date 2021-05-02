import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import MessageBox from '../components/MessageBox';
import {OrderDetails} from '../store/action/OrderAction';
import DatePicker from 'react-native-datepicker';
import IonIcon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';

const OrderScreen = ({route, navigation}) => {
  const orderDetailsReducer = useSelector(state => state.orderDetailsReducer);
  const {order, loading, error} = orderDetailsReducer;
  const userSignin = useSelector(state => state.userSignin);
  const {userInfo} = userSignin;
  const [payModal, setpayModal] = useState(false);
  const [date, setDate] = useState('');

  const dispatch = useDispatch();

  const PayModal = () => (
    <Modal visible={payModal} transparent={true} animationType="fade">
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            height: '70%',
            backgroundColor: '#fff',
            width: '90%',
            borderRadius: 4,
            paddingVertical: 30,
          }}>
          <ScrollView>
            <TouchableOpacity
              onPress={() => setpayModal(false)}
              style={{alignSelf: 'flex-end', marginRight: 20}}
              activeOpacity={0.6}>
              <IonIcon name="close-circle-outline" size={25} />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 17,
                color: '#620d05',
                fontWeight: 'bold',
                marginHorizontal: 15,
                marginBottom: 15,
              }}>
              Billing Info
            </Text>
            {error ? (
              <Text
                style={{
                  color: '#a02020',
                  fontSize: 16,
                  textAlign: 'center',
                  backgroundColor: '#ffe0e0',
                  paddingVertical: 10,
                  paddingHorizontal: 30,
                  borderRadius: 10,
                  alignSelf: 'center',
                }}>
                {error}
              </Text>
            ) : null}
            <View style={{marginHorizontal: 20}}>
              <View style={styles.inputView}>
                <Text style={styles.labels}>Name On Card:</Text>
                <TextInput
                  placeholder="Full name"
                  keyboardType="default"
                  style={styles.input}
                />
              </View>
              <View style={styles.inputView}>
                <Text style={styles.labels}>Card Number:</Text>
                <TextInput
                  placeholder="Card number"
                  keyboardType="numeric"
                  style={styles.input}
                />
              </View>
              <View style={styles.inputView}>
                <Text style={styles.labels}>Expiration Date:</Text>
                <DatePicker
                  style={{width: '100%'}}
                  mode="date"
                  date={date}
                  placeholder="select date"
                  format="MM-YYYY"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    dateIcon: {
                      position: 'absolute',
                      left: 0,
                      top: 4,
                      marginLeft: 0,
                    },
                    dateInput: {
                      marginLeft: 36,
                    },
                  }}
                  onDateChange={date => {
                    setDate(date);
                  }}
                />
              </View>
              <View style={styles.inputView}>
                <Text style={styles.labels}>CVV:</Text>
                <TextInput
                  placeholder="CVV"
                  keyboardType="numeric"
                  style={styles.input}
                />
              </View>
              <TouchableOpacity activeOpacity={0.5}>
                <LinearGradient
                  colors={['#e74b32', '#ffb74d']}
                  start={{x: 0, y: 0.35}}
                  end={{x: 1, y: 0.5}}
                  style={{borderRadius: 5, marginBottom: 10}}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: '#fff',
                      fontSize: 15,
                      paddingVertical: 10,
                    }}>
                    Pay
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  const HeaderComponent = () => (
    <View>
      <View style={styles.card}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.heading}>Order:- </Text>
          <Text
            style={{
              fontSize: 16,
              color: '#620d05',
            }}>
            #{order._id}
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.heading}>Shipping</Text>
        <View>
          <View style={{flexDirection: 'row', marginBottom: 5}}>
            <Text style={styles.label}>Name:</Text>
            <Text>{order.shippingAddress.fullname}</Text>
          </View>

          <View style={{flexDirection: 'row', marginBottom: 5}}>
            <Text style={styles.label}>Mobile Number:</Text>
            <Text>{order.shippingAddress.number}</Text>
          </View>

          <View style={{flexDirection: 'row', marginBottom: 5}}>
            <Text style={styles.label}>Email Address:</Text>
            <Text>{userInfo ? userInfo.email : null}</Text>
          </View>

          <View style={{flexDirection: 'row', marginBottom: 5}}>
            <Text style={styles.label}>Address:</Text>
            <Text style={{width: '80%'}}>
              {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
              {order.shippingAddress.postalCode},{' '}
              {order.shippingAddress.country}
            </Text>
          </View>

          <View>
            {order.isDelivered ? (
              order ? (
                <View
                  style={{
                    backgroundColor: '#e0ffe0',
                    padding: 10,
                    marginVertical: 10,
                  }}>
                  <Text style={{color: '#20a020'}}>
                    Delivered At:{' '}
                    {moment(order.deliveredAt).format('MMMM Do YYYY - h:mm:ss')}
                  </Text>
                </View>
              ) : null
            ) : (
              <Text
                style={{
                  color: '#a02020',
                  backgroundColor: '#ffe0e0',
                  padding: 10,
                  marginVertical: 10,
                }}>
                Not Delivered
              </Text>
            )}
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.heading}>Payment</Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.label}>Method:</Text>
          <Text>Credit Card</Text>
        </View>
        <View>
          {order.isPaid ? (
            order ? (
              <View
                style={{
                  backgroundColor: '#e0ffe0',
                  padding: 10,
                  marginVertical: 10,
                }}>
                <Text style={{color: '#20a020'}}>
                  Paid At:{' '}
                  {moment(order.paidAt).format('MMMM Do YYYY - h:mm:ss')}
                </Text>
              </View>
            ) : null
          ) : (
            <Text
              style={{
                color: '#a02020',
                backgroundColor: '#ffe0e0',
                padding: 10,
                marginVertical: 10,
              }}>
              Not Paid
            </Text>
          )}
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
              Rs. {order.itemsPrice.toFixed(2)}
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
              Rs. {order.shippingPrice.toFixed(2)}
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
              Rs. {order.taxPrice.toFixed(2)}
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
              Rs. {order.totalPrice.toFixed(2)}
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity onPress={() => setpayModal(true)} activeOpacity={0.5}>
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
            Credit Card
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );

  useEffect(() => {
    dispatch(OrderDetails(route.params.id));
  }, [dispatch, route.params]);

  return (
    <SafeAreaView style={{flex: 1}}>
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#e74b32" />
        </View>
      ) : error ? (
        <MessageBox>{error}</MessageBox>
      ) : order.orderItems ? (
        <FlatList
          ListHeaderComponent={<HeaderComponent />}
          data={order.orderItems}
          keyExtractor={item => item.product}
          renderItem={({item}) => (
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() =>
                navigation.navigate('Product', {
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
      <PayModal />
    </SafeAreaView>
  );
};

export default OrderScreen;

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
  input: {
    padding: 0,
    borderWidth: 1,
    borderColor: '#e74b32',
    padding: 5,
    marginTop: 5,
    borderRadius: 4,
  },
  inputView: {
    marginBottom: 10,
  },
  labels: {
    color: '#620d05',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
