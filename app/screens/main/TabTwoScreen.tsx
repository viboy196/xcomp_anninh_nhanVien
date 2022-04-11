// import {View} from '../../components/Themed';
// import Notifications from '../../components/Notification';
// import {RootTabScreenProps} from '../../navigation/types';
// import {StyleSheet} from 'react-native';

// export default function TabTwoScreen({}: RootTabScreenProps<'TabTwo'>) {
//   // const openWebRtc = () => {
//   //   navigation.navigate('CallWebRtc');
//   // };
//   return (
//     <View style={styles.container}>
//       <Notifications />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     marginTop: 15,

//     width: '100%',
//     height: '100%',
//   },
// });

///////////////////////////////////////////
import {View, Text} from 'react-native';
import React from 'react';

export default function TabTwoScreen() {
  return (
    <View>
      <Text>TabTwoScreen</Text>
    </View>
  );
}
