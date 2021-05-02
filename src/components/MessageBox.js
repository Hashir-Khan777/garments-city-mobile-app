import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';

const MessageBox = ({children}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <View style={styles.errorView}>
          <Text style={{color: '#a02020', fontSize: 16}}>{children}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MessageBox;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorView: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffe0e0',
    paddingVertical: 10,
    borderRadius: 10,
  },
});
