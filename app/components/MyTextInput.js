import React from 'react';
import {StyleSheet, TouchableOpacity, Image} from 'react-native';
import color from '@styles/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input} from 'react-native-elements';

export default function MyTextInput(props) {
  return (
    <Input
      style={{alignItems: 'center'}}
      inputStyle={{
        fontSize: 18,
        paddingVertical: 10,
        paddingHorizontal: 8,
        paddingBottom: 0,
        color: color.GREEN_DARK,
        fontFamily: 'MartelSans-Light',
      }}
      placeholderTextColor={color.GREEN}
      placeholder={props.placeholder}
      leftIconContainerStyle={{marginLeft: 0}}
      leftIcon={<Icon size={24} color={color.GREEN} name={props.image} />}
      rightIcon={
        props.bolGone ? (
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.btnVisibility}
            onPress={props.onPressIcon}>
            <Image
              style={styles.btnImage}
              tintColor={color.GREEN}
              source={
                props.secureTextEntry
                  ? require('@resources/images/ic_show_password.png')
                  : require('@resources/images/ic_hide_password.png')
              }
            />
          </TouchableOpacity>
        ) : (
          <Icon size={24} color={color.GREEN} name={props.imageRight} />
        )
      }
      errorStyle={{color: color.RED}}
      errorMessage={props.bolError ? props.strError : ''}
      editable={props.editable}
      secureTextEntry={props.secureTextEntry}
      keyboardType={props.keyboardType}
      onChangeText={props.onChangeText}
      value={props.value}
    />
  );
}

const styles = StyleSheet.create({
  btnVisibility: {
    height: 40,
    width: 35,
    paddingTop: 8,
    paddingLeft: 5,
    paddingRight: 5,
  },

  btnImage: {
    resizeMode: 'contain',
    height: '100%',
    width: '100%',
  },
});
