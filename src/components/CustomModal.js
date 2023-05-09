import React from 'react';
import {View, Text, Modal, TouchableOpacity, StyleSheet} from 'react-native';
import {Avatar} from 'react-native-elements';
import Languages from '../utility/localization/Languages';
import {useSelector} from 'react-redux';
const CustomModal = props => {
  const changeLang = useSelector(state => state.toggle);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.visible}
      onRequestClose={props.onRequestClose}
      hardwareAccelerated>
      <View style={{backgroundColor: '#000000aa', flex: 1}}>
        <TouchableOpacity
          style={styles.modalView}
          onPress={() => props.hideModal()}>
          <TouchableOpacity
            style={styles.avatar}
            onPress={props.onPressEditImage}>
            <Avatar rounded size="medium" source={props.source} />
          </TouchableOpacity>

          <Text style={styles.userText}>{props.fullName}</Text>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={props.onPressLogout}>
            <Text style={styles.logoutText}>
              {changeLang
                ? Languages._props.hin.Logout
                : Languages._props.en.Logout}
            </Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modalView: {
    marginTop: 80,
    backgroundColor: '#87ceeb',
    margin: 50,
    padding: 40,
    borderRadius: 10,
  },
  avatar: {
    alignItems: 'center',
  },
  userText: {
    marginTop: 10,
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  logoutButton: {
    alignItems: 'center',
    marginTop: 10,
  },
  logoutText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
export default CustomModal;
