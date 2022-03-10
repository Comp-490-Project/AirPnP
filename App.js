import React from 'react';
import { Provider } from 'react-redux';
import store from './app/store';
import RootStackNavigator from './app/navigation/RootStackNavigator';

function App() {
  return (
    <Provider store={store}>
      <RootStackNavigator />
    </Provider>
  );
}

export default App;
