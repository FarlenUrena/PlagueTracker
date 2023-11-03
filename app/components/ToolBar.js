import React from 'react';
import {View, Text, TouchableOpacity, Image, Alert} from 'react-native';
import color from '@styles/colors';

export default function ToolBar(props) {
  return (
    <View
      style={[
        props.style,
        {height: 64, marginTop: 24, backgroundColor: color.GREEN},
      ]}>
      {props.iconLeft && (
        <TouchableOpacity
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: 64, // Ancho para hacer el área de interacción más amplia
            height: 64, // Mismo alto que el contenedor
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => props.onPressLeft()}>
          <Image style={{width: 40, height: 40}} source={props.iconLeft} />
        </TouchableOpacity>
      )}
      {props.iconRight && (
        <TouchableOpacity
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            width: 64, // Ancho para hacer el área de interacción más amplia
            height: 64, // Mismo alto que el contenedor
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            props.onPressRight();
          }}>
          <Image style={{width: 40, height: 40}} source={props.iconRight} />
        </TouchableOpacity>
      )}
      {props.titulo && (
        <View
          style={{
            position: 'absolute',
            left: 64, // Para dejar espacio después del ícono izquierdo
            right: 64, // Para dejar espacio antes del ícono derecho
            top: 0,
            height: 64, // Mismo alto que el contenedor
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: 'MartelSans-Regular',
              textAlign: 'center',
              fontSize: 25,
              color: color.WHITE,
            }}>
            {props.titulo}
          </Text>
        </View>
      )}
    </View>
  );
}
