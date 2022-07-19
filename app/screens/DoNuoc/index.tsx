import React, {useState, useEffect} from 'react';
import {FlatList, StyleSheet, TouchableOpacity} from 'react-native';

import {Text, View} from '../../components/Themed';
import {useAppDispatch, useAppSelector} from '../../redux/store/hooks';
import {RootStackScreenProps} from '../../navigation/types';
//import axios, { urlDetail } from "../../utils/api/apiLink";
// import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
// import CongViec from '../../components/CongViec';
// import {tintColorLight} from '../../constants/Colors';
import ApiRequest from '../../utils/api/Main/ApiRequest';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {DataTable} from 'react-native-paper';
import {logOut} from '../../redux/features/auth/authSlices';
import {tintColorLight} from '../../constants/Colors';

export default function DoNuoc({
  navigation,
  route,
}: RootStackScreenProps<'DoNuoc'>) {
  const [loading, setLoading] = useState<boolean>(true);
  console.log('userId', route.params.userId);

  const tag = 'DoNuoc';
  const {token} = useAppSelector(state => state.auth);
  const [tollArea, setTollArea] = useState<Array<any>>([]);
  console.log(tag, tollArea);

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (token) {
      ApiRequest.TollAreaByReader({token: token, userId: route.params.userId})
        .then(data => {
          setTollArea(data.result.data);
          console.log(tag, 'fetch success');
          setLoading(false);
        })
        .catch(() => {
          dispatch(logOut());
        });
    }
  }, [dispatch, route.params.userId, token]);
  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading..</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <TouchableOpacity
          onPress={() => {
            if (navigation.canGoBack()) {
              navigation.goBack();
            }
          }}>
          <Icon
            name={'long-arrow-alt-left'}
            size={35}
            color={'#000'}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{marginLeft: 15}}
          />
        </TouchableOpacity>
        <Text style={styles.titleText}>Khu Vực</Text>
        <View style={styles.empty} />
        <TouchableOpacity
          onPress={() => {
            if (navigation.canGoBack()) {
              navigation.navigate('DoChiSo');
            }
          }}>
          <Icon
            name={'qrcode'}
            size={25}
            color={tintColorLight}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{marginRight: 15}}
          />
        </TouchableOpacity>
      </View>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Khu vực</DataTable.Title>
          <DataTable.Title>Lịch</DataTable.Title>
          <DataTable.Title>Tiến độ</DataTable.Title>
          <DataTable.Title>Gps</DataTable.Title>
        </DataTable.Header>
        <FlatList
          data={tollArea}
          renderItem={({item}) => (
            <DataTable.Row
              onPress={() => {
                navigation.navigate('KhuVucDoScreen', {
                  tollAreaId: item.id,
                  tollAreaName: item.name,
                });
              }}>
              <DataTable.Cell>{item.name}</DataTable.Cell>
              <DataTable.Cell>14/6-28/6</DataTable.Cell>
              <DataTable.Cell>...</DataTable.Cell>
              <DataTable.Cell>{item.gps}</DataTable.Cell>
            </DataTable.Row>
          )}
        />
      </DataTable>
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
