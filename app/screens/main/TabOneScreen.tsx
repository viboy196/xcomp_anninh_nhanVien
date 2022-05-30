import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

import {Text, View} from '../../components/Themed';
import {useAppDispatch, useAppSelector} from '../../redux/store/hooks';
import {RootTabScreenProps} from '../../navigation/types';
//import axios, { urlDetail } from "../../utils/api/apiLink";
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import CongViec from '../../components/CongViec';
import {tintColorLight} from '../../constants/Colors';
import ApiRequest from '../../utils/api/Main/ApiRequest';
import {logOut} from '../../redux/features/auth/authSlices';

export default function TabOneScreen({}: RootTabScreenProps<'TabOne'>) {
  // const tag = 'TabOneScreen';
  const {token} = useAppSelector(state => state.auth);
  const [detailUser, setDetailUser] = useState<any>({});
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (token) {
      ApiRequest.DetailInfoNguoiDung(token)
        .then(data => {
          setDetailUser(data.result);
        })
        .catch(() => {
          dispatch(logOut());
        });
    }
  }, [dispatch, token]);
  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <Text style={styles.titleText}>{detailUser.name}</Text>
        <View style={styles.empty} />
        <TouchableOpacity>
          <FontAwesome5Icon
            name={'bars'}
            size={25}
            color={tintColorLight}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{marginRight: 15}}
          />
        </TouchableOpacity>
      </View>
      <CongViec />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerView: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  titleText: {
    marginLeft: 20,
    fontSize: 24,
  },
  empty: {
    flex: 1,
  },
});
