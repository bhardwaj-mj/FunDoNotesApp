import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Chip from './Chip';
import {Color, Font, Margin} from '../utility/Theme';
const NoteCard = props => {
  return (
    <View>
      {props.title && <Text style={styles.titleText}>{props.title}</Text>}
      {props.note && <Text style={styles.noteText}>{props.note}</Text>}
      <View style={styles.labelView}>
        {props.labelData.map(item => (
          <Chip key={item.id}>{item.label}</Chip>
        ))}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  titleText: {
    color: Color.SECONDARY,
    fontSize: Font.PRIMARY,
    fontWeight: 'bold',
  },
  noteText: {
    marginTop: Margin.MARGIN_FOUR,
    color: Color.SECONDARY,
    fontSize: Font.SECONDARY,
    fontWeight: 'bold',
  },
  labelView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
export default NoteCard;
