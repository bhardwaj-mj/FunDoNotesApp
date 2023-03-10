import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
const NoteCard = props => {
  return (
    <View>
      <Text style={styles.titleText}>{props.title}</Text>
      <Text style={styles.noteText}>{props.note}</Text>
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
