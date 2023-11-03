import React, {useContext, useEffect} from 'react';
import {View, StatusBar} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {splashStyles} from '@styles/styles';
import {getUsuario} from '@storage/UsuarioAsyncStorage';
import {UserContext} from '@context/UserContext';

export default function SplashScreen(props) {
  const [login, loginAction, auth] = useContext(UserContext);

  useEffect(() => {
    fetchSession(loginAction);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={splashStyles.image}>
      <StatusBar translucent backgroundColor="rgba(0,0,0,0.2)" />
      <Animatable.Image
        animation="pulse"
        easing="ease-in-out"
        iterationCount="infinite"
        style={{
          width: 200,
          height: 200,
          margin: 100,
        }}
        source={require('@resources/images/logo-plague-tracker.png')}
      />
    </View>
  );

  async function fetchSession(loginAction) {
    const response = await getUsuario();
    console.log(response);

    if (response == null) {
      setTimeout(() => {
        goToScreen('Login');
      }, 3000);
      return;
    }

    loginAction({type: 'sign-in', data: response});
    setTimeout(() => {
      goToScreen('Main');
    }, 500);
  }
  function goToScreen(routeName) {
    props.navigation.replace(routeName);
  }
}
