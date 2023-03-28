import React from 'react';
import {Text, StyleSheet, View} from 'react-native';

const Chip = ({children}) => {
  return (
    <View>
      <Text style={styles.container}>{children}</Text>
    </View>
  );
};

export default Chip;

const styles = StyleSheet.create({
  container: {
    fontSize: 18,
    color: 'white',
    borderRadius: 20,
    backgroundColor: 'skyblue',
    padding: 8,
    margin: 10,
    width: 'fit-content',
  },
});
