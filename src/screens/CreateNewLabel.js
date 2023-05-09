import React, {useState, useContext, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Keyboard,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {AuthContext} from '../navigation/AuthProvider';
import {addLabelData, fetchLabelData} from '../services/LabelServices';
import {useIsFocused} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {labelsData} from '../redux/Action';
import LabelCard from '../components/LabelsCard';
import Languages from '../utility/localization/Languages';
const CreateNewLabel = ({navigation}) => {
  const [label, setLabel] = useState('');
  const [icon, setIcon] = useState(false);
  const {user} = useContext(AuthContext);
  const isFocused = useIsFocused();
  const labelData = useSelector(state => state.labelData);
  const changeLang = useSelector(state => state.toggle);
  const dispatch = useDispatch();
  const fetchLabels = useCallback(async () => {
    let data = await fetchLabelData(user.uid);
    dispatch(labelsData(data));
  }, [user.uid, dispatch]);
  useEffect(() => {
    if (isFocused) {
      fetchLabels();
    }
  }, [isFocused, fetchLabels]);

  const onCheckPress = async () => {
    setIcon(!icon);
    if (label !== '') {
      await addLabelData(label, user.uid);
      await fetchLabels();
      setLabel('');
      Keyboard.dismiss();
    }
  };
  const onClosePress = async () => {
    setIcon(!icon);
  };
  const onTextChange = text => {
    setLabel(text);
    if (text !== '') {
      setIcon(false);
    } else {
      setIcon(false);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.viewOne}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={25} color="#87ceeb" />
        </TouchableOpacity>
        <Text style={{color: '#87ceeb', fontSize: 18, marginLeft: 20}}>
          {changeLang
            ? Languages._props.hin.Edit_Labels
            : Languages._props.en.Edit_Labels}
        </Text>
      </View>
      <View style={{marginTop: 15, flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity onPress={onClosePress}>
          {icon ? (
            <MaterialIcons name="add" size={25} color="#87ceeb" />
          ) : (
            <Ionicons name="close" size={25} color="#87ceeb" />
          )}
        </TouchableOpacity>

        <TextInput
          style={{
            marginLeft: 25,
            marginRight: 10,
            width: '75%',
            color: '#87ceeb',
          }}
          value={label}
          onChangeText={text => onTextChange(text)}
          placeholder={
            changeLang
              ? Languages._props.hin.Create_New_Label
              : Languages._props.en.Create_New_Label
          }
          placeholderTextColor="#87ceeb"
        />

        <TouchableOpacity onPress={onCheckPress}>
          <Ionicons
            name={icon ? null : 'checkmark-sharp'}
            size={30}
            color="#87ceeb"
          />
        </TouchableOpacity>
      </View>
      <View style={{marginTop: 15}}>
        <FlatList
          data={labelData}
          key={item => item.id}
          keyExtractor={item => item.id}
          renderItem={item => <LabelCard fetchLabels={fetchLabels} {...item} />}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  viewOne: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
export default CreateNewLabel;
