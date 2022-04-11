import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

import {useAppDispatch} from '../../redux/store/hooks';
import {loginAsync} from '../../redux/features/auth/authSlices';

import {View, Text} from '../../components/Themed';
import Input from '../../components/items/InputForm';
import {RootStackScreenProps} from '../../navigation/types';
import {validatePassword, validatePhoneNumber} from '../../utils/validate';
import {tintColorLight} from '../../constants/Colors';
import {AppName} from '../../utils/AppType';

const Login = ({navigation}: RootStackScreenProps<'Login'>) => {
  const dispatch = useAppDispatch();
  const [textPhone, setTextPhone] = useState('0981481527');
  const [textPassword, setTextPassword] = useState('1');
  return (
    <View style={styles.container}>
      <View style={styles.textHeaderBackground}>
        <Text style={styles.textHeaderStyle}>{AppName}</Text>
      </View>
      <View style={styles.loginForm}>
        <View style={styles.title}>
          <Text style={styles.titleText}>Đăng Nhập</Text>
        </View>
        <View style={styles.inputForm}>
          <Input
            title={'số điện thoại'}
            value={textPhone}
            keyboardType={'numeric'}
            onChangeInput={(text: string) => {
              console.log(text);
              setTextPhone(text);
            }}
            icon="phone"
            color={tintColorLight}
            errorMessages={
              validatePhoneNumber(textPhone)
                ? undefined
                : 'Số điện thoại không hợp lệ'
            }
          />

          <Input
            title={'Mật khẩu'}
            value={textPassword}
            onChangeInput={(text: string) => {
              console.log(text);
              setTextPassword(text);
            }}
            icon="key"
            color={tintColorLight}
            secureTextEntry={true}
            errorMessages={
              validatePassword(textPassword) ? undefined : 'mật khẩu quá ngắn'
            }
          />
          <View style={styles.forgotPasswordLayout}>
            <View style={styles.empty} />
            <TouchableOpacity>
              <Text style={styles.forgotPasswordText}>Quên Mật khẩu</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.btnLoginViewBorder}>
            <TouchableOpacity
              onPress={() => {
                dispatch(
                  loginAsync({phone: textPhone, password: textPassword}),
                );
              }}>
              <View style={styles.btnLoginView}>
                <Text style={styles.btnLoginText}>Đăng nhập</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.btnRegistrView}>
            <Text>Bạn chưa có tài khoản ? </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Register');
              }}>
              <Text
                style={{
                  color: tintColorLight,
                }}>
                Đăng ký ngay
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
  textHeaderBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textHeaderStyle: {
    fontSize: 32,
    color: '#fff',
    fontWeight: '700',
  },
  loginForm: {
    flex: 3,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    marginVertical: 10,
    fontSize: 24,
    fontWeight: '700',
  },
  inputForm: {
    flex: 1,
    width: '100%',
    backgroundColor: '#ecf0f1',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  footer: {
    width: '100%',
    backgroundColor: '#ecf0f1',
  },
  forgotPasswordLayout: {
    flexDirection: 'row',
  },
  forgotPasswordText: {padding: 10, marginRight: 15, color: tintColorLight},
  btnLoginViewBorder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnLoginView: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: tintColorLight,
    width: 150,
    height: 60,
    borderRadius: 30,
  },
  btnLoginText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  btnRegistrView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
  },
  empty: {flex: 1},
});

export default Login;
