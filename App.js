/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import MainTabNavigator from './src/navigation/AppNavigator';
import AppContext from './src/contexts/appContext';

const App = () => {
  return (
    <AppContext.Provider value={{allChurches: []}}>
      <MainTabNavigator />
    </AppContext.Provider>
  );
};

export default App;
