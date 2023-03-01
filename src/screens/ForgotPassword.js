import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {styles} from '../utility/GlobalStyle';
import {AuthContext} from '../navigation/AuthProvider';

const ForgotPassword = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState('');
  const {forgotPassword} = useContext(AuthContext);
  const validate = () => {
    let emailRegex = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    let valid = true;
    const temp = {};
    if (!emailRegex.test(email)) {
      valid = false;
      temp.mail = 'Please enter valid email';
    }
    if (email === '') {
      valid = false;
      temp.mail = "Email field shouldn't be empty";
    }
    setErrors(temp);
    return valid;
  };
  const onSubmit = () => {
    if (validate()) {
      forgotPassword(email);
      alert('Password reset link has been sent to your email');
    }
  };
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
              labelValue={email}
              onChangeText={userEmail => setEmail(userEmail)}
              style={styles.textInput}
              placeholder="Email"
            />
            <View>
              <Text style={{color: 'red', marginLeft: 20}}>{errors.mail}</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={onSubmit}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};
export default ForgotPassword;
