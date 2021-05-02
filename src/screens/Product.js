import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import MessageBox from '../components/MessageBox';
import {Product_Details} from '../store/action/FetchData';
import {Set_Review} from '../store/action/ReviewAction';

const Product = props => {
  const Oneproduct = useSelector(state => state.productDetails);
  const {loading, product, error} = Oneproduct;
  const {id} = props.route.params;
  const SetReview = useSelector(state => state.SetReview);
  const {customerReviews} = SetReview;
  const dispatch = useDispatch();

  const [size, setSize] = useState(null);

  const writtenReviews =
    customerReviews && customerReviews.filter(x => x.product === id);

  useEffect(() => {
    dispatch(Product_Details(id));
    dispatch(Set_Review());
  }, [dispatch]);

  useEffect(() => {
    if (product && product.sizes) {
      setSize(product.sizes[0].size);
    }
  }, [product]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="dark-content"
        animated={true}
      />
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#e74b32" />
        </View>
      ) : error ? (
        <MessageBox>{error}</MessageBox>
      ) : (
        <View style={{flex: 1}}>
          <Image
            source={{uri: product.image}}
            style={styles.image}
            resizeMode="contain"
          />
          <View style={{backgroundColor: '#fff', borderRadius: 20}}>
            <Text style={styles.productPrice}>Rs. {product.price}</Text>
            <Text style={styles.productDescription}>{product.description}</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                margin: 10,
              }}>
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
                activeOpacity={0.5}
                onPress={() =>
                  props.navigation.navigate('Filter', {
                    params: {filter: product.brand},
                    screen: 'Filter',
                  })
                }>
                <Text style={{color: '#620d05', fontWeight: 'bold'}}>
                  {product.brand}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              backgroundColor: '#fff',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 20,
              marginTop: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: 17,
                  color: '#620d05',
                  fontWeight: 'bold',
                }}>
                Size:
              </Text>
              <Text style={{fontSize: 16}}> {size}</Text>
            </View>
            <View>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                activeOpacity={0.5}>
                <Text style={{fontSize: 16, color: '#620d05'}}>set size</Text>
                <IonIcon
                  name="chevron-forward-outline"
                  size={15}
                  color="#620d05"
                />
              </TouchableOpacity>
            </View>
          </View>
          {writtenReviews && writtenReviews.length > 0 ? (
            <View
              style={{
                backgroundColor: '#fff',
                padding: 20,
                marginTop: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    fontSize: 17,
                    color: '#620d05',
                    fontWeight: 'bold',
                  }}>
                  Reviews:
                </Text>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  activeOpacity={0.5}>
                  <Text style={{fontSize: 16, color: '#620d05'}}>
                    all reviews
                  </Text>
                  <IonIcon
                    name="chevron-forward-outline"
                    size={15}
                    color="#620d05"
                  />
                </TouchableOpacity>
              </View>
              <View>
                <Text numberOfLines={1}>{writtenReviews[0].review}</Text>
              </View>
            </View>
          ) : null}
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '50%',
    backgroundColor: '#fff',
  },
  iconsView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  productPrice: {
    color: '#e74b32',
    fontSize: 30,
    fontWeight: 'bold',
    margin: 10,
  },
  productDescription: {
    color: '#620d05',
    marginHorizontal: 10,
    lineHeight: 29,
    fontSize: 20,
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '35%',
    alignSelf: 'flex-start',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderColor: '#e74b32',
    borderWidth: 1,
  },
});

export default Product;
