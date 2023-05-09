import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {pageStyles} from '../utility/GlobalStyle';
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
      // eslint-disable-next-line no-alert
      alert('Password reset link has been sent to your email');
    }
  };
  return (
    <View style={pageStyles.display}>
      <View style={pageStyles.topView}>
        <View>
          <Image
            source={require('../assets/logo.png')}
            style={pageStyles.logo}
          />
        </View>
        <Text style={pageStyles.titleText}>F U N D O N O T E S</Text>
      </View>
      <View style={pageStyles.bottomView}>
        <View>
          <ScrollView>
            <TextInput
              labelValue={email}
              onChangeText={userEmail => setEmail(userEmail)}
              style={pageStyles.textInput}
              placeholder="Email"
            />
            <View>
              <Text style={{color: 'red', marginLeft: 20}}>{errors.mail}</Text>
            </View>
            <TouchableOpacity style={pageStyles.button} onPress={onSubmit}>
              <Text style={pageStyles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};
export default ForgotPassword;
