import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {styles} from '../utility/GlobalStyle';
import {AuthContext} from '../navigation/AuthProvider';
const Registration = () => {
  const [fullName, setFullName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const {userRegistration} = useContext(AuthContext);
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
            <Text>Create Account{'\n'}Signup to get started!</Text>
            <TextInput
              labelValue={fullName}
              onChangeText={userFullName => setFullName(userFullName)}
              style={styles.textInput}
              placeholder="Full Name"
            />

            <TextInput
              labelValue={email}
              onChangeText={userEmail => setEmail(userEmail)}
              style={styles.textInput}
              placeholder="Email"
            />

            <TextInput
              style={styles.textInput}
              labelValue={password}
              onChangeText={userPassword => setPassword(userPassword)}
              placeholder="Password"
            />
            <TextInput
              labelValue={confirmPassword}
              onChangeText={userPassword => setPassword(userPassword)}
              style={styles.textInput}
              placeholder="Confirm Password"
            />

            <TouchableOpacity
              style={styles.button}
              onPress={() => userRegistration(fullName, email, password)}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.TextButton}>
              <Text style={styles.buttonText1}>If already a user, Sign In</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};
export default Registration;
