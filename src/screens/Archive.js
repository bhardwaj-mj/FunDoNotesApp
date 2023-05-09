import React, {useState, useContext, useEffect, useCallback} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {AuthContext} from '../navigation/AuthProvider';
import {fetchNoteData} from '../services/NoteServices';
import {useIsFocused} from '@react-navigation/native';
import NoteCard from '../components/NoteCard';
import {layoutChange} from '../redux/Action';
import {useSelector, useDispatch} from 'react-redux';
import {pageStyles} from '../utility/GlobalStyle';
import Languages from '../utility/localization/Languages';
const Archive = ({navigation}) => {
  const {user} = useContext(AuthContext);
  const [notes, setNotes] = useState([]);
  const isFocused = useIsFocused();
  const layout = useSelector(state => state.layout);
  const changeLang = useSelector(state => state.toggle);
  const dispatch = useDispatch();

  const archiveNotes = useCallback(async () => {
    let notesData = await fetchNoteData(user.uid);

    let archived = [];

    notesData.forEach(item => {
      if (item.archived) {
        archived.push(item);
      }
    });
    setNotes(archived);
  }, [user.uid]);
  useEffect(() => {
    if (isFocused) {
      archiveNotes();
    }
  }, [isFocused, archiveNotes]);

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
            <Text style={styles.archiveText}>
              {changeLang
                ? Languages._props.hin.Archive
                : Languages._props.en.Archive}
            </Text>
          </View>
          <View>
            <TouchableOpacity style={styles.searchButton}>
              <Ionicons name="search" size={25} color={'white'} />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={() => dispatch(layoutChange())}>
              <MaterialCommunityIcons
                name={layout ? 'view-agenda-outline' : 'view-grid-outline'}
                color={'white'}
                size={25}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View>
        <View>
          <FlatList
            style={pageStyles.list}
            data={notes}
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
});
export default Archive;
