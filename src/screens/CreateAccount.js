import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import Header from '../components/Header';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {UserRegister} from '../store/action/UserAction';
import {Picker} from '@react-native-picker/picker';

const CreateAccount = props => {
  const userRegister = useSelector(state => state.userRegister);
  const {error, userInfo, loading} = userRegister;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [backGroundColor, setBackGraoundColor] = useState(false);
  const [passwordVisible, setpasswordVisible] = useState(true);
  const [confirmPasswordVisible, setconfirmPasswordVisible] = useState(true);

  const dispatch = useDispatch();

  const redirect = props.route.params.location;

  const submitHandler = () => {
    if (password !== confirmPassword) {
      setPasswordError('Password doesnot match');
    } else {
      if (gender === '0') {
        setPasswordError('gender is required');
      } else {
        dispatch(UserRegister(name, email, password, gender));
      }
    }
  };

  useEffect(() => {
    if (userInfo && userInfo.token) {
      props.navigation.navigate(redirect);
    }
  }, [props.navigation, redirect, userInfo]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={backGroundColor ? '#e74b32' : 'transparent'}
        translucent={true}
        animated={true}
      />
      {loading ? (
        <>
          <Header props={props} />
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" color="#e74b32" />
          </View>
        </>
      ) : (
        <ScrollView
          onScroll={({nativeEvent}) => {
            if (nativeEvent.contentOffset.y > 0) {
              setBackGraoundColor(true);
            } else {
              setBackGraoundColor(false);
            }
          }}>
          <Header props={props} />
          <View>
            <Text
              style={{
                fontSize: 17,
                color: '#620d05',
                fontWeight: 'bold',
                marginHorizontal: 15,
                marginBottom: 15,
                marginTop: -20,
              }}>
              Create Account
            </Text>
            {error ? (
              <Text
                style={{
                  color: '#a02020',
                  fontSize: 16,
                  textAlign: 'center',
                  backgroundColor: '#ffe0e0',
                  paddingVertical: 10,
                  paddingHorizontal: 30,
                  borderRadius: 10,
                  alignSelf: 'center',
                }}>
                {error}
              </Text>
            ) : passwordError ? (
              <Text
                style={{
                  color: '#a02020',
                  fontSize: 16,
                  textAlign: 'center',
                  backgroundColor: '#ffe0e0',
                  paddingVertical: 10,
                  paddingHorizontal: 30,
                  borderRadius: 10,
                  alignSelf: 'center',
                }}>
                {passwordError}
              </Text>
            ) : null}
            <View style={{marginHorizontal: 20}}>
              <View style={styles.inputView}>
                <Text style={styles.labels}>Name:</Text>
                <TextInput
                  placeholder="Enter name"
                  keyboardType="default"
                  style={styles.input}
                  defaultValue={name}
                  onChangeText={e => setName(e)}
                />
              </View>
              <View style={styles.inputView}>
                <Text style={styles.labels}>Email Address:</Text>
                <TextInput
                  placeholder="Enter email"
                  keyboardType="email-address"
                  style={styles.input}
                  defaultValue={email}
                  onChangeText={e => setEmail(e)}
                />
              </View>
              <View style={styles.inputView}>
                <Text style={styles.labels}>Gender:</Text>
                <View
                  style={{
                    borderRadius: 4,
                    borderWidth: 1,
                    borderColor: '#e74b32',
                  }}>
                  <Picker
                    mode="dropdown"
                    selectedValue={gender}
                    onValueChange={itemValue => setGender(itemValue)}>
                    <Picker.Item label="select gender..." value="0" />
                    <Picker.Item label="male" value="male" />
                    <Picker.Item label="female" value="female" />
                    <Picker.Item label="other" value="other" />
                  </Picker>
                </View>
              </View>
              <View style={styles.inputView}>
                <Text style={styles.labels}>Password:</Text>
                <View>
                  <TextInput
                    defaultValue={password}
                    onChangeText={e => setPassword(e)}
                    placeholder="Enter password"
                    keyboardType="default"
                    style={styles.input}
                    secureTextEntry={passwordVisible}
                  />
                  <TouchableOpacity
                    activeOpacity={0.6}
                    style={{position: 'absolute', right: 10, bottom: 5}}>
                    <IonIcon
                      onPress={() =>
                        passwordVisible
                          ? setpasswordVisible(false)
                          : setpasswordVisible(true)
                      }
                      name={passwordVisible ? 'eye-outline' : 'eye-off-outline'}
                      size={25}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.inputView}>
                <Text style={styles.labels}>Confirm Password:</Text>
                <View>
                  <TextInput
                    defaultValue={confirmPassword}
                    onChangeText={e => setConfirmPassword(e)}
                    placeholder="Enter password"
                    keyboardType="default"
                    style={styles.input}
                    secureTextEntry={confirmPasswordVisible}
                  />
                  <TouchableOpacity
                    activeOpacity={0.6}
                    style={{position: 'absolute', right: 10, bottom: 5}}>
                    <IonIcon
                      onPress={() =>
                        confirmPasswordVisible
                          ? setconfirmPasswordVisible(false)
                          : setconfirmPasswordVisible(true)
                      }
                      name={
                        confirmPasswordVisible
                          ? 'eye-outline'
                          : 'eye-off-outline'
                      }
                      size={25}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity activeOpacity={0.5} onPress={submitHandler}>
                <LinearGradient
                  colors={['#e74b32', '#ffb74d']}
                  start={{x: 0, y: 0.35}}
                  end={{x: 1, y: 0.5}}
                  style={{borderRadius: 5, marginBottom: 10}}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: '#fff',
                      fontSize: 15,
                      paddingVertical: 10,
                    }}>
                    Create Account
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
              <View style={{flexDirection: 'row', marginBottom: 10}}>
                <Text style={{color: '#620d05'}}>Already have an account?</Text>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => props.navigation.navigate('Login')}>
                  <Text> Sign In</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default CreateAccount;

const styles = StyleSheet.create({
  input: {
    padding: 0,
    borderWidth: 1,
    borderColor: '#e74b32',
    padding: 5,
    marginTop: 5,
    borderRadius: 4,
  },
  inputView: {
    marginBottom: 10,
  },
  labels: {
    color: '#620d05',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
