import firestore from '@react-native-firebase/firestore';

export const addNoteData = async (title, note, pinned, archived, user) => {
  try {
    await firestore()
      .collection('NoteDetails')
      .doc(user)
      .collection('Notes')
      .add({
        title: title,
        note: note,
        pinned: pinned,
        archived: archived,
      });

    console.log('Note added!');
  } catch (e) {
    console.log(e);
  }
};
export const fetchNoteData = async user => {
  try {
    const notesData = [];
    const querySnapshot = await firestore()
      .collection('NoteDetails')
      .doc(user)
      .collection('Notes')
      .get();

    querySnapshot.forEach(documentSnapshot => {
      const data = documentSnapshot.data();
      data.id = documentSnapshot.id;
      notesData.push(data);
    });
    return notesData;
  } catch (e) {
    console.log(e);
  }
};
export const updateNoteData = async (
  title,
  note,
  pinned,
  archived,
  user,
  ObtainedId,
) => {
  await firestore()
    .collection('NoteDetails')
    .doc(user)
    .collection('Notes')
    .doc(ObtainedId)
    .update({
      title: title,
      note: note,
      pinned: pinned,
      archived: archived,
    });
};
