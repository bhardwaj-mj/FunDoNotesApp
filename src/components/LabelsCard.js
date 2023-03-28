import React, {useContext, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {AuthContext} from '../navigation/AuthProvider';
import {updateLabelData, deleteLabelData} from '../services/LabelServices';
const LabelCard = ({item, fetchLabels}) => {
  const {user} = useContext(AuthContext);
  const [icon, setIcon] = useState(true);
  const [label, setLabel] = useState(item.label);

  const onEditLabel = async () => {
    const labelId = item.id;
    setIcon(!icon);
    if (label !== '') {
      await updateLabelData(label, user.uid, labelId);
      await fetchLabels();
    }
  };

  const onDeleteLabel = async () => {
    const labelId = item.id;
    await deleteLabelData(user.uid, labelId);
    await fetchLabels();
  };

  return (
    <View style={label ? styles.container : styles.null}>
      <View style={styles.viewOne}>
        <TouchableOpacity onPress={onDeleteLabel}>
          <MaterialCommunityIcons
            name={icon ? 'label-outline' : 'trash-can-outline'}
            size={25}
            color={'#87ceeb'}
          />
        </TouchableOpacity>
        <TextInput
          onPressIn={() => setIcon(false)}
          onEndEditing={() => setIcon(true)}
          autoFocus={true}
          style={styles.labelText}
          value={label}
          onChangeText={text => {
            setLabel(text);
          }}
        />
        <View>
          <TouchableOpacity
            onPress={() => {
              onEditLabel();
            }}>
            <MaterialCommunityIcons
              name={icon ? 'pencil' : 'check'}
              size={25}
              color={'#87ceeb'}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default LabelCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginBottom: 10,
    borderColor: '#87ceeb',
  },

  labelText: {
    fontSize: 20,
    color: '#87ceeb',
    marginLeft: 25,
    marginRight: 10,
    width: '75%',
  },

  viewOne: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
