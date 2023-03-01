import firestore from '@react-native-firebase/firestore';

export const addUserData = async (email, name, user) => {
  await firestore().collection('Users').doc(user).set({email, name});
};
export const fetchUserData = async user => {
  const userData = [];
  const documentSnapshot = await firestore()
    .collection('Users')
    .doc(user.uid)
    .get();
  console.log(user.uid);
  console.log(documentSnapshot.exists, 'Doc exist?');
  console.log('User data: ', documentSnapshot.data());
  const name = documentSnapshot.data().name;
  userData.push(name);
  return userData;
};
export const updateUserData = async (user, photo) => {
  await firestore().collection('Profile Details').doc(user.uid).update({photo});
};
