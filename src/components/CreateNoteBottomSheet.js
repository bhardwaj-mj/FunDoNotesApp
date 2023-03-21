import React from 'react';
import {Text, View, TouchableOpacity, Modal, StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const CreateNoteBottomSheet = props => {
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
                <MaterialCommunityIcons
                  name="trash-can-outline"
                  size={20}
                  color="white"
                />
                <Text style={styles.text}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalBtn}>
                <MaterialCommunityIcons
                  name="content-copy"
                  size={20}
                  color="white"
                />
                <Text style={styles.text}>Make a copy</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalBtn}>
                <MaterialCommunityIcons
                  name="share-variant-outline"
                  size={20}
                  color="white"
                />
                <Text style={styles.text}>Send</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalBtn}>
                <Feather name="user-plus" size={20} color="white" />
                <Text style={styles.text}>Collaborator</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalBtn}>
                <MaterialCommunityIcons
                  name="label-outline"
                  size={20}
                  color="white"
                />
                <Text style={styles.text}>Labels</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalBtn}>
                <MaterialIcons name="help-outline" size={20} color="white" />
                <Text style={styles.text}>Help & feedback</Text>
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
    backgroundColor: '#87ceeb',
    flexDirection: 'column',
  },
  modalBtn: {
    backgroundColor: '#87ceeb',
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
export default CreateNoteBottomSheet;
