import React from 'react';
import {Text, View, Image} from 'react-native';

import {styles} from '../utility/GlobalStyle';

const OpeningScreen = () => {
  return (
    <View style={styles.openingScreen}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text
        style={{
          fontSize: 35,
          color: 'black',
          fontWeight: 'bold',
          marginLeft: 40,
          marginTop: 10,
          textAlign: 'center',
        }}>
        F U N D O N O T E S
      </Text>
    </View>
  );
};
export default OpeningScreen;
