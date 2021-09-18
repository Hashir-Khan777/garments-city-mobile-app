import React, {useEffect} from 'react';
import {CommonActions} from '@react-navigation/routers';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(
      () =>
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'Home'}],
          }),
        ),
      3000,
    );
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Image
          style={styles.splashImage}
          source={require('../images/favicon.png')}
        />
        <Text style={styles.splashText}>Garments City</Text>
        <Text style={styles.splashSubText}>choose of your choice</Text>
      </View>
      <Text style={styles.copyRight}>By: HASHIR KHAN</Text>
    </SafeAreaView>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashText: {
    fontSize: 50,
    fontWeight: 'bold',
  },
  splashImage: {
    borderRadius: 100,
  },
  splashSubText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  copyRight: {
    alignSelf: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
});
