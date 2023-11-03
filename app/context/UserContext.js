import React, {createContext, useReducer} from 'react';
import {saveUsuario, deleteUsuario} from '@storage/UsuarioAsyncStorage';
import Snackbar from 'react-native-snackbar';
import {initializeAuth, getReactNativePersistence} from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import {initializeApp} from 'firebase/app';
import {firebaseConfig} from '../../firebase-config';

const initialState = {
  usuario: {
    nombre: '',
    apellido: '',
    email: '',
    password: '',
  },
  activo: false,
};

const userReducer = (state = initialState, payload) => {
  switch (payload.type) {
    case 'sign-in':
      console.log('Bienvenido a Plague Tracker', payload.data);
      return {...state, usuario: payload.data, activo: true};
    case 'sign':
      saveUsuario(payload.data).then(msg => {
        console.log('Usuario guardado');
      });
      Snackbar.show({
        text: 'Inicio de sesión éxitoso',
        duration: Snackbar.LENGTH_LONG,
      });

      return {...state, usuario: payload.data, activo: true};
    case 'sign-out':
      deleteUsuario().then(msg => {
        console.log(msg);
      });
      Snackbar.show({
        text: 'Sesión expirada',
        duration: Snackbar.LENGTH_LONG,
      });

      return {...state, usuario: payload.data, activo: false};
    default:
      return state;
  }
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

const UserContext = createContext(initialState);

function UserProvider(props) {
  const [login, loginAction] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={[login, loginAction, auth]}>
      {props.children}
    </UserContext.Provider>
  );
}

export {UserContext, UserProvider};
