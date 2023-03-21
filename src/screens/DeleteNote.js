import React, {useContext, useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Text,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {deleteNoteData} from '../services/NoteServices';
import {AuthContext} from '../navigation/AuthProvider';
import DeleteNoteBottomSheet from '../components/DeleteNoteBottomSheet';

const DeleteNote = ({navigation, route}) => {
  const noteData = route.params;
  const {user} = useContext(AuthContext);
  const [title, setTitle] = useState(noteData?.editData?.title);
  const [note, setNote] = useState(noteData?.editData?.note);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const deleteNotes = async () => {
    await deleteNoteData(user.uid);
  };
  const onPressBack = async () => {
    navigation.goBack();
  };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.viewOne}>
        <View style={styles.viewTwo}>
          <TouchableOpacity onPress={onPressBack}>
            <Ionicons
              name="arrow-back"
              size={25}
              color="#87ceeb"
              style={styles.backButton}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.viewThree}>
        <View>
          <TextInput
            style={styles.titleText}
            value={title}
            editable={false}
            placeholder="Title"
            placeholderTextColor="#87ceeb"
          />
        </View>
        <ScrollView>
          <View>
            <TextInput
              style={styles.noteText}
              value={note}
              editable={false}
              placeholder="Note"
              placeholderTextColor="#87ceeb"
              multiline={true}
            />
          </View>
        </ScrollView>
      </View>
      <View style={styles.viewFour}>
        <View style={styles.viewFive}>
          <TouchableOpacity style={styles.plusButton} disabled={true}>
            <MaterialCommunityIcons
              name="plus-box-outline"
              color="#87ceeb"
              size={20}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.colorButton} disabled={true}>
            <Ionicons name="color-palette-outline" color="#87ceeb" size={20} />
          </TouchableOpacity>
        </View>

        <Text style={styles.editText}>Edited </Text>

        <TouchableOpacity
          onPress={() => {
            setBottomSheetVisible(!bottomSheetVisible);
          }}>
          <MaterialCommunityIcons
            name="dots-vertical"
            color="#87ceeb"
            size={20}
          />
        </TouchableOpacity>
      </View>
      <View>
        <DeleteNoteBottomSheet
          visible={bottomSheetVisible}
          onRequestClose={() => setBottomSheetVisible(false)}
          hideModal={() => setBottomSheetVisible(false)}
          onPressDeleteForever={async () => {
            await deleteNoteData(user.uid);
            console.log('delete');
          }}
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
  viewOne: {
    justifyContent: 'center',
    padding: 10,
    paddingTop: 10,
  },
  viewTwo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: 10,
    paddingLeft: 10,
  },
  viewThree: {
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
  viewFour: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 20,
  },
  viewFive: {
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
export default DeleteNote;
