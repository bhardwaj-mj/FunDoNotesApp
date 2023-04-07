import React, {useContext, useCallback, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AuthContext} from '../navigation/AuthProvider';
import {layoutChange} from '../redux/Action';
import {useSelector, useDispatch} from 'react-redux';
const Remainder = ({navigation}) => {
  const {user} = useContext(AuthContext);
  const layout = useSelector(state => state.layout);
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => {
            navigation.openDrawer();
          }}>
          <Feather name="menu" color={'#87ceeb'} size={25} />
        </TouchableOpacity>
        <Text style={styles.text}>Remainder</Text>
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => navigation.navigate('SearchNote')}>
          <Ionicons name="search" size={25} color={'#87ceeb'} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            dispatch(layoutChange());
          }}>
          <MaterialCommunityIcons
            name={layout ? 'view-agenda-outline' : 'view-grid-outline'}
            color={'#87ceeb'}
            size={25}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1},
  topBar: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
    paddingTop: 25,
    flexDirection: 'row',
    margin: 10,
  },
  text: {
    color: '#87ceeb',
    fontSize: 20,
    marginLeft: 20,
    fontWeight: '500',
    width: '62%',
  },
  searchButton: {
    paddingRight: 20,
    paddingLeft: 20,
  },
});
export default Remainder;
