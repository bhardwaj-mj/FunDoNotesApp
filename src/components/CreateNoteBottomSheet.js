import React from 'react';
import {Text, View, TouchableOpacity, Modal, StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Languages from '../utility/localization/Languages';
import {useSelector} from 'react-redux';
const CreateNoteBottomSheet = props => {
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
              onPress={props.onPressDelete}>
              <MaterialCommunityIcons
                name="trash-can-outline"
                size={20}
                color="white"
              />
              <Text style={styles.text}>
                {changeLang
                  ? Languages._props.hin.Delete
                  : Languages._props.en.Delete}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalBtn}>
              <MaterialCommunityIcons
                name="content-copy"
                size={20}
                color="white"
              />
              <Text style={styles.text}>
                {changeLang
                  ? Languages._props.hin.Make_A_Copy
                  : Languages._props.en.Make_A_Copy}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalBtn}>
              <MaterialCommunityIcons
                name="share-variant-outline"
                size={20}
                color="white"
              />
              <Text style={styles.text}>
                {changeLang
                  ? Languages._props.hin.Send
                  : Languages._props.en.Send}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalBtn}>
              <Feather name="user-plus" size={20} color="white" />
              <Text style={styles.text}>
                {changeLang
                  ? Languages._props.hin.Collaborator
                  : Languages._props.en.Collaborator}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalBtn}
              onPress={() => props.labelPress()}>
              <MaterialCommunityIcons
                name="label-outline"
                size={20}
                color="white"
              />
              <Text style={styles.text}>
                {changeLang
                  ? Languages._props.hin.Labels
                  : Languages._props.en.Labels}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalBtn}>
              <MaterialIcons name="help-outline" size={20} color="white" />
              <Text style={styles.text}>
                {changeLang
                  ? Languages._props.hin.Help_And_Feedback
                  : Languages._props.en.Help_And_Feedback}
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
