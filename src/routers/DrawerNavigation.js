import React from 'react';
import {View, TouchableOpacity, Text, Image} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import Home from '../screens/Home';
import Cart from '../screens/Cart';
import Filters from '../screens/Filters';
import IonIcon from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import Shipping from '../screens/Shipping';
import Login from '../screens/Login';
import CreateAccount from '../screens/CreateAccount';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import { Sign_Out } from '../store/action/UserAction';

const DrawerContent = props => {
  const userRegister = useSelector(state => state.userRegister);
  const {userInfo} = userRegister;

  return (
    <View style={{flex: 1}}>
      <LinearGradient
        colors={['#e74b32', '#ffb74d']}
        start={{x: 0.35, y: 0}}
        end={{x: 0.5, y: 1}}
        style={{
          height: '30%',
          borderBottomRightRadius: 6,
          borderBottomLeftRadius: 6,
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: 30,
        }}>
        {userInfo && userInfo.image ? (
          <Image
            style={{width: 100, height: 100, borderRadius: 100}}
            source={{
              uri: userInfo.image,
            }}
          />
        ) : (
          <Image
            style={{width: 100, height: 100, borderRadius: 100}}
            source={require('../images/demo.png')}
          />
        )}
        {userInfo && userInfo.name ? (
          <Text
            style={{
              color: '#fff',
              marginTop: 15,
              fontSize: 20,
              fontWeight: 'bold',
            }}>
            Hello, {userInfo.name}
          </Text>
        ) : (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 15,
            }}>
            <Text
              style={{
                color: '#fff',
                fontSize: 20,
                fontWeight: 'bold',
              }}>
              Hello Guest, please
            </Text>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => props.navigation.navigate('Login')}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 18,
                  fontWeight: 'bold',
                  marginLeft: 3,
                }}>
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </LinearGradient>
      <DrawerContentScrollView {...props}>
        <View>
          <DrawerItem
            label="Home"
            icon={() => <IonIcon name="home" size={20} />}
            onPress={() => props.navigation.navigate('Home')}
          />
          <DrawerItem
            label="Your Orders"
            icon={() => <FontAwesomeIcon name="box" size={20} />}
          />
          <DrawerItem
            label="Settings"
            icon={() => <IonIcon name="settings" size={20} />}
          />
          <DrawerItem
            label="Log Out"
            onPress={Sign_Out}
            icon={() => <IonIcon name="log-out" size={20} />}
          />
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

const Drawer = createDrawerNavigator();
const DrawerNavigation = () => (
  <Drawer.Navigator
    initialRouteName="Home"
    drawerStyle={{elevation: 20}}
    drawerContent={props => <DrawerContent {...props} />}
    overlayColor={0}>
    <Drawer.Screen name="Home" component={Home} />
    <Drawer.Screen name="Cart" component={Cart} />
    <Drawer.Screen name="Filter" component={Filters} />
    <Drawer.Screen name="Shipping" component={Shipping} />
    <Drawer.Screen name="Login" component={Login} />
    <Drawer.Screen name="CreateAccount" component={CreateAccount} />
  </Drawer.Navigator>
);

export default DrawerNavigation;
