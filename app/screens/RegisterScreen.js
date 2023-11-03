import React, {useContext, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Alert,
} from 'react-native';
import {mainStyles, registerStyles} from '@styles/styles';
import MyTextInput from '@components/MyTextInput';
import color from '@styles/colors';
import ToolBar from '../components/ToolBar';
import {CheckBox, SocialIcon, Button} from 'react-native-elements';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {UserContext} from '@context/UserContext';

function goToScreen(props, routeName) {
  props.navigation.navigate(routeName);
}

export default function RegisterScreen(props) {
  const [login, loginAction, auth] = useContext(UserContext);
  const [hidePassword, setHidePassword] = useState(false);

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [terms, setTerms] = useState(false);

  const handlerCreateAccount = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        console.log('Account created successfully!');
        const user = userCredential.user;
        console.log(user);
        Alert.alert('Usuario creado correctamente.');
        goToScreen(props, 'Login');
      })
      .catch(error => {
        console.log(error);
        Alert.alert(error.message);
      });
  };

  return (
    <ScrollView
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="always"
      style={{backgroundColor: color.GREEN_SLOW}}>
      <StatusBar backgroundColor={color.GREEN} translucent={true} />
      <ToolBar
        titulo="Registrarse"
        onPressLeft={() => goToScreen(props, 'Login')}
        iconLeft={require('@resources/images/back.png')}
      />
      <View style={[mainStyles.containerCenter, {padding: 50}]}>
        <Text style={mainStyles.titleText}>Crea tu Cuenta</Text>
        <MyTextInput
          onChangeText={text => setName(text)}
          placeholder="Nombre"
          image="user"
        />
        <MyTextInput
          onChangeText={text => setLastName(text)}
          placeholder="Apellidos"
          image="user"
        />
        <MyTextInput
          onChangeText={text => setEmail(text)}
          keyboardType="email-address"
          placeholder="E-mail"
          image="envelope"
        />
        <MyTextInput
          keyboardType={null}
          onChangeText={text => setPassword(text)}
          placeholder="Contraseña"
          onPress={() => setHidePassword(!hidePassword)}
          image="lock"
          bolGone={true}
          secureTextEntry={hidePassword}
        />
        <CheckBox
          containerStyle={registerStyles.checkBox}
          textStyle={{color: color.GREEN}}
          title="He leído y acepto los términos y condiciones"
          onChange={value => setTerms(value)}
          checked={false}
          checkedColor={color.BLUE}
        />
        <View style={mainStyles.btnMain}>
          <TouchableOpacity
            onPress={() => {
              handlerCreateAccount();
            }}>
            <Text style={mainStyles.btntxt}>Registrarse</Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{color: color.GREEN_LIME}}>¿Ya tienes una cuenta? </Text>
          <Button
            title="Inicia Sesión"
            onPress={() => goToScreen(props, 'Login')}
            type="clear"
            titleStyle={{color: color.GREEN_DARK}}
          />
        </View>
        <View style={registerStyles.containerSocial}>
          <SocialIcon
            style={registerStyles.buttonSocialIcon}
            title="Iniciar con Facebook"
            button
            type="facebook"
          />
          <SocialIcon
            style={registerStyles.buttonSocialIcon}
            title="Iniciar con Google"
            button
            type="google-plus-official"
          />
        </View>
      </View>
    </ScrollView>
  );
}
