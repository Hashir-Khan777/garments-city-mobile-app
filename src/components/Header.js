import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Modal,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IonIcon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import Categories from './Categories';
import {useDispatch, useSelector} from 'react-redux';
import {Search_Data} from '../store/action/Searching';

let page = 1;
const Header = ({props}) => {
  const cart = useSelector(state => state.cart);
  const {cartItems} = cart;
  const Searching = useSelector(state => state.Searching);
  const {searches, error} = Searching;

  const [query, setquery] = useState('');
  const [openSearch, setOpenSearch] = useState(false);

  const dispatch = useDispatch();

  if (error) {
    page++;
  }

  const SearchModal = () => (
    <Modal visible={openSearch} transparent={true}>
      <View>
        <View>
          <FlatList
            data={searches}
            keyExtractor={item => item._id}
            renderItem={({item}) => {
              return (
                <TouchableOpacity>
                  <Text>{item.description}</Text>
                </TouchableOpacity>
              );
            }}
          />
          <Text>Hello</Text>
        </View>
      </View>
    </Modal>
  );

  useEffect(() => {
    if (query !== '') {
      dispatch(Search_Data(page, query));
    }
  }, [dispatch, query]);

  return (
    <SafeAreaView>
      <LinearGradient
        colors={['#e74b32', '#ffb74d']}
        start={{x: 0.35, y: 0}}
        end={{x: 0.5, y: 1}}
        style={{borderBottomRightRadius: 6, borderBottomLeftRadius: 6}}>
        <View style={styles.cartView}>
          <View style={styles.inputView}>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                <StatusBar backgroundColor="#e74b32" />;
                props.navigation.openDrawer();
              }}>
              <Icon
                name="bars"
                size={27}
                style={{marginHorizontal: 5}}
                color="#e74b32"
              />
            </TouchableOpacity>
            <TextInput
              style={{flex: 1}}
              placeholder="I am looking for..."
              keyboardType="default"
              onChangeText={e => {
                setquery(e);
                setOpenSearch(true);
              }}
              onFocus={() => setOpenSearch(true)}
              value={query}
              defaultValue={query}
            />
          </View>
          <View>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Cart')}
              activeOpacity={0.6}>
              <IonIcon
                name="basket-outline"
                size={30}
                color="#fff"
                style={{marginLeft: 10}}
              />
              {cartItems && cartItems.length > 0 ? (
                <Text
                  style={{
                    position: 'absolute',
                    right: -7,
                    top: -7,
                    backgroundColor: 'red',
                    color: '#fff',
                    width: 20,
                    height: 20,
                    textAlign: 'center',
                    borderRadius: 50,
                  }}>
                  {cartItems.length}
                </Text>
              ) : null}
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.categories}>
          <Text style={{color: '#fff', fontSize: 17}}>Choose Style</Text>
        </View>
      </LinearGradient>
      <Categories props={props} />
      {/* <SearchModal /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  inputView: {
    flex: 1,
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 10,
  },
  cartView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginTop: StatusBar.currentHeight,
  },
  categories: {
    marginBottom: 40,
    paddingHorizontal: 10,
  },
});

export default Header;
