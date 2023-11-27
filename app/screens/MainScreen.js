import React, {useContext, useEffect} from 'react';
import {
  Text,
  View,
  StatusBar,
  Alert,
  BackHandler,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import color from '@styles/colors';
import {UserContext} from '@context/UserContext';
import MyButton from '@components/MyButton';
import catalogo_icon from '@resources/images/catalogo_icon.png';
import lupa_icon from '@resources/images/lupa_icon.png';
import control_plagas_icon from '@resources/images/control_plagas_icon.png';
import productos_icon from '@resources/images/productos_icon.png';
import condicion_reproduccion_icon from '@resources/images/condicion_reproduccion_icon.png';
import mapa_afectacion_icon from '@resources/images/mapa_afectacion_icon.png';
import directorio_icon from '@resources/images/directorio_icon.png';

import contacto_icon from '@resources/images/contacto_icon.png';
import foro_icon from '@resources/images/foro_icon.png';
import salir_icon from '@resources/images/salir_icon.png';
import ToolBar from '../components/ToolBar';
import colors from '../styles/colors';

function useBackButton(handler) {
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handler);

    return () => {
      console.log('hardwareBackPress Close');
      BackHandler.removeEventListener('hardwareBackPress', handler);
    };
  }, [handler]);
}

export default function MainScreen(props) {
  const [login, loginAction] = useContext(UserContext);

  const categories = [
    {name: 'Catálogo de Plagas', icon: catalogo_icon, screen: 'Settings'},
    {
      name: 'Identificación de Plagas',
      icon: lupa_icon,
      screen: 'IdentificationScreen',
    },
    {
      name: 'Cómo Enfrentar las Plagas',
      icon: control_plagas_icon,
      screen: 'ConfrontScreen',
    },
    {
      name: 'Productos Recomendados',
      icon: productos_icon,
      screen: 'ProductsScreen',
    },
    {
      name: 'Condiciones de Reproducción',
      icon: condicion_reproduccion_icon,
      screen: 'ReproductionScreen',
    },
    {
      name: 'Mapa de Afectación',
      icon: mapa_afectacion_icon,
      screen: 'MapScreen',
    },
    {
      name: 'Directorio de Proveedores',
      icon: directorio_icon,
      screen: 'Suppliers',
    },
    {
      name: 'Contacto con Expertos',
      icon: contacto_icon,
      screen: 'ContactScreen',
    },
    {name: 'Foro para Productores', icon: foro_icon, screen: 'Forum'},
    {
      name: 'Salir',
      icon: salir_icon,
      screen: 'LoginScreen',
    },
  ];

  const handleCategoryPress = category => {
    if (category.name === 'Salir') {
      desconectarse();
    } else {
      props.navigation.navigate(category.screen);
    }
  };

  function desconectarse() {
    Alert.alert('Salir', '¿Está seguro que desea cerrar sesión?', [
      {
        text: 'No',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Si',
        onPress: () => {
          loginAction({
            type: 'sign-out',
            data: {},
          });
          props.navigation.navigate('Login');
        },
      },
    ]);
  }

  return (
    <ScrollView
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="always"
      style={{backgroundColor: color.GREEN_SLOW}}>
      <StatusBar backgroundColor={color.GREEN} translucent={true} />
      <ToolBar
        titulo="Plage Tracker"
        onPressLeft={() => props.navigation.navigate('Settings')}
        iconLeft={require('@resources/images/configuraciones_icon.png')}
        onPressRight={() => props.navigation.navigate('Settings')}
        iconRight={require('@resources/images/usuario_icon.png')}
      />
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          backgroundColor: colors.GREEN_SLOW,
        }}>
        <View
          style={{
            alignItems: 'center',
            backgroundColor: colors.GREEN_SLOW,
            paddingHorizontal: 16,
            paddingTop: 20,
          }}>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              paddingHorizontal: 8,
            }}>
            {categories.map((category, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  width: '48%', // 2 items per column
                  aspectRatio: 1, // To make them square
                  backgroundColor: colors.GREEN_SKY,
                  padding: 16,
                  borderRadius: 10,
                  marginBottom: 16,
                  justifyContent: 'center',
                  alignItems: 'center',
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                }}
                onPress={() => handleCategoryPress(category)}>
                <Image
                  source={category.icon}
                  style={{width: 50, height: 50, marginBottom: 10}}
                />
                <Text
                  style={{
                    fontSize: 16,
                    color: colors.GREEN,
                    fontFamily: 'MartelSans-Bold',
                    textAlign: 'center',
                  }}>
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
