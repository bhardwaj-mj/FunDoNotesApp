import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import AppDrawer from './AppDrawer';
import CreateNote from '../screens/CreateNote';
import Notes from '../components/Notes';
import DeleteNote from '../screens/DeleteNote';
import SearchNote from '../screens/SearchNote';
import Home from '../screens/Home';

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
      <Stack.Screen name="Notes" component={Notes} />
      <Stack.Screen name="DeleteNote" component={DeleteNote} />
      <Stack.Screen name="SearchNote" component={SearchNote} />
    </Stack.Navigator>
  );
};

export default AppStack;
