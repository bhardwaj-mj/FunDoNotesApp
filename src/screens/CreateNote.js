import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {AuthContext} from '../navigation/AuthProvider';
import {addNoteData, updateNoteData} from '../services/NoteServices';
import CreateNoteBottomSheet from '../components/CreateNoteBottomSheet';

const CreateNote = ({navigation, route}) => {
  const noteData = route.params;

  const {user} = useContext(AuthContext);
  const [title, setTitle] = useState(noteData?.editData?.title || '');
  const [note, setNote] = useState(noteData?.editData?.note || '');
  const [pinned, setPinned] = useState(noteData?.editData?.pinned || false);
  const [archived, setArchived] = useState(
    noteData?.editData?.archived || false,
  );
  const [deleted, setDeleted] = useState(noteData?.editData?.deleted || false);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);

  const obtainedID = noteData?.noteId;

  const onPressBack = async () => {
    if (title === '' && note === '') {
      navigation.goBack();
    } else {
      if (obtainedID) {
        await updateNoteData(
          title,
          note,
          pinned,
          archived,
          deleted,
          user.uid,
          obtainedID,
        );
      } else {
        await addNoteData(title, note, pinned, archived, deleted, user.uid);
      }
      navigation.goBack();
    }
  };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.view1}>
        <View style={styles.view2}>
          <TouchableOpacity onPress={onPressBack}>
            <Ionicons
              name="arrow-back"
              size={25}
              color="#87ceeb"
              style={styles.backButton}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.pinButton}
            onPress={() => {
              setPinned(!pinned);
            }}>
            <MaterialCommunityIcons
              name={pinned ? 'pin' : 'pin-outline'}
              size={25}
              color="#87ceeb"
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons
              name="notifications-outline"
              size={25}
              color="#87ceeb"
              style={styles.notificationButton}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setArchived(!archived);
              Alert.alert('Note Archived');
            }}>
            <MaterialCommunityIcons
              name="archive-arrow-down-outline"
              size={25}
              color="#87ceeb"
              style={styles.archiveButton}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.view3}>
        <View>
          <TextInput
            style={styles.titleText}
            value={title}
            onChangeText={text => setTitle(text)}
            placeholder="Title"
            placeholderTextColor="#87ceeb"
            selectionColor={'#708090'}
          />
        </View>
        <ScrollView>
          <View>
            <TextInput
              style={styles.noteText}
              value={note}
              onChangeText={text => setNote(text)}
              placeholder="Note"
              placeholderTextColor="#87ceeb"
              selectionColor={'#708090'}
              multiline={true}
            />
          </View>
        </ScrollView>
      </View>
      <View style={styles.bottomViewOne}>
        <View style={styles.bottomViewTwo}>
          <TouchableOpacity style={styles.plusButton}>
            <MaterialCommunityIcons
              name="plus-box-outline"
              color="#87ceeb"
              size={20}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.colorButton}>
            <Ionicons name="color-palette-outline" color="#87ceeb" size={20} />
          </TouchableOpacity>
        </View>

        <Text style={styles.editText}>Edited </Text>

        <TouchableOpacity
          onPress={() => {
            setBottomSheetVisible(!bottomSheetVisible);
            console.log('hello');
          }}>
          <MaterialCommunityIcons
            name="dots-vertical"
            color="#87ceeb"
            size={20}
          />
        </TouchableOpacity>
      </View>
      <View>
        <CreateNoteBottomSheet
          visible={bottomSheetVisible}
          onRequestClose={() => setBottomSheetVisible(false)}
          hideModal={() => setBottomSheetVisible(false)}
          onPressDelete={() => setDeleted(!deleted)}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  view1: {
    justifyContent: 'center',
    padding: 10,
    paddingTop: 10,
  },
  view2: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: 10,
    paddingLeft: 10,
  },
  pinButton: {
    marginLeft: 200,
  },
  notificationButton: {
    marginLeft: 20,
  },
  archiveButton: {
    marginLeft: 20,
  },
  view3: {
    flex: 1,
    paddingHorizontal: 10,
    margin: 10,
  },
  titleText: {
    fontSize: 25,
    margin: 10,
    color: '#87ceeb',
  },
  noteText: {
    fontSize: 20,
    margin: 10,
    color: '#87ceeb',
  },
  bottomViewOne: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 20,
  },
  bottomViewTwo: {
    flexDirection: 'row',
  },
  plusButton: {
    marginRight: 15,
  },
  colorButton: {
    marginLeft: 15,
  },
  editText: {
    fontSize: 20,
    color: '#87ceeb',
  },
});
export default CreateNote;
