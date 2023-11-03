import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import {mainStyles} from '@styles/styles';
import MyTextInput from '@components/MyTextInput';
import color from '@styles/colors';
import ToolBar from '../components/ToolBar';

function goToScreen(props, routeName) {
  props.navigation.navigate(routeName);
}

export default function RecoverPasswordScreen(props) {
  return (
    <ScrollView
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="always"
      style={{backgroundColor: color.GREEN_SLOW}}>
      <StatusBar backgroundColor={color.GREEN} translucent={true} />
      <ToolBar
        titulo="Contraseña"
        onPressLeft={() => goToScreen(props, 'Login')}
        iconLeft={require('@resources/images/back.png')}
      />
      <View style={[mainStyles.containerCenter, {padding: 50}]}>
        <Text style={mainStyles.titleText}>Recuperar{'\n'}Contraseña</Text>
        <MyTextInput
          keyboardType="email-address"
          placeholder="Correo electrónico"
          image="user"
        />
        <View style={mainStyles.btnMain}>
          <TouchableOpacity onPress={() => goToScreen(props, 'Login')}>
            <Text style={mainStyles.btntxt}>Recuperar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
