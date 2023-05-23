import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {AuthContext} from '../navigation/AuthProvider';
import {addNoteData, updateNoteData} from '../services/NoteServices';
import CreateNoteBottomSheet from '../components/CreateNoteBottomSheet';
import RemainderBottomSheet from '../components/RemainderBottomSheet';
import Chip from '../components/Chip';
import uuid from 'react-native-uuid';
import moment from 'moment';
import PushNotification from 'react-native-push-notification';
import Languages from '../utility/localization/Languages';
import {useSelector} from 'react-redux';

const CreateNote = ({navigation, route}) => {
  const noteData = route.params;

  const {user} = useContext(AuthContext);
  const [title, setTitle] = useState(noteData?.editData?.title || '');
  const [note, setNote] = useState(noteData?.editData?.note || '');
  const [pinned, setPinned] = useState(noteData?.editData?.pinned || false);
  const [archived, setArchived] = useState(
    noteData?.editData?.archived || false,
  );
  const [notificationDateAndTime, setNotificationDateAndTime] = useState(
    noteData?.editData?.notificationDateAndTime || '',
  );
  const [deleted, setDeleted] = useState(noteData?.editData?.deleted || false);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [remainderBottomSheetVisible, setRemainderBottomSheetVisible] =
    useState(false);

  let labelData =
    route.params?.checkedLabelsData || noteData?.editData?.labelData || [];

  const obtainedID = noteData?.noteId;
  const noteId = uuid.v4();
  const changeLang = useSelector(state => state.toggle);

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
          labelData,
          notificationDateAndTime,
        );
      } else {
        await addNoteData(
          title,
          note,
          pinned,
          archived,
          deleted,
          user.uid,
          noteId,
          labelData,
          notificationDateAndTime,
        );
        console.log(noteId);
      }
      notificationDateAndTime ? handleNotification() : null;
      navigation.goBack();
    }
  };
  const createChannels = () => {
    PushNotification.createChannel(
      {
        channelId: 'Remainders',
        channelName: 'Remainder Notification',
        channelDescription: 'Reminder for any task',
      },
      () => {},
    );
  };
  const handleNotification = () => {
    PushNotification.localNotificationSchedule({
      id: moment(notificationDateAndTime).unix(),
      channelId: 'Remainders',
      title: title,
      message: note,
      date: moment(notificationDateAndTime).toDate(),
    });
  };
  const cancelNotification = () => {
    setNotificationDateAndTime(null);
    PushNotification.cancelLocalNotification(
      moment(notificationDateAndTime).unix(),
    );
  };
  useEffect(() => {
    createChannels();
  }, []);
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
          <TouchableOpacity
            onPress={() =>
              setRemainderBottomSheetVisible(!remainderBottomSheetVisible)
            }>
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
              //navigation.navigate('Note');
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
            placeholder={
              changeLang
                ? Languages._props.hin.Title
                : Languages._props.en.Title
            }
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
              placeholder={
                changeLang
                  ? Languages._props.hin.Note
                  : Languages._props.en.Note
              }
              placeholderTextColor="#87ceeb"
              selectionColor={'#708090'}
              multiline={true}
            />
          </View>
          <View style={styles.labelContainer}>
            {notificationDateAndTime ? (
              <View style={styles.notificationChip}>
                <View style={styles.notificationContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      setRemainderBottomSheetVisible(
                        !remainderBottomSheetVisible,
                      );
                    }}>
                    <MaterialCommunityIcons
                      name="alarm"
                      size={20}
                      color={'white'}
                    />
                  </TouchableOpacity>
                  <Text style={styles.notificationText}>
                    {notificationDateAndTime
                      ? moment(notificationDateAndTime).format('LLLL')
                      : null}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      cancelNotification();
                    }}>
                    <MaterialCommunityIcons
                      name="close"
                      size={20}
                      color={'white'}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ) : null}
            {labelData.map(item => (
              <Chip key={item.id}>{item.label}</Chip>
            ))}
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

        <Text style={styles.editText}>
          {changeLang
            ? Languages._props.hin.Edited
            : Languages._props.en.Edited}
        </Text>

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
        {bottomSheetVisible ? (
          <CreateNoteBottomSheet
            visible={bottomSheetVisible}
            onRequestClose={() => setBottomSheetVisible(false)}
            hideModal={() => setBottomSheetVisible(false)}
            onPressDelete={() => {
              setDeleted(!deleted);
              //navigation.navigate('Note');
            }}
            labelPress={() =>
              navigation.navigate('AddLabelsToNote', {
                noteId: obtainedID,
                labelData: labelData,
              })
            }
          />
        ) : null}
      </View>
      <View>
        <RemainderBottomSheet
          remainderBottomSheetVisible={remainderBottomSheetVisible}
          setRemainderBottomSheetVisible={setRemainderBottomSheetVisible}
          notificationDateAndTime={notificationDateAndTime}
          setNotificationDateAndTime={setNotificationDateAndTime}
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
  notificationChip: {
    borderRadius: 20,
    backgroundColor: '#87ceeb',
    padding: 8,
    margin: 10,
  },
  notificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationText: {
    marginLeft: 10,
    marginRight: 10,
    color: 'white',
    fontSize: 18,
  },
  labelContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
export default CreateNote;
