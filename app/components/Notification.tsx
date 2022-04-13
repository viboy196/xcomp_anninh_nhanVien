import Icon from 'react-native-vector-icons/FontAwesome5';
import React, {useEffect} from 'react';
import {FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {tintColorLight} from '../constants/Colors';
// import {useAppSelector} from '../redux/store/hooks';
import ItemNotification from './items/ItemNotification';
import {View, Text} from './Themed';
import {useAppDispatch, useAppSelector} from '../redux/store/hooks';
import ApiRequest from '../utils/api/Main/ApiRequest';
type Props = {
  WebRtc: (roomId: string, status: 'call' | 'answer') => void;
};
import uuid from 'react-native-uuid';
import {
  NotificationType,
  setNotification,
} from '../redux/features/notification/NotificationSlice';

const Notifications = (props: Props) => {
  // const {notifications} = useAppSelector(state => state.notification);
  const auth = useAppSelector(state => state.auth);
  const {notifications} = useAppSelector(state => state.notification);
  console.log('notifications.length : ', notifications.length);

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (auth.token) {
      ApiRequest.GetListNoti(auth.token)
        .then(data => {
          const arrStr = data.result as Array<string>;
          let arrNoti = Array<NotificationType>();
          arrStr.forEach(value => {
            const obj = JSON.parse(value);
            console.log(obj);

            const item: NotificationType = {
              title: obj.title,
              body: obj.body,
              IdCongViec: obj.IdCongViec,
              roomId: obj.roomId,
              isClick: false,
              time: Date.parse(obj.time),
            };
            arrNoti = [item, ...arrNoti];
          });
          dispatch(setNotification({noti: arrNoti}));
        })
        .catch(() => {
          // dispatch(logOut());
        });
    }
  }, [auth.token, dispatch]);
  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <Text style={styles.titleText}>Thông báo</Text>
        <View style={styles.empty} />
        <TouchableOpacity>
          <Icon
            name={'search'}
            size={25}
            color={tintColorLight}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{marginRight: 15}}
          />
        </TouchableOpacity>
      </View>
      {notifications && (
        <FlatList
          data={notifications}
          renderItem={({item}) => (
            <ItemNotification item={item} WebRtc={props.WebRtc} />
          )}
          key={uuid.v4() as string}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, marginBottom: 20},
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

export default Notifications;
