import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {DataTable} from 'react-native-paper';

import {Text, View} from '../../components/Themed';

import Icon from 'react-native-vector-icons/FontAwesome5';
import {RootStackScreenProps} from '../../navigation/types';
import {useAppDispatch, useAppSelector} from '../../redux/store/hooks';
import ApiRequest from '../../utils/api/Main/ApiRequest';
import {logOut} from '../../redux/features/auth/authSlices';
import {tintColorLight} from '../../constants/Colors';
// import {RootStackScreenProps} from '../../navigation/types';
export default function ChiTietSoDoScreen({
  navigation,
  route,
}: RootStackScreenProps<'ChiTietSoDoScreen'>) {
  const [loading, setLoading] = useState<boolean>(true);
  console.log('tollAreaId', route.params.waterUserId);

  const tag = 'ChiTietSoDoScreen';
  const {token} = useAppSelector(state => state.auth);
  const [waterInvoice, setWaterInvoice] = useState<Array<any>>([]);
  console.log(tag, route.params.waterUserId);

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (token) {
      ApiRequest.WaterInvoiceAllByWateruser({
        token: token,
        waterUserId: route.params.waterUserId,
      })
        .then(data => {
          setWaterInvoice(data.result.data);
          console.log(tag, 'fetch success');
          setLoading(false);
        })
        .catch(() => {
          dispatch(logOut());
        });
    }
  }, [dispatch, route.params.waterUserId, token]);
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

        <Text style={styles.titleText}>Hộ : {route.params.waterUserName}</Text>

        <View style={styles.empty} />
        <TouchableOpacity
          onPress={() => {
            if (navigation.canGoBack()) {
              navigation.navigate('DoChiSo', {
                waterUserId: route.params.waterUserId,
                waterUserName: route.params.waterUserName,
              });
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
          <DataTable.Title>Mã hóa đơn</DataTable.Title>
          <DataTable.Title>thời gian</DataTable.Title>
          <DataTable.Title>số nước tiêu thụ</DataTable.Title>
        </DataTable.Header>

        {/* <DataTable.Row
          style={{
            height: 100,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <DataTable.Cell style={{flex: 1}}>Nguyễn Tiến Đạt</DataTable.Cell>
          <DataTable.Cell
            style={{
              flex: 2,
            }}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
                margin: 100,
              }}>
              <Text>chỉ số : 0082</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ChiTietSoDoScreen');
                }}>
                <View
                  style={{
                    margin: 5,
                    width: 90,
                    height: 30,
                    backgroundColor: '#3E3E3E',

                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 45,
                  }}>
                  <Text style={{color: '#fff'}}>Chi tiết</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
              }}>
              <TouchableOpacity
                disabled={false}
                onPress={() => {
                  navigation.navigate('DoChiSo');
                }}>
                <View
                  style={{
                    margin: 5,
                    width: 90,
                    height: 30,
                    backgroundColor: '#e3e3e3',

                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 45,
                  }}>
                  <Text style={{color: '#fff'}}>Đo chỉ số</Text>
                </View>
              </TouchableOpacity>
            </View>
          </DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row
          style={{
            height: 100,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <DataTable.Cell style={{flex: 1}}>Võ Văn Trỗi</DataTable.Cell>
          <DataTable.Cell
            style={{
              flex: 2,
            }}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
                margin: 100,
              }}>
              <Text>chỉ số : ...</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ChiTietSoDoScreen');
                }}>
                <View
                  style={{
                    margin: 5,
                    width: 90,
                    height: 30,
                    backgroundColor: '#e3e3e3',

                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 45,
                  }}>
                  <Text style={{color: '#fff'}}>Chi tiết</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
              }}>
              <TouchableOpacity
                disabled={false}
                onPress={() => {
                  navigation.navigate('DoChiSo');
                }}>
                <View
                  style={{
                    margin: 5,
                    width: 90,
                    height: 30,
                    backgroundColor: '#3e3e3e',

                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 45,
                  }}>
                  <Text style={{color: '#fff'}}>Đo chỉ số</Text>
                </View>
              </TouchableOpacity>
            </View>
          </DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row
          style={{
            height: 100,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <DataTable.Cell style={{flex: 1}}>Hoàng Thu Lan</DataTable.Cell>
          <DataTable.Cell
            style={{
              flex: 2,
            }}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
                margin: 100,
              }}>
              <Text>chỉ số : 0032</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ChiTietSoDoScreen');
                }}>
                <View
                  style={{
                    margin: 5,
                    width: 90,
                    height: 30,
                    backgroundColor: '#3E3E3E',

                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 45,
                  }}>
                  <Text style={{color: '#fff'}}>Chi tiết</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
              }}>
              <TouchableOpacity
                disabled={false}
                onPress={() => {
                  navigation.navigate('DoChiSo');
                }}>
                <View
                  style={{
                    margin: 5,
                    width: 90,
                    height: 30,
                    backgroundColor: '#e3e3e3',

                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 45,
                  }}>
                  <Text style={{color: '#fff'}}>Đo chỉ số</Text>
                </View>
              </TouchableOpacity>
            </View>
          </DataTable.Cell>
        </DataTable.Row> */}

        <FlatList
          data={waterInvoice}
          renderItem={({item}) => (
            <DataTable.Row
              onPress={() => {
                // navigation.navigate('ChiTietSoDoScreen', {
                //   waterUserId: item.id,
                //   waterUserName: item.name,
                // });
              }}>
              <DataTable.Cell>{item.code}</DataTable.Cell>
              <DataTable.Cell>
                {item.month}/{item.year}
              </DataTable.Cell>
              <DataTable.Cell>{item.waterMeterNumber}</DataTable.Cell>
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
