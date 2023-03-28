import firestore from '@react-native-firebase/firestore';

export const addLabelData = async (label, user) => {
  try {
    await firestore()
      .collection('NoteDetails')
      .doc(user)
      .collection('Labels')
      .add({
        label: label,
      });
  } catch (e) {
    console.log(e);
  }
};
export const fetchLabelData = async user => {
  try {
    const labelsData = [];
    const querySnapshot = await firestore()
      .collection('NoteDetails')
      .doc(user)
      .collection('Labels')
      .get();

    querySnapshot.forEach(documentSnapshot => {
      const data = documentSnapshot.data();
      data.id = documentSnapshot.id;
      labelsData.push(data);
    });
    return labelsData;
  } catch (e) {
    console.log(e);
  }
};
export const updateLabelData = async (label, user, labelId) => {
  try {
    await firestore()
      .collection('NoteDetails')
      .doc(user)
      .collection('Labels')
      .doc(labelId)
      .update({
        label: label,
      });
  } catch (e) {
    console.log(e);
  }
};
export const deleteLabelData = async (user, labelId) => {
  try {
    await firestore()
      .collection('NoteDetails')
      .doc(user)
      .collection('Labels')
      .doc(labelId)
      .delete();
  } catch (e) {
    console.log(e);
  }
};
