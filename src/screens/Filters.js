import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import FeaturedComponent from '../components/FeaturedComponent';
import Header from '../components/Header';
import MessageBox from '../components/MessageBox';
import {Fetch_Data, Fetch_More_Data} from '../store/action/FetchData';

let page = 1;
const Filters = props => {
  const {route} = props;
  const productList = useSelector(state => state.productList);
  const {loading, error, products, count} = productList;
  const [backGroundColor, setBackGraoundColor] = useState(false);
  const MoreData = useSelector(state => state.MoreData);
  const {loadMore, errorMore} = MoreData;

  const dispatch = useDispatch();

  const filterdProducts =
    products &&
    products.filter(
      x =>
        x.brand === route.params.filter ||
        x.gender === route.params.filter ||
        x.collec === route.params.filter,
    );

  const FooterComponent = () => (
    <>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#e74b32" />
      </View>
    </>
  );

  const HeaderComponent = () => (
    <>
      <Header props={props} />
      <Text
        style={{
          color: '#620d05',
          marginBottom: 10,
          marginLeft: 10,
          fontWeight: 'bold',
          fontSize: 20,
        }}>
        {route.params.filter.toLowerCase() === 'male'
          ? `Men's Collection`
          : route.params.filter.toLowerCase() === 'female'
          ? `Women's Collection`
          : route.params.filter.toLowerCase() === 'summer'
          ? `Summer Collection`
          : route.params.filter.toLowerCase() === 'winter'
          ? `Winter Collection`
          : route.params.filter}
      </Text>
    </>
  );

  const LoadingComponent = () => (
    <>
      <Header props={props} />
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#e74b32" />
      </View>
    </>
  );

  useEffect(() => {
    dispatch(Fetch_Data(page));
  }, [dispatch]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={backGroundColor ? '#e74b32' : 'transparent'}
        translucent={true}
        animated={true}
      />
      {loading ? (
        <LoadingComponent />
      ) : error ? (
        <MessageBox>{error}</MessageBox>
      ) : errorMore ? (
        <MessageBox>{errorMore}</MessageBox>
      ) : (
        <FlatList
          ListHeaderComponent={<HeaderComponent />}
          numColumns={2}
          onEndReached={() => {
            if (products.length !== count) {
              page++;
              dispatch(Fetch_More_Data(page));
            }
          }}
          onEndReachedThreshold={0}
          onScroll={({nativeEvent}) => {
            if (nativeEvent.contentOffset.y > 0) {
              setBackGraoundColor(true);
            } else {
              setBackGraoundColor(false);
            }
          }}
          contentContainerStyle={{
            paddingBottom: 10,
          }}
          columnWrapperStyle={{flex: 1, justifyContent: 'space-evenly'}}
          keyExtractor={item => item._id}
          data={filterdProducts}
          renderItem={({item}) => {
            return <FeaturedComponent props={props} product={item} />;
          }}
          ListFooterComponent={loadMore ? <FooterComponent /> : null}
        />
      )}
    </SafeAreaView>
  );
};

export default Filters;

const styles = StyleSheet.create({});
