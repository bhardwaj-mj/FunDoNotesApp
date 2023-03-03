import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import AppDrawer from './AppDrawer';
import CreateNote from '../screens/CreateNote';

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="Drawer"
        component={AppDrawer}
        options={{header: () => null}}
      />
      <Stack.Screen name="CreateNote" component={CreateNote} />
    </Stack.Navigator>
  );
};

export default AppStack;
