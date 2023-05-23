import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {Color, Font, Margin, Padding, BorderRadius} from '../utility/Theme';
const Chip = ({children}) => {
  return (
    <View>
      <Text style={styles.container}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    fontSize: Font.MEDIUM,
    color: Color.PRIMARY,
    borderRadius: BorderRadius.RADIUS_THREE,
    backgroundColor: Color.SECONDARY,
    padding: Padding.PADDING_THREE,
    margin: Margin.MARGIN_FIVE,
  },
});
export default Chip;
