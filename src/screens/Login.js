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
const Login = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [checkValidEmail, setCheckValidEmail] = useState('');
  const [checkValidPassword, setCheckValidPassword] = useState('');
  const {userLogin} = useContext(AuthContext);
  const handleCheckEmail = text => {
    let regexMail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    setEmail(text);

    if (regexMail.test(text)) {
      setCheckValidEmail(false);
    } else {
      setCheckValidEmail(true);
    }
  };
  const handleCheckPassword = text => {
    let regexPassword = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    setPassword(text);

    if (regexPassword.test(text)) {
      setCheckValidPassword(false);
    } else {
      setCheckValidPassword(true);
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
              label="Email"
              onChangeText={text => handleCheckEmail(text)}
              style={styles.textInput}
              placeholder="Email"
            />
            {checkValidEmail ? (
              <Text style={{color: 'red', marginLeft: 17}}>
                Please enter a valid E-mail
              </Text>
            ) : (
              <Text />
            )}

            <TextInput
              label="Password"
              onChangeText={text => handleCheckPassword(text)}
              style={styles.textInput}
              placeholder="Password"
            />
            {checkValidPassword ? (
              <Text style={{color: 'red', marginLeft: 17}}>
                Please enter a valid password
              </Text>
            ) : (
              <Text />
            )}
            <TouchableOpacity
              style={styles.TextButton}
              onPress={() => navigation.navigate('Forgot Password')}>
              <Text style={styles.buttonText1}>Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => userLogin(email, password)}>
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.TextButton}
              onPress={() => navigation.navigate('Registration')}>
              <Text style={styles.buttonText1}>
                Don't have an account? Sign up
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};
export default Login;
