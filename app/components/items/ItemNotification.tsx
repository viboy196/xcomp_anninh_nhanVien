// import {useState} from 'react';
// import {Image, TouchableOpacity} from 'react-native';
// import {
//   NotificationType,
//   removeNotification,
//   updateNotification,
// } from '../../redux/features/notification/NotificationSlice';
// import {View, Text} from '../Themed';
// import date from 'date-and-time';
// import {useAppDispatch} from '../../redux/store/hooks';
// type Props = {
//   item: NotificationType;
//   openWebRtc: () => void;
// };
// const ItemNotification = (props: Props) => {
//   const dispatch = useAppDispatch();
//   const [item, setItem] = useState(props.item);
//   const date = new Date(item.notification.date);
//   const txtDate = `${`0${date.getHours()}`.slice(
//     -2,
//   )}:${`0${date.getMinutes()}`.slice(-2)}`;
//   const [isClick, setIsClick] = useState(false);
//   console.log('ItemNotification', props.item);
//   return (
//     <TouchableOpacity
//       onPress={() => {
//         if (!item.isClick) {
//           setItem(old => {
//             const obj = {...old, isClick: true} as NotificationType;
//             dispatch(updateNotification({noti: obj}));

//             // dispatch(removeNotification());

//             return obj;
//           });
//         }
//         props.openWebRtc();
//       }}
//       style={{
//         flexDirection: 'row',
//         backgroundColor: !item.isClick ? '#f2f8fd' : 'rgba(0,0,0,0)',
//         paddingVertical: 10,
//       }}>
//       <View
//         style={{
//           width: 50,
//           height: 50,
//           borderRadius: 30,
//           backgroundColor: 'red',
//           justifyContent: 'center',
//           alignItems: 'center',
//           borderWidth: 3,
//           borderColor: '#111',
//           marginLeft: 5,
//         }}>
//         <Text
//           style={{
//             color: '#fff',
//             fontWeight: 'bold',
//             fontSize: 16,
//           }}>
//           SOS
//         </Text>
//       </View>

//       <View
//         style={{
//           flex: 1,
//           paddingLeft: 10,
//           paddingTop: 5,
//         }}>
//         <Text>{item.notification.request.content.title}</Text>
//         <Text>{item.notification.request.content.body}</Text>
//         <View
//           style={{
//             position: 'absolute',
//             bottom: 0,
//             right: 0,
//           }}>
//           <Text
//             style={{
//               fontSize: 10,
//               fontWeight: '100',
//               paddingHorizontal: 5,
//               color: '#777',
//             }}>
//             {txtDate}
//           </Text>
//         </View>
//       </View>
//       {!item.isClick && (
//         <View
//           style={{
//             position: 'absolute',
//             top: 0,
//             right: 0,
//             width: 10,
//             height: 10,
//             borderRadius: 5,
//             backgroundColor: '#2475e1',
//             margin: 10,
//           }}
//         />
//       )}
//     </TouchableOpacity>
//   );
// };
// export default ItemNotification;

////////////////////////////
import {View, Text} from 'react-native';
import React from 'react';

export default function ItemNotification() {
  return (
    <View>
      <Text>ItemNotification</Text>
    </View>
  );
}
