import React from 'react';
import {Text, View, TouchableOpacity, Modal, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Languages from '../utility/localization/Languages';
import {useSelector} from 'react-redux';

const ImagePickerModal = props => {
  const changeLang = useSelector(state => state.toggle);
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
            <TouchableOpacity
              style={styles.modalBtn}
              onPress={props.onPressOpenCamera}>
              <Text style={styles.text}>
                {changeLang
                  ? Languages._props.hin.Camera
                  : Languages._props.en.Camera}
              </Text>
              <Ionicons name="camera" size={40} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalBtn}
              onPress={props.onPressOpenGalary}>
              <Text style={styles.text}>
                {changeLang
                  ? Languages._props.hin.Galary
                  : Languages._props.en.Galary}
              </Text>
              <FontAwesome name="photo" size={40} color="white" />
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
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'skyblue',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    flexDirection: 'row',
  },
  modalBtn: {
    backgroundColor: 'skyblue',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 40,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
