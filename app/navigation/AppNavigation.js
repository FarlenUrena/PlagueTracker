import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import SplashScreen from '@screens/SplashScreen';
import LoginScreen from '@screens/LoginScreen';
import MainScreen from '@screens/MainScreen';
import RecoverPasswordScreen from '@screens/RecoverPasswordScreen';
import RegisterScreen from '@screens/RegisterScreen';
import SettingsScreen from '@screens/SettingsScreen';
import ForumScreen from '@screens/ForumScreen';
import ForumDetailScreen from '@screens/ForumDetailScreen';
import SuppliersScreen from '@screens/SuppliersScreen';

const AppNavigation = createStackNavigator({
  Splash: {
    screen: SplashScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  Settings: {
    screen: SettingsScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  Main: {
    screen: MainScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  RecoverPassword: {
    screen: RecoverPasswordScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  Register: {
    screen: RegisterScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  Forum: {
    screen: ForumScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  ForumDetail: {
    screen: ForumDetailScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  Suppliers: {
    screen: SuppliersScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
});

export default createAppContainer(AppNavigation);
