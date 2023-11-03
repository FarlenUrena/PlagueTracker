import React, {useContext, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Image,
  Alert,
} from 'react-native';
import {loginStyles} from '@styles/styles';
import {mainStyles} from '@styles/styles';
import MyTextInput from '@components/MyTextInput';
import MyButton from '@components/MyButton';
import color from '@styles/colors';
import {UserContext} from '@context/UserContext';
import {signInWithEmailAndPassword} from 'firebase/auth';

export default function LoginScreen(props) {
  const [login, loginAction, auth] = useContext(UserContext);

  const [hidePassword, setHidePassword] = useState(false);

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handlerSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        console.log('Signed in successfully!');
        const user = userCredential.user;
        console.log(user);
        Alert.alert('Credenciales correctas.');
        goToScreen(props, 'Login');
        loginAction({
          type: 'sign',
          data: {email, password},
        });
        goToScreen('Main');
      })
      .catch(error => {
        console.log(error);
        Alert.alert(error.message);
      });
  };

  return (
    <View style={[mainStyles.container, {padding: 50}]}>
      <StatusBar backgroundColor={color.GREEN} translucent={true} />
      <View style={loginStyles.logo}>
        <Image
          source={require('@resources/images/logo-plague-tracker.png')}
          style={{height: 250, width: 250}}
        />
      </View>
      <MyTextInput
        keyboardType="email-address"
        placeholder="Correo electrónico"
        image="user"
        value={email}
        onChangeText={email => setEmail(email)}
      />
      <MyTextInput
        keyboardType={null}
        placeholder="Contraseña"
        image="lock"
        bolGone={true}
        secureTextEntry={hidePassword}
        onPress={() => {
          setHidePassword(!hidePassword);
        }}
        value={password}
        onChangeText={password => setPassword(password)}
      />
      <MyButton title="Iniciar Sesión" onPress={() => handlerSignIn()} />
      <MyButton
        transparent={true}
        title="Registrarse"
        onPress={() => goToScreen('Register')}
      />
      <View>
        <TouchableOpacity onPress={() => goToScreen(props, 'RecoverPassword')}>
          <Text
            style={[
              mainStyles.txtTransparent,
              {textDecorationLine: 'underline'},
            ]}>
            Olvidé mi contraseña
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  function goToScreen(routeName) {
    props.navigation.navigate(routeName);
  }
}
