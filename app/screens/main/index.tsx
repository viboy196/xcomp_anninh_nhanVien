import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {/*Pressable,*/ StyleSheet} from 'react-native';
import {Text, View} from '../../components/Themed';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
// import {removeCountNotifi} from '../../redux/features/notification/NotificationSlice';
// import {useAppDispatch} from '../../redux/store/hooks';
import {RootTabParamList /*,RootTabScreenProps*/} from '../../navigation/types';
import TabOneScreen from './TabOneScreen';
import TabThreeScreen from './TabThreeScreen';
import TabTwoScreen from './TabTwoScreen';

import Icon from 'react-native-vector-icons/FontAwesome5';

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

export default function MainScreen() {
  const colorScheme = useColorScheme();
  // const numNotSee = useAppSelector(state => state.notification.numNotSee);
  // const dispatch = useAppDispatch();
  // const remove = () => {
  //   console.log('TabTwoScreen remove');

  //   dispatch(removeCountNotifi());
  // };
  // console.log('MainScreen', numNotSee);

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}>
      <BottomTab.Screen
        name="TabOne"
        component={TabOneScreen}
        options={{
          /*({navigation}: RootTabScreenProps<'TabOne'>) => ({*/
          title: 'Trang chủ',
          headerShown: false,
          tabBarIcon: ({color}) => <TabBarIcon name="home" color={color} />,
          // headerRight: () => (
          //   <Pressable
          //     onPress={() => navigation.navigate('Modal')}
          //     style={({pressed}) => ({
          //       opacity: pressed ? 0.5 : 1,
          //     })}>
          //     <Icon
          //       name="info-circle"
          //       size={25}
          //       color={Colors[colorScheme].text}
          //       style={{marginRight: 15}}
          //     />
          //   </Pressable>
          // ),
          /*})*/
        }}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoScreen}
        options={{
          title: 'Thông báo',
          headerShown: false,
          tabBarIcon: ({color}) => <TabBarIcon name="bell" color={color} />,
        }}
        // listeners={{
        //   tabPress: e => {
        //     dispatch(removeCountNotifi());
        //   },
        // }}
      />

      <BottomTab.Screen
        name="TabThree"
        component={TabThreeScreen}
        options={{
          title: 'Tùy chọn',
          headerShown: false,
          tabBarIcon: ({color}) => <TabBarIcon name="bars" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
export function TabBarIcon(props: {
  name: string;
  color: string;
  numberCount?: number;
}) {
  return (
    <View style={styles.tabBarIconView}>
      <Icon size={30} style={styles.icon} {...props} />
      {props.numberCount !== undefined && props.numberCount > 0 && (
        <View style={styles.notificationNumView}>
          <Text style={styles.notificationNumText}>{props.numberCount}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBarIconView: {
    width: 30,
    height: 30,
  },
  icon: {marginBottom: -3},
  notificationNumView: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 15,
    height: 15,
    backgroundColor: 'red',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationNumText: {fontSize: 10, fontWeight: 'bold', color: '#fff'},
});
