// import {useEffect, useState} from 'react';
// import {FlatList} from 'react-native';
// import danhsach_congviec from '../dataDemo/danhsach_congviec';
// import {useAppSelector} from '../redux/store/hooks';
// import {GetListCongviecBySystemAnninh} from '../utils/api/Main';
// import ItemCongViec from './item/ItemCongViec';
// import {Text, View} from './Themed';

// const CongViec = () => {
//   const tag = 'CongViec';
//   const auth = useAppSelector(state => state.auth);
//   const [dsCongViec, setDsCongViec] = useState<Array<any>>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   useEffect(() => {
//     setIsLoading(false);
//     if (auth.token)
//       GetListCongviecBySystemAnninh({token: auth.token})
//         .then(data => {
//           setIsLoading(true);
//           setDsCongViec(data.result);
//           console.log(`${tag} | detailUser :`, dsCongViec);
//         })
//         .catch(error => {
//           console.log(`${tag} | useEffect | error :`, error);
//         });
//   }, [auth.token]);
//   return (
//     <View
//       style={{
//         marginBottom: 60,
//       }}>
//       {isLoading ? (
//         <FlatList
//           data={dsCongViec}
//           renderItem={({item}) => <ItemCongViec data={item} />}
//         />
//       ) : (
//         <View>
//           <Text>Loading ....</Text>
//         </View>
//       )}
//     </View>
//   );
// };

// export default CongViec;

/////////////////////////////////
import {View, Text} from 'react-native';
import React from 'react';

export default function CongViec() {
  return (
    <View>
      <Text>CongViec</Text>
    </View>
  );
}
