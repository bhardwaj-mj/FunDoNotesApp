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
import {useSelector} from 'react-redux';
import NoteCard from '../components/NoteCard';
import {pageStyles} from '../utility/GlobalStyle';
import Languages from '../utility/localization/Languages';

const SearchNote = ({navigation}) => {
  const [noteData, setNoteData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const isFocused = useIsFocused();
  const {user} = useContext(AuthContext);
  const layout = useSelector(state => state.layout);
  const changeLang = useSelector(state => state.toggle);
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
          placeholder={
            changeLang
              ? Languages._props.hin.Search_Your_Notes
              : Languages._props.en.Search_Your_Notes
          }
          autoFocus={true}
          placeholderTextColor="white"
          onChangeText={text => getSearchTerm(text)}
        />
      </View>
      <View style={{flex: 1}}>
        <View>
          <FlatList
            style={pageStyles.list}
            data={searchData}
            numColumns={layout ? 2 : 1}
            key={layout ? 2 : 1}
            renderItem={({item}) => (
              <TouchableOpacity
                style={layout ? pageStyles.gridLayout : pageStyles.listLayout}
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
});
export default SearchNote;
