import React from 'react';
import {AuthProvider} from './AuthProvider';
import Routes from './Routes';
import {Provider} from 'react-redux';
import {store} from '../redux/Store';

const Providers = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </Provider>
  );
};
export default Providers;
