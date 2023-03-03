import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {AuthContext} from '../navigation/AuthProvider';
import {addNoteData} from '../services/NoteServices';

const CreateNote = ({navigation}) => {
  const {user} = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');

  const onPressBack = async () => {
    await addNoteData(title, note, user.uid);
    navigation.goBack();
  };
  return (
    <View style={styles.mainContainer}>
      <View style={{justifyContent: 'center', padding: 10, paddingTop: 10}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={onPressBack}>
            <Ionicons
              name="arrow-back"
              size={25}
              color="#87ceeb"
              style={{padding: 10, paddingLeft: 10}}
            />
          </TouchableOpacity>

          <TouchableOpacity style={{marginLeft: 200}}>
            <MaterialCommunityIcons
              name="pin-outline"
              size={25}
              color="#87ceeb"
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons
              name="notifications-outline"
              size={25}
              color="#87ceeb"
              style={{marginLeft: 20}}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="archive-arrow-down-outline"
              size={25}
              color="#87ceeb"
              style={{marginLeft: 20}}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flex: 1, paddingHorizontal: 10, margin: 10}}>
        <View>
          <TextInput
            style={{
              fontSize: 25,
              margin: 10,
              color: '#87ceeb',
            }}
            value={title}
            onChangeText={text => setTitle(text)}
            placeholder="Title"
            placeholderTextColor="#87ceeb"
            selectionColor={'#708090'}
          />
        </View>
        <ScrollView>
          <View>
            <TextInput
              style={{
                fontSize: 20,
                margin: 10,
                color: '#87ceeb',
              }}
              value={note}
              onChangeText={text => setNote(text)}
              placeholder="Note"
              placeholderTextColor="#87ceeb"
              selectionColor={'#708090'}
              multiline={true}
            />
          </View>
        </ScrollView>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          margin: 20,
        }}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <TouchableOpacity style={{marginRight: 15}}>
            <MaterialCommunityIcons
              name="plus-box-outline"
              color="#87ceeb"
              size={20}
            />
          </TouchableOpacity>

          <TouchableOpacity style={{marginLeft: 15}}>
            <Ionicons name="color-palette-outline" color="#87ceeb" size={20} />
          </TouchableOpacity>
        </View>

        <Text style={{fontSize: 20, color: '#87ceeb'}}>Edited </Text>

        <TouchableOpacity>
          <MaterialCommunityIcons
            name="dots-vertical"
            color="#87ceeb"
            size={20}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
});
export default CreateNote;
