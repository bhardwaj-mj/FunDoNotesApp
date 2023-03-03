import firestore from '@react-native-firebase/firestore';

export const addUserData = async (email, name, photo, user) => {
  await firestore().collection('Users').doc(user).set({email, name, photo});
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
  const picture = documentSnapshot.data().photo;
  userData.push(name);
  userData.push(picture);

  return userData;
};
export const updateUserData = async (user, photo) => {
  await firestore().collection('Users').doc(user.uid).update({photo});
};
