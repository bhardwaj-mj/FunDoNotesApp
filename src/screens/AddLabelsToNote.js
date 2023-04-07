import React, {useState, useEffect, useContext, useCallback} from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TextInput,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import {labelsData} from '../redux/Action';
import {AuthContext} from '../navigation/AuthProvider';
import {useSelector, useDispatch} from 'react-redux';
import {fetchLabelData, updateLabelData} from '../services/LabelServices';
import LabelCheckBox from '../components/LabelCheckBox';
import {useIsFocused} from '@react-navigation/native';
const AddLabelsToNote = ({navigation, route}) => {
  const {user} = useContext(AuthContext);
  const isFocused = useIsFocused();
  const labelData = useSelector(state => state.labelData);
  const dispatch = useDispatch();
  const labels = route.params?.labelData;
  const noteId = route.params?.noteId;
  const [checkedLabels, setCheckedLabels] = useState(labels || []);
  const fetchLabels = useCallback(async () => {
    let data = await fetchLabelData(user.uid);
    dispatch(labelsData(data));
  }, [user.uid, dispatch]);
  useEffect(() => {
    if (isFocused) {
      fetchLabels();
    }
  }, [isFocused, fetchLabels]);
  const handleCheck = data => () => {
    if (!checkedLabels.find(element => element.id === data.id)) {
      setCheckedLabels([...checkedLabels, data]);
    } else {
      let temp = checkedLabels.filter(element => element.id !== data.id);
      setCheckedLabels(temp);
    }
  };
  const isChecked = data => {
    return checkedLabels.find(element => element.id === data.id);
  };
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('CreateNote', {
              checkedLabelsData: checkedLabels,
              noteId: noteId,
            });
          }}>
          <Ionicons name="arrow-back" size={25} color={'#87ceeb'} />
        </TouchableOpacity>
        <TextInput
          style={styles.textInput}
          placeholder="Enter label name"
          placeholderTextColor={'#87ceeb'}
        />
      </View>
      <ScrollView>
        <View style={{marginTop: 5}}>
          {labelData.map(item => (
            <LabelCheckBox
              key={item.id}
              item={item}
              checked={isChecked(item)}
              unchecked={handleCheck(item)}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    marginTop: 25,
    justifyContent: 'flex-start',
    padding: 10,
    paddingLeft: 10,
  },
  textInput: {
    marginHorizontal: 25,
    width: '80%',
    color: '#87ceeb',
  },
});
export default AddLabelsToNote;
