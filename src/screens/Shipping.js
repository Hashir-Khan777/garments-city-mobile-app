import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import Header from '../components/Header';
import {saveShippingAddress} from '../store/action/CartAction';

const Shipping = props => {
  const cart = useSelector(state => state.cart);
  const {shippingAddress} = cart;
  const userRegister = useSelector(state => state.userRegister);
  const {userInfo} = userRegister;

  const [fullname, setFullName] = useState(
    shippingAddress.fullname ? shippingAddress.fullname : '',
  );
  const [number, setNumber] = useState(
    shippingAddress.number ? shippingAddress.number : '',
  );
  const [address, setAddress] = useState(
    shippingAddress.address ? shippingAddress.address : '',
  );
  const [city, setCity] = useState(
    shippingAddress.city ? shippingAddress.city : '',
  );
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode ? shippingAddress.postalCode : '',
  );
  const [country, setCountry] = useState(
    shippingAddress.country ? shippingAddress.country : '',
  );
  const [backGroundColor, setBackGraoundColor] = useState(false);
  const [error, seterror] = useState('');

  const dispatch = useDispatch();

  const shippingSubmitHandler = () => {
    if (!fullname) {
      seterror('fullname is required');
    } else if (!number) {
      seterror('mobile number is required');
    } else if (!address) {
      seterror('address is required');
    } else if (!city) {
      seterror('city is required');
    } else if (!postalCode) {
      seterror('postal code is required');
    } else if (!country) {
      seterror('country is required');
    } else {
      seterror('');
    }
    if (fullname && number && address && city && postalCode && country) {
      dispatch(
        saveShippingAddress({
          fullname,
          number,
          address,
          city,
          postalCode,
          country,
        }),
      );
      props.navigation.navigate('PlaceOrder');
    }
  };

  useEffect(() => {
    if (!userInfo && !userInfo.token) {
      props.navigation.navigate('Login', {
        location: 'Shipping',
      });
    }
  }, [props.navigation, userInfo]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={backGroundColor ? '#e74b32' : 'transparent'}
        translucent={true}
        animated={true}
      />
      <ScrollView
        onScroll={({nativeEvent}) => {
          if (nativeEvent.contentOffset.y > 0) {
            setBackGraoundColor(true);
          } else {
            setBackGraoundColor(false);
          }
        }}>
        <Header props={props} />
        <View>
          <Text
            style={{
              fontSize: 17,
              color: '#620d05',
              fontWeight: 'bold',
              marginHorizontal: 15,
              marginBottom: 15,
              marginTop: -20,
            }}>
            Shipping Address
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
              <Text style={styles.labels}>Full Name:</Text>
              <TextInput
                placeholder="Enter full name"
                keyboardType="default"
                style={styles.input}
                defaultValue={fullname}
                onChangeText={e => setFullName(e)}
              />
            </View>
            <View style={styles.inputView}>
              <Text style={styles.labels}>Mobile Number:</Text>
              <TextInput
                defaultValue={number}
                onChangeText={e => setNumber(e)}
                placeholder="Enter mobile number"
                keyboardType="phone-pad"
                style={styles.input}
              />
            </View>
            <View style={styles.inputView}>
              <Text style={styles.labels}>Address:</Text>
              <TextInput
                defaultValue={address}
                onChangeText={e => setAddress(e)}
                placeholder="Enter address"
                keyboardType="email-address"
                style={styles.input}
              />
            </View>
            <View style={styles.inputView}>
              <Text style={styles.labels}>City:</Text>
              <TextInput
                defaultValue={city}
                onChangeText={e => setCity(e)}
                placeholder="Enter city"
                style={styles.input}
                keyboardType="default"
              />
            </View>
            <View style={styles.inputView}>
              <Text style={styles.labels}>Postal Code:</Text>
              <TextInput
                defaultValue={postalCode}
                onChangeText={e => setPostalCode(e)}
                placeholder="Enter postal code"
                style={styles.input}
                keyboardType="number-pad"
              />
            </View>
            <View style={styles.inputView}>
              <Text style={styles.labels}>Country:</Text>
              <TextInput
                defaultValue={country}
                onChangeText={e => setCountry(e)}
                placeholder="Enter country"
                style={styles.input}
              />
            </View>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={shippingSubmitHandler}>
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
                  Continue
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Shipping;

const styles = StyleSheet.create({
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
