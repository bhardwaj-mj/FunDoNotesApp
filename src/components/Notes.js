import React, {useState, useContext, useEffect, useCallback} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import {AuthContext} from '../navigation/AuthProvider';
import {fetchNoteData} from '../services/NoteServices';
import {useIsFocused} from '@react-navigation/native';
import NoteCard from './NoteCard';
import {pageStyles} from '../utility/GlobalStyle';
import {useSelector} from 'react-redux';
import Languages from '../utility/localization/Languages';
import {Color, Font, Margin} from '../utility/Theme';

const Notes = ({navigation, layout}) => {
  const [otherNotes, setOtherNotes] = useState([]);
  const [pinnedNotes, setPinnedNotes] = useState([]);
  const {user} = useContext(AuthContext);
  const isFocused = useIsFocused();
  const changeLang = useSelector(state => state.toggle);
  const localizedPinned = changeLang
    ? Languages._props.hin.Pinned
    : Languages._props.en.Pinned;
  const localizedOthers = changeLang
    ? Languages._props.hin.Others
    : Languages._props.en.Others;

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
        {pinnedNotes && (
          <Text style={styles.heading}>
            {pinnedNotes.length ? localizedPinned : ''}
          </Text>
        )}
        <FlatList
          numColumns={layout ? 2 : 1}
          key={layout ? 2 : 1}
          style={pageStyles.list}
          data={pinnedNotes}
          ListFooterComponent={OthersFlatList}
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
    );
  };
  const OthersFlatList = () => {
    return (
      <View>
        <Text style={styles.heading}>
          {pinnedNotes.length ? localizedOthers : ''}
        </Text>
        <FlatList
          numColumns={layout ? 2 : 1}
          key={layout ? 2 : 1}
          data={otherNotes}
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
  heading: {
    color: Color.SECONDARY,
    fontSize: Font.SECONDARY,
    fontWeight: 'bold',
    marginLeft: Margin.MARGIN_SEVEN,
    marginTop: Margin.MARGIN_SIX,
  },
});
export default Notes;
