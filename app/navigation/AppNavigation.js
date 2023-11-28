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
import ReproductionScreen from '@screens/ReproductionScreen';
import SuppliersScreen from '@screens/SuppliersScreen';
import UsersScreen from '@screens/UsersScreen';
import ProductsScreen from '@screens/ProductsScreen';
import DealPestsScreen from '@screens/DealPestsScreen';
import IdentifyPestsScreen from '@screens/IdentifyPestsScreen';

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
  Reproduction: {
    screen: ReproductionScreen,
   navigationOptions: {
      headerShown: false,
    },
  },
  Users: {
    screen: UsersScreen,
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
  Products: {
    screen: ProductsScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  DealPests: {
    screen: DealPestsScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  IdentifyPests: {
    screen: IdentifyPestsScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
});

export default createAppContainer(AppNavigation);
