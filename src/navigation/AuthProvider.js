import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {addUserData} from '../services/UserServices';
//import firestore from '@react-native-firebase/firestore';
export const AuthContext = createContext();
export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        userLogin: async (email, password, errorCallBack) => {
          try {
            const userDetails = await auth().signInWithEmailAndPassword(
              email,
              password,
            );
            console.log(userDetails);
          } catch (e) {
            console.log(e);
            errorCallBack(e.code);
          }
        },
        userRegistration: async (email, password, errorCallBack, fullName) => {
          try {
            const userDetails = await auth().createUserWithEmailAndPassword(
              email,
              password,
            );

            addUserData(email, fullName, userDetails.user.uid);
          } catch (e) {
            console.log(e);
            errorCallBack(e.code);
          }
        },
        userLogout: async () => {
          try {
            await auth().signOut();
          } catch (e) {
            console.log(e);
          }
        },
        googleLogin: async () => {
          try {
            const userDetails = await GoogleSignin.hasPlayServices({
              showPlayServicesUpdateDialog: true,
            });
            console.log(userDetails);
            const {idToken} = await GoogleSignin.signIn();

            const googleCredential =
              auth.GoogleAuthProvider.credential(idToken);

            return auth().signInWithCredential(googleCredential);
          } catch (e) {
            console.log(e);
          }
        },
        forgotPassword: async email => {
          try {
            await auth().sendPasswordResetEmail(email);
          } catch (e) {
            console.log(e);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
