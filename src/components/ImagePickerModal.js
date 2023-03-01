import React from 'react';
import {View, TouchableOpacity, Modal, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ImagePickerModal = props => {
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.visible}
        onRequestClose={props.onRequestClose}
        hardwareAccelerated>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={1}
          onPress={() => props.hideModal()}>
          <View style={styles.modal_container}>
            <TouchableOpacity style={styles.modalBtn}>
              <Ionicons name="camera" size={25} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalBtn}
              onPress={props.onPressOpenGalary()}>
              <FontAwesome name="photo" size={25} color="white" />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default ImagePickerModal;

const styles = StyleSheet.create({
  modal_container: {
    width: 50,
    height: 80,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 20,
  },
  modalBtn: {
    backgroundColor: 'skyblue',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#555',
    borderWidth: 1,
    borderRadius: 10,
    margin: 5,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
