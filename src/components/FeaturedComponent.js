import React, {useRef} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import {Add_To_Cart} from '../store/action/CartAction';
import RBSheet from 'react-native-raw-bottom-sheet';

const FeaturedComponent = ({product, props}) => {
  const dispatch = useDispatch();
  const refRBSheet = useRef();

  return (
    <View style={styles.card}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() =>
          props.navigation.navigate('Product', {
            id: product._id,
          })
        }>
        <View>
          <Image
            source={{uri: product.image}}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        <View>
          <Text
            numberOfLines={2}
            style={{
              marginTop: 10,
              color: '#620d05',
              fontWeight: 'bold',
            }}>
            {product.description}
          </Text>
        </View>
        <View>
          <Text
            style={{
              marginTop: 5,
              color: '#e74b32',
              fontSize: 20,
            }}>
            Rs. {product.price}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View style={styles.iconsView}>
            <IonIcon
              name={
                product.ratings >= 1
                  ? 'star'
                  : product.ratings >= 0.5
                  ? 'star-half-outline'
                  : 'star-outline'
              }
              color="gold"
            />
            <IonIcon
              name={
                product.ratings >= 2
                  ? 'star'
                  : product.ratings >= 1.5
                  ? 'star-half-outline'
                  : 'star-outline'
              }
              color="gold"
            />
            <IonIcon
              name={
                product.ratings >= 3
                  ? 'star'
                  : product.ratings >= 2.5
                  ? 'star-half-outline'
                  : 'star-outline'
              }
              color="gold"
            />
            <IonIcon
              name={
                product.ratings >= 4
                  ? 'star'
                  : product.ratings >= 3.5
                  ? 'star-half-outline'
                  : 'star-outline'
              }
              color="gold"
            />
            <IonIcon
              name={
                product.ratings >= 5
                  ? 'star'
                  : product.ratings >= 4.5
                  ? 'star-half-outline'
                  : 'star-outline'
              }
              color="gold"
            />
          </View>
          <Text style={{color: '#620d05'}}>{product.reviews}</Text>
        </View>
        <TouchableOpacity
          style={styles.addToCartButton}
          activeOpacity={0.5}
          onPress={() => {
            dispatch(Add_To_Cart(product._id, 1, product.sizes[0].size));
            refRBSheet.current.open();
            setTimeout(() => refRBSheet.current.close(), 3000);
          }}>
          <IonIcon name="basket-outline" size={20} color="#620d05" />
          <Text style={{color: '#620d05', fontWeight: 'bold'}}>
            Add To Cart
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>
      <RBSheet
        ref={refRBSheet}
        openDuration={1000}
        closeDuration={1000}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          container: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            height: 40,
            borderRadius: 5,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
          },
        }}>
        <Text style={{color: '#fff', fontWeight: '900'}}>
          Added to cart successfully
        </Text>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => props.navigation.navigate('Cart')}>
          <Text style={{color: '#fff'}}>View Cart</Text>
        </TouchableOpacity>
      </RBSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '47%',
    marginBottom: 20,
    padding: 10,
    borderRadius: 6,
    backgroundColor: '#fff',
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 150,
  },
  iconsView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    alignSelf: 'flex-start',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderColor: '#e74b32',
    borderWidth: 1,
  },
});

export default FeaturedComponent;
