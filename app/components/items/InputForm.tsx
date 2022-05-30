import {
  KeyboardTypeOptions,
  OpaqueColorValue,
  StyleProp,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {View, Text} from '../../components/Themed';
import useColorScheme from '../../hooks/useColorScheme';
import Colors from '../../constants/Colors';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useState} from 'react';
import React from 'react';
const Input = (props: {
  title?: string;
  value?: string;
  onChangeInput?: (text: string) => void;
  style?: StyleProp<ViewStyle> | undefined;
  icon?: string;
  color?: string | OpaqueColorValue;
  errorMessages?: string;
  keyboardType?: KeyboardTypeOptions | undefined;
  secureTextEntry?: boolean | undefined;
}) => {
  const {
    title,
    value,
    onChangeInput,
    icon,
    color,
    errorMessages,
    keyboardType,
    secureTextEntry,
  } = props;
  const placeholderTitle = `Nhập ${title}`;
  const [focus, setFocus] = useState(false);
  const [showPass, setShowPass] = useState(
    secureTextEntry !== undefined ? secureTextEntry : false,
  );
  const colorScheme = useColorScheme();
  return (
    <View style={styles.container}>
      <View
        style={{
          ...styles.texForm,
          borderWidth: focus ? 2 : 0,
          borderColor: color === undefined ? Colors[colorScheme].text : color,
        }}>
        <Text
          style={{
            padding: 5,
            fontSize: 18,
          }}
          darkColor="#000"
          lightColor="#000">
          {title}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            height: 40,
            alignItems: 'center',
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingLeft: 10,
              width: 50,
            }}>
            <Icon
              name={icon ? icon : ''}
              size={25}
              color={color === undefined ? Colors[colorScheme].text : color}
              style={{marginRight: 15}}
            />
          </View>

          <View
            style={{
              width: 2,
              backgroundColor: '#eee',
              height: '70%',
            }}
          />
          <TextInput
            style={{
              flex: 1,
              paddingLeft: 10,
              color: '#000',
            }}
            placeholder={placeholderTitle}
            placeholderTextColor="rgba(0,0,0,0.2)"
            value={value}
            keyboardType={keyboardType}
            secureTextEntry={showPass}
            onChangeText={text => {
              if (onChangeInput != undefined) {
                onChangeInput(text);
              }
            }}
            onFocus={() => {
              setFocus(true);
            }}
            onBlur={() => {
              setFocus(false);
            }}
          />
          {secureTextEntry && (
            <TouchableOpacity
              onPress={() => {
                setShowPass(!showPass);
              }}>
              <Icon
                name={showPass ? 'eye' : 'eye-slash'}
                size={25}
                color={
                  showPass
                    ? color === undefined
                      ? Colors[colorScheme].text
                      : color
                    : '#777'
                }
                style={{marginRight: 15}}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View
        style={{
          position: 'absolute',
          width: '100%',
          bottom: -2,
          left: 60,
        }}>
        {errorMessages !== undefined && errorMessages !== '' && (
          <Text style={{color: 'red'}}>{errorMessages}</Text>
        )}
      </View>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {},
  texForm: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 15,
    marginTop: 5,
    borderRadius: 10,
    padding: 5,
    backgroundColor: '#fff',
  },
});
