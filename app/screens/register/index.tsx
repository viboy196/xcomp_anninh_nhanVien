import React, {useCallback, useState} from 'react';
import {Alert, StyleSheet, TouchableOpacity} from 'react-native';

import {View, Text} from '../../components/Themed';
import Input from '../../components/items/InputForm';
import {
  validateName,
  validatePassword,
  validatePhoneNumber,
} from '../../utils/validate';
import {RootStackScreenProps} from '../../navigation/types';
// import {FontAwesome} from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {tintColorLight} from '../../constants/Colors';
import ApiRequest from '../../utils/api/Main/ApiRequest';
import {InputRegister} from '../../utils/api/apiTypes';
import {AppName} from '../../utils/AppType';

const Register = ({navigation}: RootStackScreenProps<'Register'>) => {
  const [textFullName, setTextFullName] = useState('');

  const [textPhone, setTextPhone] = useState('');

  const [textPassword, setTextPassword] = useState('');

  const [textPasswordRedo, setTextPasswordRedo] = useState('');

  const registerApi = useCallback(async (input: InputRegister) => {
    const res = await ApiRequest.RegisterApi(input);
    console.log('registerApi', res);
    if (res.errorMessage === 'Object was exist') {
      Alert.alert('Lỗi', 'số điện thoại đã được đăng ký');
    }
    if (res.status === true) {
      Alert.alert('Thành công', 'Đăng ký thành công');
    }
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={{
          alignItems: 'center',
          marginBottom: 60,
        }}>
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 20,
            left: 25,
          }}
          onPress={() => navigation.goBack()}>
          <View style={{}}>
            <Icon
              name={'arrow-left'}
              size={25}
              color="#fff"
              style={{marginRight: 15}}
            />
          </View>
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 32,
            color: '#fff',
            fontWeight: '700',
            top: 10,
          }}>
          {AppName}
        </Text>
      </View>
      <View style={styles.loginForm}>
        <View style={styles.title}>
          <Text style={styles.titleText}>Đăng ký</Text>
        </View>
        <View style={styles.inputForm}>
          <Input
            title={'Họ và tên'}
            value={textFullName}
            onChangeInput={(text: string) => {
              console.log(text);
              setTextFullName(text);
            }}
            style={{marginLeft: 10, marginRight: 10}}
            icon="users"
            color={tintColorLight}
            errorMessages={
              validateName(textFullName) ? undefined : 'Tên không hợp lệ'
            }
          />
          <Input
            title={'Số điện thoại'}
            value={textPhone}
            keyboardType={'numeric'}
            onChangeInput={(text: string) => {
              console.log(text);
              setTextPhone(text);
            }}
            style={{marginLeft: 10, marginRight: 10}}
            icon="phone"
            color={tintColorLight}
            errorMessages={
              validatePhoneNumber(textPhone)
                ? undefined
                : 'số điện thoại không hợp lệ'
            }
          />

          <Input
            title={'Mật khẩu'}
            value={textPassword}
            onChangeInput={(text: string) => {
              console.log(text);
              setTextPassword(text);
            }}
            style={{marginLeft: 10, marginRight: 10}}
            icon="key"
            color={tintColorLight}
            secureTextEntry={true}
            errorMessages={
              validatePassword(textPassword)
                ? undefined
                : 'Mật khẩu phải nhiều hơn 4 kí tự'
            }
          />
          <Input
            title={'Nhập lại mật khẩu'}
            value={textPasswordRedo}
            onChangeInput={(text: string) => {
              console.log(text);
              setTextPasswordRedo(text);
            }}
            style={{marginLeft: 10, marginRight: 10}}
            icon="key"
            color={tintColorLight}
            secureTextEntry={true}
            errorMessages={
              textPasswordRedo === textPassword
                ? undefined
                : 'Mật khẩu không trùng khớp'
            }
          />
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: 100,
            }}>
            <TouchableOpacity
              onPress={() => {
                registerApi({
                  fullName: textFullName,
                  email: 'viboy196@gmail.com',
                  password: textPassword,
                  phone: textPhone,
                });
              }}>
              <View
                style={{
                  width: 200,
                  height: 60,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#fff',
                  borderRadius: 30,
                  marginBottom: 2,
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '700',
                    color: tintColorLight,
                  }}>
                  Đăng ký
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',

              marginBottom: 10,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text
                style={{
                  color: '#fff',
                  fontStyle: 'italic',
                }}>
                quay lại ĐĂNG NHẬP
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tintColorLight,
    flexDirection: 'column',
  },
  loginForm: {
    flex: 3.5,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    marginVertical: 10,
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
  },
  inputForm: {
    flex: 1,
    width: '100%',
  },
  footer: {
    width: '100%',
  },
});

export default Register;
