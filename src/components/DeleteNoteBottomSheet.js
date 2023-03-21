import React from 'react';
import {Text, View, TouchableOpacity, Modal, StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const DeleteNoteBottomSheet = props => {
  if (props.visible) {
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
                onPress={props.onPressDelete}>
                <MaterialIcons name="restore" size={20} color="white" />
                <Text style={styles.text}>Restore</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalBtn}
                onPress={props.onPressDeleteForever}>
                <MaterialCommunityIcons
                  name="delete-forever-outline"
                  size={20}
                  color="white"
                />
                <Text style={styles.text}>Delete forever</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    );
  }
  return null;
};

const styles = StyleSheet.create({
  modal_container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'skyblue',
    flexDirection: 'column',
  },
  modalBtn: {
    backgroundColor: 'skyblue',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 10,
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  text: {
    marginLeft: 20,
    color: 'white',
    fontSize: 13,
  },
});
export default DeleteNoteBottomSheet;
