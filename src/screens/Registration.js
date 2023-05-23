import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {pageStyles} from '../utility/GlobalStyle';
import {AuthContext} from '../navigation/AuthProvider';
const Registration = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState('');
  const {userRegistration} = useContext(AuthContext);
  const validate = () => {
    let fullNameRegex = /^[a-zA-Z]+ [a-zA-Z]+$/;
    let emailRegex = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    let valid = true;
    const temp = {};
    if (!fullNameRegex.test(fullName)) {
      valid = false;
      temp.user = 'Please enter valid full name';
    }
    if (fullName === '') {
      valid = false;
      temp.user = "Fullname field shouldn't be empty";
    }
    if (!emailRegex.test(email)) {
      valid = false;
      temp.mail = 'Please enter valid email';
    }
    if (email === '') {
      valid = false;
      temp.mail = "Email field shouldn't be empty";
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
    if (confirmPassword !== password) {
      valid = false;
      temp.confirm = 'Password not matching';
    }
    if (confirmPassword === '') {
      valid = false;
      temp.confirm = "Confirm Password field shouldn't be empty";
    }
    setErrors(temp);
    return valid;
  };

  const onSubmit = () => {
    if (validate()) {
      userRegistration(email, password, setErrorMeassage, fullName);
    }
  };
  const setErrorMeassage = error => {
    const temp = {};
    if (error === 'auth/email-already-in-use') {
      temp.mail = 'This email is already registered';
    }
    setErrors(temp);
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
            <Text>Create Account{'\n'}Signup to get started!</Text>
            <TextInput
              labelValue={fullName}
              onChangeText={userFullName => setFullName(userFullName)}
              style={pageStyles.textInput}
              placeholder="Full Name"
            />
            <View>
              <Text style={{color: 'red', marginLeft: 20}}>{errors.user}</Text>
            </View>
            <TextInput
              labelValue={email}
              onChangeText={userEmail => setEmail(userEmail)}
              style={pageStyles.textInput}
              placeholder="Email"
            />
            <View>
              <Text style={{color: 'red', marginLeft: 20}}>{errors.mail}</Text>
            </View>
            <TextInput
              style={pageStyles.textInput}
              labelValue={password}
              onChangeText={userPassword => setPassword(userPassword)}
              placeholder="Password"
              secureTextEntry={true}
            />
            <View>
              <Text style={{color: 'red', marginLeft: 20}}>{errors.pass}</Text>
            </View>
            <TextInput
              labelValue={confirmPassword}
              onChangeText={userPassword => setConfirmPassword(userPassword)}
              style={pageStyles.textInput}
              placeholder="Confirm Password"
            />
            <View>
              <Text style={{color: 'red', marginLeft: 20}}>
                {errors.confirm}
              </Text>
            </View>
            <TouchableOpacity
              style={pageStyles.button}
              onPress={() => onSubmit()}>
              <Text style={pageStyles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity style={pageStyles.TextButton}>
              <Text style={pageStyles.buttonText1}>
                If already a user, Sign In
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};
export default Registration;
