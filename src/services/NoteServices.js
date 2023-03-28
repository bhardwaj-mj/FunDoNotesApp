import firestore from '@react-native-firebase/firestore';

export const addNoteData = async (
  title,
  note,
  pinned,
  archived,
  deleted,
  user,
  noteId,
  labelData,
) => {
  try {
    await firestore()
      .collection('NoteDetails')
      .doc(user)
      .collection('Notes')
      .doc(noteId)
      .set({
        title: title,
        note: note,
        pinned: pinned,
        archived: archived,
        deleted: deleted,
        labelData: labelData,
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
  deleted,
  user,
  noteId,
  labelData,
) => {
  await firestore()
    .collection('NoteDetails')
    .doc(user)
    .collection('Notes')
    .doc(noteId)
    .update({
      title: title,
      note: note,
      pinned: pinned,
      archived: archived,
      deleted: deleted,
      labelData: labelData,
    });
};
export const deleteNoteData = async user => {
  try {
    await firestore()
      .collection('NoteDetails')
      .doc(user)
      .collection('Notes')
      .delete();
    console.log('Note Deleted!');
  } catch (e) {
    console.log(e);
  }
};
