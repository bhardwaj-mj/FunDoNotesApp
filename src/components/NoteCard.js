import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Chip from './chip';
const NoteCard = props => {
  return (
    <View>
      {props.title && <Text style={styles.titleText}>{props.title}</Text>}
      {props.note && <Text style={styles.noteText}>{props.note}</Text>}
      {/* {props.labelData.map(item => (
        <Chip key={item.id}>{item.label}</Chip>
      ))} */}
    </View>
  );
};
const styles = StyleSheet.create({
  titleText: {
    color: '#87ceeb',
    fontSize: 18,
    fontWeight: 'bold',
  },
  noteText: {
    marginTop: 8,
    color: '#87ceeb',
    fontSize: 13,
    fontWeight: 'bold',
  },
});
export default NoteCard;
