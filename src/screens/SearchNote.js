import React, {useState, useContext, useEffect, useCallback} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {fetchNoteData} from '../services/NoteServices';
import {AuthContext} from '../navigation/AuthProvider';
import {useIsFocused} from '@react-navigation/native';
import NoteCard from '../components/NoteCard';
const SearchNote = ({navigation}) => {
  const [noteData, setNoteData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const isFocused = useIsFocused();
  const {user} = useContext(AuthContext);
  const fetchData = useCallback(async () => {
    let data = await fetchNoteData(user.uid);
    setNoteData(data);
  }, [user.uid]);

  const getSearchTerm = text => {
    const searchedData = noteData.filter(
      item =>
        item.title?.toUpperCase()?.includes(text.toUpperCase()) ||
        item.note?.toUpperCase()?.includes(text.toUpperCase()),
    );
    setSearchData(searchedData);
  };
  useEffect(() => {
    if (isFocused) {
      fetchData();
    }
  }, [fetchData, isFocused]);
  const editNotes = item => {
    navigation.navigate('CreateNote', {
      editData: item,
      noteId: item.id,
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={25} color="white" />
        </TouchableOpacity>
        <TextInput
          style={styles.textInput}
          placeholder="Search your notes"
          autoFocus={true}
          placeholderTextColor="white"
          onChangeText={text => getSearchTerm(text)}
        />
      </View>
      <View style={{flex: 1}}>
        <View>
          <FlatList
            style={styles.list}
            data={searchData}
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
    backgroundColor: 'white',
  },
  searchBar: {
    padding: 10,
    flexDirection: 'row',
    backgroundColor: '#87ceeb',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  textInput: {
    color: 'white',
    fontSize: 20,
    marginLeft: 20,
    width: '80%',
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
export default SearchNote;
