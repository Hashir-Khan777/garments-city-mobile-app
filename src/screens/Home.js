import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import FeaturedComponent from '../components/FeaturedComponent';
import Header from '../components/Header';
import MessageBox from '../components/MessageBox';
import {Fetch_Data, Fetch_More_Data} from '../store/action/FetchData';

let page = 1;
const Home = props => {
  const productList = useSelector(state => state.productList);
  const {loading, error, products, count} = productList;
  const [backGroundColor, setBackGraoundColor] = useState(false);
  const MoreData = useSelector(state => state.MoreData);
  const {loadMore, errorMore} = MoreData;

  // const clear = async () => await AsyncStorage.clear();
  // clear();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Fetch_Data(page));
  }, [dispatch]);

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
        Featured Clothes
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

  const FooterComponent = () => (
    <>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#e74b32" />
      </View>
    </>
  );

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
          onScroll={({nativeEvent}) => {
            if (nativeEvent.contentOffset.y > 0) {
              setBackGraoundColor(true);
            } else {
              setBackGraoundColor(false);
            }
          }}
          onEndReached={() => {
            if (products.length !== count) {
              page++;
              dispatch(Fetch_More_Data(page));
            }
          }}
          onEndReachedThreshold={0}
          contentContainerStyle={{
            paddingBottom: 10,
          }}
          columnWrapperStyle={{flex: 1, justifyContent: 'space-evenly'}}
          keyExtractor={item => item._id}
          data={products}
          renderItem={({item}) => {
            return <FeaturedComponent props={props} product={item} />;
          }}
          ListFooterComponent={loadMore ? <FooterComponent /> : null}
        />
      )}
    </SafeAreaView>
  );
};

export default Home;
