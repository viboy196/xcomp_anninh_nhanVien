import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {View, Text} from '../Themed';
// import {useAppDispatch} from '../../redux/store/hooks';
type Props = {
  item: any;
  WebRtc: (roomId: string) => void;
};
const ItemNotification = (props: Props) => {
  // const dispatch = useAppDispatch();
  const [item, setItem] = useState(props.item);
  const date = new Date(item.time);
  console.log('item', item);

  const txtDate = `${`0${date.getHours()}`.slice(
    -2,
  )}:${`0${date.getMinutes()}`.slice(-2)}`;
  // const [isClick, setIsClick] = useState(false);
  return (
    <TouchableOpacity
      onPress={() => {
        if (!item.isClick) {
          const _item = {...item, isClick: true};
          setItem(_item);
          console.log(_item);
          props.WebRtc(_item.roomId);
        }
      }}
      style={{
        flexDirection: 'row',
        backgroundColor: !item.isClick ? '#f2f8fd' : 'rgba(0,0,0,0)',
        paddingVertical: 10,
      }}>
      <View
        style={{
          width: 50,
          height: 50,
          borderRadius: 30,
          backgroundColor: 'red',
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 3,
          borderColor: '#111',
          marginLeft: 5,
        }}>
        <Text
          style={{
            color: '#fff',
            fontWeight: 'bold',
            fontSize: 16,
          }}>
          SOS
        </Text>
      </View>

      <View
        style={{
          flex: 1,
          paddingLeft: 10,
          paddingTop: 5,
        }}>
        <Text>{item.title}</Text>
        <Text>{item.body}</Text>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
          }}>
          <Text
            style={{
              fontSize: 10,
              fontWeight: '100',
              paddingHorizontal: 5,
              color: '#000',
            }}>
            {txtDate}
          </Text>
        </View>
      </View>
      {!item.isClick && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: '#2475e1',
            margin: 10,
          }}
        />
      )}
    </TouchableOpacity>
  );
};
export default ItemNotification;
