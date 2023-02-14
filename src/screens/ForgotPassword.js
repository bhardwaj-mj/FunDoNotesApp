import React from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {styles} from '../utility/GlobalStyle';
const ForgotPassword = ({navigation}) => {
  return (
    <View style={styles.display}>
      <View style={styles.topView}>
        <View>
          <Image source={require('../assets/logo.png')} style={styles.logo} />
        </View>
        <Text style={styles.titleText}>F U N D O N O T E S</Text>
      </View>
      <View style={styles.bottomView}>
        <View>
          <ScrollView>
            <TextInput
              label="Email"
              style={styles.textInput}
              placeholder="Email"
            />

            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};
export default ForgotPassword;
