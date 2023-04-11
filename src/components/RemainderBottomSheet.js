import React, {useState} from 'react';
import {Text, View, TouchableOpacity, Modal, StyleSheet} from 'react-native';
import moment from 'moment/moment';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import RNDateTimePicker from '@react-native-community/datetimepicker';

const RemainderBottomSheet = ({
  remainderBottomSheetVisible,
  setRemainderBottomSheetVisible,
  notificationDateAndTime,
  setNotificationDateAndTime,
}) => {
  const [mode, setMode] = useState('');
  const [show, setShow] = useState(false);

  const addNotificationDateAndTime =
    (days = 0, hours = 0, minutes = 0) =>
    () => {
      const selectedDateAndTime = moment()
        .add(days, 'days')
        .hour(hours)
        .minute(minutes);
      const dateAndTime = selectedDateAndTime.toISOString();

      setNotificationDateAndTime(dateAndTime);
      setRemainderBottomSheetVisible(false);
    };
  const changeNotificationDateAndTime = (event, selectedDateAndTime) => {
    setShow(false);
    let date = selectedDateAndTime.toISOString();
    setNotificationDateAndTime(date);
    setRemainderBottomSheetVisible(false);
    setShow(false);
  };
  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };
  return (
    <View>
      <View>
        {show && (
          <RNDateTimePicker
            value={
              notificationDateAndTime
                ? new Date(notificationDateAndTime)
                : new Date()
            }
            mode={mode}
            display={'spinner'}
            onChange={changeNotificationDateAndTime}
          />
        )}
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={remainderBottomSheetVisible}
        onRequestClose={() => setRemainderBottomSheetVisible(false)}
        hardwareAccelerated>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0}
          onPress={() => setRemainderBottomSheetVisible(false)}>
          <View style={styles.modal_container}>
            <TouchableOpacity
              style={styles.modalBtn}
              onPress={addNotificationDateAndTime(0, 18, 0)}>
              <Feather name="clock" size={25} color="white" />
              <Text style={styles.text}>Later today</Text>
              <Text style={styles.timeText}>6:00 pm</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalBtn}
              onPress={addNotificationDateAndTime(1, 8, 0)}>
              <Feather name="clock" size={25} color="white" />
              <Text style={styles.text}>Tomorrow morning</Text>
              <Text style={styles.timeText}>8:00 am</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalBtn}
              onPress={addNotificationDateAndTime(7, 8, 0)}>
              <Feather name="clock" size={25} color="white" />
              <Text style={styles.text}>
                {moment().add(7, 'days').format('dddd')} morning
              </Text>
              <Text style={styles.timeText}>
                {moment().add(7, 'days').format('ddd')}, 8:00 am
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalBtn}
              onPress={() => {
                showMode('date');
              }}>
              <Feather name="clock" size={25} color="white" />
              <Text style={styles.text}>Choose a date</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalBtn}
              onPress={() => {
                showMode('time');
              }}>
              <Feather name="clock" size={25} color="white" />
              <Text style={styles.text}>Choose a time</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalBtn}>
              <Ionicons name="location-outline" size={25} color="white" />
              <Text style={styles.text}>Choose a place</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modal_container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#87ceeb',
    flexDirection: 'column',
  },
  modalBtn: {
    backgroundColor: '#87ceeb',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#000000aa',
  },
  text: {
    marginLeft: 20,
    color: 'white',
    fontSize: 15,
    width: '63%',
  },
  timeText: {
    marginLeft: 'auto',
    color: 'white',
    fontSize: 15,
  },
});
export default RemainderBottomSheet;
