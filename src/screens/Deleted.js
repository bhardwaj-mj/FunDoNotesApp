import React, {useState, useContext, useEffect, useCallback} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {AuthContext} from '../navigation/AuthProvider';
import {fetchNoteData} from '../services/NoteServices';
import {useIsFocused} from '@react-navigation/native';
import NoteCard from '../components/NoteCard';

const Deleted = ({navigation}) => {
  const {user} = useContext(AuthContext);
  const [notes, setNotes] = useState([]);
  const isFocused = useIsFocused();
  const deleteNotes = useCallback(async () => {
    let notesData = await fetchNoteData(user.uid);

    let deleted = [];

    notesData.forEach(item => {
      if (item.deleted) {
        deleted.push(item);
      }
    });
    setNotes(deleted);
  }, [user.uid]);
  useEffect(() => {
    if (isFocused) {
      deleteNotes();
    }
  }, [isFocused, deleteNotes]);

  const editNotes = item => {
    navigation.navigate('DeleteNote', {
      editData: item,
      noteId: item.id,
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <View style={styles.topBar1}>
          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.openDrawer();
              }}>
              <Feather
                name="menu"
                color={'white'}
                size={25}
                style={styles.menuButton}
              />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.archiveText}>Deleted</Text>
          </View>
          <View>
            <TouchableOpacity style={styles.dotButton}>
              <MaterialCommunityIcons
                name="dots-vertical"
                color="white"
                size={20}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View>
        <View>
          <FlatList
            style={styles.list}
            data={notes}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.notesView}
                onPress={() => {
                  editNotes(item);
                }}>
                <NoteCard {...item} />
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  topBar: {
    justifyContent: 'center',
    padding: 10,
    paddingTop: 25,
  },
  topBar1: {
    backgroundColor: '#87ceeb',
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuButton: {
    padding: 10,
    paddingLeft: 10,
  },
  archiveText: {
    color: 'white',
    fontSize: 20,
    paddingLeft: 10,
    paddingRight: 160,
  },
  dotButton: {
    marginLeft: 70,
  },

  list: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  notesView: {
    backgroundColor: 'white',
    margin: 7,
    borderColor: '#87ceeb',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'space-between',
  },
});
export default Deleted;
