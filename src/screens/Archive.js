import React, {useState, useContext, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AuthContext} from '../navigation/AuthProvider';
import {fetchNoteData} from '../services/NoteServices';
import {useIsFocused} from '@react-navigation/native';
import NoteCard from '../components/NoteCard';

const Archive = ({navigation}) => {
  const {user} = useContext(AuthContext);
  const [notes, setNotes] = useState([]);
  const isFocused = useIsFocused();
  const archiveNotes = async () => {
    let notesData = await fetchNoteData(user.uid);

    let archived = [];

    notesData.forEach(item => {
      if (item.archived) {
        archived.push(item);
      }
    });
    setNotes(archived);
  };
  useEffect(() => {
    if (isFocused) {
      archiveNotes();
    }
  }, [isFocused]);

  const editNotes = item => {
    navigation.navigate('CreateNote', {
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
            <Text style={styles.archiveText}>Archive</Text>
          </View>
          <View>
            <TouchableOpacity style={styles.searchButton}>
              <Ionicons name="search" size={25} color={'white'} />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity>
              <Feather name="grid" color={'white'} size={25} />
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
  searchButton: {
    paddingRight: 20,
    paddingLeft: 20,
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
export default Archive;
