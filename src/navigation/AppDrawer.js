import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawer from '../components/CustomDrawer';
import Home from '../screens/Home';
import Archive from '../screens/Archive';
import Deleted from '../screens/Deleted';
import CreateNewLabel from '../screens/CreateNewLabel';
import LabelsWithNotes from '../screens/LabelsWithNotes';
import Remainder from '../screens/Remainder';
import Settings from '../screens/Settings';
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
      <Drawer.Screen name="LabelsWithNotes" component={LabelsWithNotes} />
      <Drawer.Screen name="Remainder" component={Remainder} />
      <Drawer.Screen name="Settings" component={Settings} />
    </Drawer.Navigator>
  );
};

export default AppDrawer;
