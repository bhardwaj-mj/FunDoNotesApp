import React, {useState, useContext, useEffect} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {AuthContext} from '../navigation/AuthProvider';
import {fetchNoteData} from '../services/NoteServices';
const Notes = () => {
  const [note, setNote] = useState('');
  const {user} = useContext(AuthContext);
  const getNotesData = async () => {
    let notesData = await fetchNoteData(user.uid);
    console.log(notesData);
    let notesArray = [];
    notesData.forEach(item => {
      notesArray.push(item);
    });
    setNote(notesArray);
    //console.log(notesArray);
    //console.log(note);
  };
  useEffect(() => {
    getNotesData();
  }, []);

  return (
    <View>
      {note.map(item => (
        <TouchableOpacity style={styles.notesView}>
          <Text style={styles.text}>{item.title}</Text>
          <Text style={styles.text}>{item.note}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
const styles = StyleSheet.create({
  notesView: {
    backgroundColor: 'white',
    margin: 10,
    borderColor: '#87ceeb',
    borderWidth: 1,
  },
  text: {
    color: '#87ceeb',
  },
});
export default Notes;
