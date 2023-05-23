import React, {useState} from 'react';
import {Text, View, TouchableOpacity, Modal, StyleSheet} from 'react-native';
import moment from 'moment/moment';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import Languages from '../utility/localization/Languages';
import {useSelector} from 'react-redux';
import {Color, Flex, Font, Margin, Padding} from '../utility/Theme';

const RemainderBottomSheet = ({
  remainderBottomSheetVisible,
  setRemainderBottomSheetVisible,
  notificationDateAndTime,
  setNotificationDateAndTime,
}) => {
  const [mode, setMode] = useState('');
  const [show, setShow] = useState(false);
  const changeLang = useSelector(state => state.toggle);

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
              <Text style={styles.text}>
                {changeLang
                  ? Languages._props.hin.Later_Today
                  : Languages._props.en.Later_Today}
              </Text>
              <Text style={styles.timeText}>6:00 pm</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalBtn}
              onPress={addNotificationDateAndTime(1, 8, 0)}>
              <Feather name="clock" size={25} color="white" />
              <Text style={styles.text}>
                {changeLang
                  ? Languages._props.hin.Tomorrow_Morning
                  : Languages._props.en.Tomorrow_Morning}
              </Text>
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
              <Text style={styles.text}>
                {changeLang
                  ? Languages._props.hin.Choose_A_Date
                  : Languages._props.en.Choose_A_Date}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalBtn}
              onPress={() => {
                showMode('time');
              }}>
              <Feather name="clock" size={25} color="white" />
              <Text style={styles.text}>
                {changeLang
                  ? Languages._props.hin.Choose_A_Time
                  : Languages._props.en.Choose_A_Time}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalBtn}>
              <Ionicons name="location-outline" size={25} color="white" />
              <Text style={styles.text}>
                {changeLang
                  ? Languages._props.hin.Choose_A_Place
                  : Languages._props.en.Choose_A_Place}
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modal_container: {
    flex: Flex.ONE,
    justifyContent: 'center',
    backgroundColor: Color.SECONDARY,
    flexDirection: 'column',
  },
  modalBtn: {
    backgroundColor: Color.SECONDARY,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: Padding.PADDING_FOUR,
    flexDirection: 'row',
  },
  button: {
    flex: Flex.ONE,
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: Color.TINT,
  },
  text: {
    marginLeft: Margin.MARGIN_SEVEN,
    color: Color.PRIMARY,
    fontSize: Font.SECONDARY,
    width: '63%',
  },
  timeText: {
    marginLeft: 'auto',
    color: Color.PRIMARY,
    fontSize: Font.SECONDARY,
  },
});
export default RemainderBottomSheet;
