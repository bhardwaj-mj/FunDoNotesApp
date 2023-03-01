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
  const [errors, setErrors] = useState('');
  const {userLogin, googleLogin} = useContext(AuthContext);
  const validate = () => {
    let emailRegex = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
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
    if (email === 'auth/user-not-found') {
      temp.mail = 'User not found';
    }
    if (!passwordRegex.test(password)) {
      valid = false;
      temp.pass =
        'Password must have a minimum of 8 characters and contain at least one upper case letter, one lower case letter, one number, and one special character';
    }
    if (password === '') {
      valid = false;
      temp.pass = "Password field shouldn't be empty";
    }
    setErrors(temp);
    return valid;
  };
  const setErrorMeassage = error => {
    const temp = {};
    if (error === 'auth/user-not-found') {
      temp.mail = 'User not found';
    }
    if (error === 'auth/wrong-password') {
      temp.pass = 'Invalid password';
    }
    setErrors(temp);
  };
  const onSubmit = () => {
    if (validate()) {
      userLogin(email, password, setErrorMeassage);
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
            <TextInput
              labelValue={password}
              onChangeText={userPassword => setPassword(userPassword)}
              style={styles.textInput}
              placeholder="Password"
            />
            <View>
              <Text style={{color: 'red', marginLeft: 20}}>{errors.pass}</Text>
            </View>
            <TouchableOpacity
              style={styles.TextButton}
              onPress={() => navigation.navigate('Forgot Password')}>
              <Text style={styles.buttonText1}>Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => onSubmit()}>
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.TextButton}
              onPress={() => navigation.navigate('Registration')}>
              <Text style={styles.buttonText1}>
                Don't have an account? Sign up
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => googleLogin()}>
              <Text style={styles.buttonText}>SignIn With Google</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};
export default Login;
