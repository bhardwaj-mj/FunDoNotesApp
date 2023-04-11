import React, {useEffect} from 'react';
import Providers from './src/navigation/Index';
import messaging from '@react-native-firebase/messaging';
const App = () => {
  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    console.log('Authorization status (authStatus):', authStatus);
    return (
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL
    );
  };
  useEffect(() => {
    if (requestUserPermission()) {
      messaging()
        .getToken()
        .then(fcmToken => {
          console.log('FCM Token->', fcmToken);
        });
    } else {
      console.log('Not Authorization status:');
    }
  }, []);
  return <Providers />;
};

export default App;
