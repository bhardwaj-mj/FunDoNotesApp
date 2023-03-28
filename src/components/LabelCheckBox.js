import React from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const LabelCheckBox = ({item, checked, unchecked}) => {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name="label-outline"
        size={25}
        color={'#87ceeb'}
      />
      <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
        {item.label}
      </Text>

      <TouchableWithoutFeedback onPress={unchecked}>
        <MaterialIcons
          size={25}
          name={checked ? 'check-box' : 'check-box-outline-blank'}
          color={'#87ceeb'}
          style={{marginLeft: 30}}
        />
      </TouchableWithoutFeedback>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: 15,
    marginRight: 15,
    padding: 10,
    paddingLeft: 10,
  },
  text: {
    marginLeft: 30,
    fontSize: 20,
    color: '#87ceeb',
    width: '68%',
  },
});
export default LabelCheckBox;
