import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Product from '../screens/Product';
import DrawerNavigation from './DrawerNavigation';
import Shipping from '../screens/Shipping';
import PlaceOrder from '../screens/PlaceOrder';
import OrderScreen from '../screens/OrderScreen';

const Stack = createStackNavigator();
const StackNavigation = () => (
  <Stack.Navigator initialRouteName="Home">
    <Stack.Screen
      name="Home"
      component={DrawerNavigation}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="Cart"
      component={DrawerNavigation}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="Product"
      component={Product}
      options={{
        headerTransparent: true,
        headerTitle: false,
      }}
    />
    <Stack.Screen
      name="Filter"
      component={DrawerNavigation}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="Shipping"
      component={Shipping}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="PlaceOrder"
      component={PlaceOrder}
      options={{
        headerTitle: 'Place Order',
        headerTitleAlign: 'center',
      }}
    />
    <Stack.Screen
      name="OrderDetails"
      component={OrderScreen}
      options={{
        headerTitle: 'Order Details',
        headerTitleAlign: 'center',
      }}
    />
    <Stack.Screen
      name="Login"
      component={DrawerNavigation}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="CreateAccount"
      component={DrawerNavigation}
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);

export default StackNavigation;
