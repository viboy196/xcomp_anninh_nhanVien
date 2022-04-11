import {TouchableOpacity} from 'react-native';
import React from 'react';
import {useAppDispatch} from '../../redux/store/hooks';
import {logOut} from '../../redux/features/auth/authSlices';
import {Text, View} from '../../components/Themed';
import {tintColorLight} from '../../constants/Colors';

export default function TabThreeScreen() {
  const dispatch = useAppDispatch();
  return (
    <View
      style={{
        marginTop: 15,

        width: '100%',
        height: '100%',
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            width: '90%',
            height: 40,
            backgroundColor: tintColorLight,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
            marginTop: 20,
          }}>
          <TouchableOpacity
            onPress={() => {
              dispatch(logOut());
            }}>
            <Text
              style={{
                color: '#fff',
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              đăng xuất
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
