import React from 'react';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import AppNavigator from './src/navigation/AppNavigator';
import './global.css';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  return (
    <GestureHandlerRootView>
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
