import React, {useContext, useCallback, useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AuthContext} from '../navigation/AuthProvider';
import {layoutChange} from '../redux/Action';
import {useSelector, useDispatch} from 'react-redux';
import {fetchNoteData} from '../services/NoteServices';
import {useIsFocused} from '@react-navigation/native';
import NoteCard from '../components/NoteCard';
import {pageStyles} from '../utility/GlobalStyle';
import Languages from '../utility/localization/Languages';
const Remainder = ({navigation}) => {
  const {user} = useContext(AuthContext);
  const layout = useSelector(state => state.layout);
  const dispatch = useDispatch();
  const [notes, setNotes] = useState([]);
  const isFocused = useIsFocused();
  const changeLang = useSelector(state => state.toggle);
  const archiveNotes = useCallback(async () => {
    let notesData = await fetchNoteData(user.uid);

    let archived = [];

    notesData.forEach(item => {
      if (item.notificationDateAndTime) {
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
        <TouchableOpacity
          onPress={() => {
            navigation.openDrawer();
          }}>
          <Feather name="menu" color={'#87ceeb'} size={25} />
        </TouchableOpacity>
        <Text style={styles.text}>
          {changeLang
            ? Languages._props.hin.Reminder
            : Languages._props.en.Reminder}
        </Text>
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => navigation.navigate('SearchNote')}>
          <Ionicons name="search" size={25} color={'#87ceeb'} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            dispatch(layoutChange());
          }}>
          <MaterialCommunityIcons
            name={layout ? 'view-agenda-outline' : 'view-grid-outline'}
            color={'#87ceeb'}
            size={25}
          />
        </TouchableOpacity>
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
  container: {flex: 1},
  topBar: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
    paddingTop: 25,
    flexDirection: 'row',
    margin: 10,
  },
  text: {
    color: '#87ceeb',
    fontSize: 20,
    marginLeft: 20,
    fontWeight: '500',
    width: '62%',
  },
  searchButton: {
    paddingRight: 20,
    paddingLeft: 20,
  },
});
export default Remainder;
