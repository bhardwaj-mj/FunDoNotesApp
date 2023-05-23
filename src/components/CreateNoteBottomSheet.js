import React from 'react';
import {Text, View, TouchableOpacity, Modal, StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Languages from '../utility/localization/Languages';
import {useSelector} from 'react-redux';
import {Color, Flex, Font, Icon, Margin, Padding} from '../utility/Theme';
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
                size={Icon.SIZE_TWO}
                color={Color.PRIMARY}
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
                size={Icon.SIZE_TWO}
                color={Color.PRIMARY}
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
                size={Icon.SIZE_TWO}
                color={Color.PRIMARY}
              />
              <Text style={styles.text}>
                {changeLang
                  ? Languages._props.hin.Send
                  : Languages._props.en.Send}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalBtn}>
              <Feather
                name="user-plus"
                size={Icon.SIZE_TWO}
                color={Color.PRIMARY}
              />
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
                size={Icon.SIZE_TWO}
                color={Color.PRIMARY}
              />
              <Text style={styles.text}>
                {changeLang
                  ? Languages._props.hin.Labels
                  : Languages._props.en.Labels}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalBtn}>
              <MaterialIcons
                name="help-outline"
                size={Icon.SIZE_TWO}
                color={Color.PRIMARY}
              />
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
    flex: Flex.ONE,
    justifyContent: 'center',
    backgroundColor: Color.SECONDARY,
    flexDirection: 'column',
  },
  modalBtn: {
    backgroundColor: Color.SECONDARY,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: Padding.PADDING_FOUR,
    flexDirection: 'row',
  },
  button: {
    flex: Flex.ONE,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  text: {
    marginLeft: Margin.MARGIN_SEVEN,
    color: Color.PRIMARY,
    fontSize: Font.SMALL,
  },
});
export default CreateNoteBottomSheet;
