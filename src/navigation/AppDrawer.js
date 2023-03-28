import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawer from '../components/CustomDrawer';
import Home from '../screens/Home';
import Archive from '../screens/Archive';
import Deleted from '../screens/Deleted';
import CreateNewLabel from '../screens/CreateNewLabel';
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
      <Drawer.Screen name="Archive" component={Archive} />
      <Drawer.Screen name="Deleted" component={Deleted} />
      <Drawer.Screen name="NewLabel" component={CreateNewLabel} />
    </Drawer.Navigator>
  );
};

export default AppDrawer;
