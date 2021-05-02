import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Categories = ({props}) => {
  return (
    <View>
      <View style={styles.categories}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => props.navigation.navigate('Filter', {filter: 'male'})}
          style={styles.categoryName}>
          <Icon name="male" size={20} color="#e74b32" />
          <Text>Men</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() =>
            props.navigation.navigate('Filter', {filter: 'female'})
          }
          style={styles.categoryName}>
          <Icon name="female" size={20} color="#e74b32" />
          <Text>Women</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() =>
            props.navigation.navigate('Filter', {filter: 'summer'})
          }
          style={styles.categoryName}>
          <Icon name="sun" size={20} color="#e74b32" />
          <Text>Summer</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() =>
            props.navigation.navigate('Filter', {filter: 'winter'})
          }
          style={styles.categoryName}>
          <Icon name="snowflake" size={20} color="#e74b32" />
          <Text>Winter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  categories: {
    position: 'relative',
    top: -35,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    alignSelf: 'center',
    backgroundColor: '#fff',
    width: '90%',
    paddingVertical: 10,
    borderRadius: 5,
    elevation: 3,
  },
  categoryName: {
    alignItems: 'center',
  },
});

export default Categories;
