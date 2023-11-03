import {StyleSheet} from 'react-native';
import color from './colors';

const mainStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: color.GREEN_SLOW,
  },

  containerCenter: {
    paddingTop: 10,
    alignItems: 'center',
    marginBottom: 25,
  },

  titleText: {
    fontSize: 28,
    marginTop: 20,
    color: color.GREEN,
    fontFamily: 'MartelSans-SemiBold',
  },

  btnMain: {
    width: 280,
    marginTop: 40,
    marginBottom: 20,
    backgroundColor: color.GREEN,
    borderRadius: 60,
  },

  btnTransparent: {
    backgroundColor: 'rgba(52, 52, 52, 0)',
    borderColor: color.GREEN,
    width: 280,
    borderWidth: 2,
    marginBottom: 20,
    borderRadius: 60,
  },

  btntxt: {
    textAlign: 'center',
    fontSize: 17,
    color: color.WHITE,
    paddingVertical: 15,
    fontFamily: 'MartelSans-Bold',
  },

  txtTransparent: {
    color: color.GREEN,
    fontSize: 14,
    fontFamily: 'MartelSans-Bold',
  },
});

//Estilos para SplashScreen
const splashStyles = StyleSheet.create({
  image: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.GREEN_PALE,
  },
});

//Estilos para LoginScreen
const loginStyles = StyleSheet.create({
  logo: {
    paddingTop: 50,
    alignItems: 'center',
  },
});

//Estilos para RegisterScreen
const registerStyles = StyleSheet.create({
  checkBox: {
    marginLeft: 0,
    marginRight: 0,
    borderWidth: 0,
    backgroundColor: color.GREEN_SLOW,
  },

  containerSocial: {
    paddingTop: 30,
    alignItems: 'center',
    marginBottom: 10,
  },

  buttonSocialIcon: {
    marginBottom: 10,
    width: 250,
    height: 60,
    alignItems: 'center',
    borderRadius: 60,
  },
});

export {loginStyles, splashStyles, mainStyles, registerStyles};
