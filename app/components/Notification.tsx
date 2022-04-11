// import Icon from 'react-native-vector-icons/FontAwesome5';
// import React from 'react';
// import {FlatList, TouchableOpacity} from 'react-native';
// import {tintColorLight} from '../constants/Colors';
// // import {useAppSelector} from '../redux/store/hooks';
// import ItemNotification from './items/ItemNotification';
// import {View, Text} from './Themed';
// // type Props = {
// //   // openWebRtc: () => void;
// // };

// const Notifications = (/*props: Props*/) => {
//   // const {notifications} = useAppSelector(state => state.notification);
//   const notifications = Array<any>();
//   return (
//     <View
//       style={{
//         marginHorizontal: 5,
//       }}>
//       <View
//         style={{
//           height: 60,
//           justifyContent: 'center',
//           alignItems: 'center',
//           flexDirection: 'row',
//           borderBottomColor: '#eee',
//           borderBottomWidth: 1,
//         }}>
//         <Text
//           style={{
//             marginLeft: 20,
//             fontSize: 24,
//           }}>
//           Thông báo
//         </Text>
//         <View
//           style={{
//             flex: 1,
//           }}></View>
//         <TouchableOpacity>
//           <Icon
//             name={'search'}
//             size={25}
//             color={tintColorLight}
//             style={{marginRight: 15}}
//           />
//         </TouchableOpacity>
//       </View>
//       <FlatList
//         data={notifications}
//         renderItem={({item}) => <ItemNotification item={item} />}
//         keyExtractor={item => item.notification.date.toString()}
//       />
//     </View>
//   );
// };

// export default Notifications;

////////////////////////////////
import {View, Text} from 'react-native';
import React from 'react';

export default function Notification() {
  return (
    <View>
      <Text>Notification</Text>
    </View>
  );
}
