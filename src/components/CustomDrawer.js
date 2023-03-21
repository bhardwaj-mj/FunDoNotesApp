import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import EvilIconsGlyphs from 'react-native-vector-icons/EvilIcons';

// class CustomDrawer extends Component {
//   constructor(props) {
//     super(props);
//   }
//   render(props) {
const CustomDrawer = ({props, navigation}) => {
  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props} style={styles.drawer}>
        <View style={styles.logoView}>
          <Text style={styles.logoText}>Fun Do Notes</Text>
        </View>
        <View style={styles.labelView}>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => navigation.navigate('Note')}>
            <Icon
              style={styles.iconStyle}
              name="bulb-outline"
              size={25}
              color={'white'}
            />
            <Text style={styles.labelText}>Notes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonStyle}>
            <Icon
              style={styles.iconStyle}
              name="notifications-outline"
              size={25}
              color={'white'}
            />
            <Text style={styles.labelText}>Remainder</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonStyle}>
            <Icon
              style={styles.iconStyle}
              name="add-outline"
              size={25}
              color={'white'}
            />
            <Text style={styles.labelText}>Create new label</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => navigation.navigate('Archive')}>
            <Icon
              style={styles.iconStyle}
              name="archive-outline"
              size={25}
              color={'white'}
            />
            <Text style={styles.labelText}>Archive</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => navigation.navigate('Deleted')}>
            <Icon
              style={styles.iconStyle}
              name="trash-outline"
              size={25}
              color={'white'}
            />
            <Text style={styles.labelText}>Deleted</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonStyle}>
            <Icon
              style={styles.iconStyle}
              name="settings-outline"
              size={25}
              color={'white'}
            />
            <Text style={styles.labelText}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonStyle}>
            <EvilIconsGlyphs
              style={styles.iconStyle}
              name="question"
              size={25}
              color={'white'}
            />
            <Text style={styles.labelText}>Help & feedback</Text>
          </TouchableOpacity>
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  drawer: {
    backgroundColor: '#87ceeb',
  },
  logoView: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    margin: 25,
    marginLeft: 20,
  },
  logoText: {
    color: 'white',
    fontFamily: 'Roboto-Medium',
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  labelView: {
    alignItems: 'flex-start',
    marginLeft: 20,
  },
  labelText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 20,
    margin: 10,
    color: 'white',
  },
  buttonStyle: {
    flexDirection: 'row',
  },

  iconStyle: {
    marginTop: 10,
    margin: 10,
  },
});
export default CustomDrawer;
