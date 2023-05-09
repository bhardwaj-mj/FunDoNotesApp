import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Switch} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {useDispatch, useSelector} from 'react-redux';
import {toggleLang} from '../redux/Action';
import Languages from '../utility/localization/Languages';
const Settings = ({navigation}) => {
  const changeLang = useSelector(state => state.toggle);
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
        <Text style={styles.text}>
          {changeLang
            ? Languages._props.hin.Settings
            : Languages._props.en.Settings}
        </Text>
      </View>
      <View style={styles.topBar}>
        <Text style={styles.text}>
          {changeLang
            ? Languages._props.hin.Choose_Language
            : Languages._props.en.Choose_Language}
        </Text>
      </View>
      <View style={styles.topBar}>
        <Text style={styles.text}>
          {changeLang
            ? Languages._props.hin.English
            : Languages._props.en.English}
        </Text>
        <Switch
          trackColor={{false: '#87ceeb', true: '#ffff'}}
          thumbColor={changeLang ? '#87ceeb' : '#ffff'}
          onValueChange={() => dispatch(toggleLang())}
          value={changeLang}
        />
        <Text style={styles.text}>
          {changeLang ? Languages._props.hin.Hindi : Languages._props.en.Hindi}
        </Text>
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
    marginRight: 20,
    fontWeight: '500',
    // width: '62%',
  },
});
export default Settings;
