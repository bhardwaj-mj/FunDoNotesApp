import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawer from '../components/CustomDrawer';
import Home from '../screens/Home';

const Drawer = createDrawerNavigator();
const AppDrawer = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Note">
      <Drawer.Screen name="Note" component={Home} />
    </Drawer.Navigator>
  );
};

export default AppDrawer;
