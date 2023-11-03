import React from 'react';
import AppNavigation from '@navigation/AppNavigation';
import {UserProvider} from './app/context/UserContext';

export default function App() {
  return (
    <UserProvider>
      <AppNavigation />
    </UserProvider>
  );
}
