import React, {useState, useContext, useEffect, useCallback} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import {AuthContext} from '../navigation/AuthProvider';
import {fetchNoteData} from '../services/NoteServices';
import {useIsFocused} from '@react-navigation/native';
import NoteCard from './NoteCard';

const Notes = ({navigation, layout}) => {
  const [otherNotes, setOtherNotes] = useState([]);
  const [pinnedNotes, setPinnedNotes] = useState([]);
  const {user} = useContext(AuthContext);
  const isFocused = useIsFocused();

  const getNotesData = useCallback(async () => {
    let notesData = await fetchNoteData(user.uid);

    let pinned = [];
    let others = [];

    notesData.forEach(item => {
      if (item.pinned) {
        pinned.push(item);
      }
      if (!item.pinned && !item.archived && !item.deleted) {
        others.push(item);
      }
    });
    setPinnedNotes(pinned);
    setOtherNotes(others);
  }, [user.uid]);
  useEffect(() => {
    if (isFocused) {
      getNotesData();
    }
  }, [isFocused, getNotesData]);

  const editNotes = item => {
    navigation.navigate('CreateNote', {
      editData: item,
      noteId: item.id,
    });
  };
  const PinnedFlatList = () => {
    return (
      <View>
        <Text style={styles.heading}>{pinnedNotes.length ? 'Pinned' : ''}</Text>
        <FlatList
          numColumns={layout ? 2 : 1}
          key={layout ? 2 : 1}
          style={styles.list}
          data={pinnedNotes}
          ListFooterComponent={OthersFlatList}
          renderItem={({item}) => (
            <TouchableOpacity
              style={layout ? styles.gridLayout : styles.listLayout}
              onPress={() => {
                editNotes(item);
              }}>
              <NoteCard {...item} />
            </TouchableOpacity>
          )}
        />
      </View>
    );
  };
  const OthersFlatList = () => {
    return (
      <View>
        <Text style={styles.heading}>{pinnedNotes.length ? 'Others' : ''}</Text>
        <FlatList
          numColumns={layout ? 2 : 1}
          key={layout ? 2 : 1}
          data={otherNotes}
          renderItem={({item}) => (
            <TouchableOpacity
              style={layout ? styles.gridLayout : styles.listLayout}
              onPress={() => {
                editNotes(item);
              }}>
              <NoteCard {...item} />
            </TouchableOpacity>
          )}
        />
      </View>
    );
  };

  return (
    <View>
      <FlatList
        numColumns={layout ? 2 : 1}
        key={layout ? 2 : 1}
        ListHeaderComponent={PinnedFlatList}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  list: {
    marginLeft: 10,
    marginRight: 10,
  },
  listLayout: {
    backgroundColor: 'white',
    margin: 7,
    borderColor: '#87ceeb',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  gridLayout: {
    backgroundColor: 'white',
    margin: '2.5%',
    borderColor: '#87ceeb',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    width: '45%',
  },
  heading: {
    color: '#87ceeb',
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 15,
  },
});
export default Notes;
