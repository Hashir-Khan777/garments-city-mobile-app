import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigation from './src/routers/StackNavigation';
import {Provider} from 'react-redux';
import Store from './src/store/Store';

const App = () => {
  return (
    <NavigationContainer>
      <Provider store={Store}>
        <StackNavigation />
      </Provider>
    </NavigationContainer>
  );
};

export default App;
