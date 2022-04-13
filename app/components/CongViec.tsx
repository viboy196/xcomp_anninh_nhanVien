import {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {useAppSelector} from '../redux/store/hooks';
import {GetListCongviecBySystemAnninh} from '../utils/api/Main';
import ItemCongViec from './items/ItemCongViec';
import {Text, View} from './Themed';
import React from 'react';
const CongViec = () => {
  const tag = 'CongViec';
  const auth = useAppSelector(state => state.auth);
  const [dsCongViec, setDsCongViec] = useState<Array<any>>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(false);
    if (auth.token) {
      GetListCongviecBySystemAnninh({token: auth.token})
        .then(data => {
          setIsLoading(true);
          setDsCongViec(data.result);
        })
        .catch(error => {
          console.log(`${tag} | useEffect | error :`, error);
        });
    }
  }, [auth.token]);
  return (
    <View
      style={{
        marginBottom: 60,
      }}>
      {isLoading ? (
        <FlatList
          data={dsCongViec}
          renderItem={({item}) => <ItemCongViec data={item} />}
        />
      ) : (
        <View>
          <Text>Loading ....</Text>
        </View>
      )}
    </View>
  );
};

export default CongViec;
