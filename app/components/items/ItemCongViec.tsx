import React from 'react';
import {TouchableOpacity} from 'react-native';
import {tintColorLight} from '../../constants/Colors';
import {Text, View} from '../Themed';

type Props = {
  data?: any;
};
const ItemCongViec = (props: Props) => {
  const {data} = props;
  return (
    <View
      style={{
        margin: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#dfdfdf',
      }}
      lightColor="#f7f7f7">
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          borderTopStartRadius: 10,

          borderTopEndRadius: 10,
        }}
        lightColor="#f7f7f7">
        <Text
          style={{
            marginLeft: 5,
          }}>
          {data.loaiCongViec}
        </Text>
        <View style={{flex: 1}} lightColor="#f7f7f7" />
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            lightColor="#f7f7f7"
            style={{
              height: 30,
              width: 100,
              backgroundColor: tintColorLight,
              justifyContent: 'center',
              alignItems: 'center',
              margin: 5,
              borderRadius: 5,
            }}>
            <Text lightColor="white" darkColor="white">
              Làm việc
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          borderBottomEndRadius: 10,

          borderBottomStartRadius: 10,
        }}>
        <View
          style={{
            margin: 10,
          }}
        />
      </View>
    </View>
  );
};

export default ItemCongViec;
