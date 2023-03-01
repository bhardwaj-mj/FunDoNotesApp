import React, {useEffect} from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {createStackNavigator} from '@react-navigation/stack';

import Login from '../screens/Login';
import Registration from '../screens/Registration';
import ForgotPassword from '../screens/ForgotPassword';
import 'react-native-gesture-handler';

const Stack = createStackNavigator();

const AuthStack = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '223853342688-te0dkmtpjgsr8upj3su5j799aa8m7esv.apps.googleusercontent.com',
    });
  }, []);
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="Registration"
        component={Registration}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="Forgot Password"
        component={ForgotPassword}
        options={{header: () => null}}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
