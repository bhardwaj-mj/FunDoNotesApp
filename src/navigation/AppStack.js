import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home';
import AppDrawer from './AppDrawer';

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Drawer"
        component={AppDrawer}
        options={{header: () => null}}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
