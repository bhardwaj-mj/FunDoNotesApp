import React from 'react';
import {View, Text, Modal, TouchableOpacity, StyleSheet} from 'react-native';
import {Avatar} from 'react-native-elements';
const CustomModal = props => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.visible}
      onRequestClose={props.onRequestClose}
      hardwareAccelerated>
      <View style={{backgroundColor: '#000000aa', flex: 1}}>
        <View style={styles.modalView}>
          <TouchableOpacity
            style={styles.avatar}
            onPress={() => props.hideModal()}>
            <Avatar
              rounded
              size="large"
              source={{
                uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.avatar}
            onPress={props.onPressEditImage}>
            <Text>Edit Image</Text>
          </TouchableOpacity>
          <Text style={styles.userText}>{props.fullName}</Text>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={props.onPressLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
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
