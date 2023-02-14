import React, {useContext} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {AuthContext} from '../navigation/AuthProvider';
const Home = () => {
  const {userLogout} = useContext(AuthContext);
  return (
    <View>
      <Text>Welcome</Text>
      <TouchableOpacity onPress={() => userLogout()}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Home;
