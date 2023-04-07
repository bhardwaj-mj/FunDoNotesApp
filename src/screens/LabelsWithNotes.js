import React, {useState, useEffect, useContext, useCallback} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AuthContext} from '../navigation/AuthProvider';
import {layoutChange} from '../redux/Action';
import {useSelector, useDispatch} from 'react-redux';
import {fetchNoteData} from '../services/NoteServices';
import {useIsFocused} from '@react-navigation/native';
import NoteCard from '../components/NoteCard';

const LabelsWithNotes = ({navigation, route}) => {
  const [noteData, setNoteData] = useState([]);
  const [labelsData, setLabelsData] = useState([]);
  const isFocused = useIsFocused();
  const {user} = useContext(AuthContext);
  const layout = useSelector(state => state.layout);
  const dispatch = useDispatch();
  const labelName = route.params?.label;
  const labelId = route.params?.id;

  const fetchData = useCallback(async () => {
    let data = await fetchNoteData(user.uid);
    setNoteData(data);
  }, [user.uid]);
  const getlabelData = useCallback(() => {
    const searchedData = [];
    noteData.forEach(note => {
      note.labelData.forEach(label => {
        if (label.id === labelId) {
          searchedData.push(note);
        }
      });
    });
    setLabelsData(searchedData);
  }, [labelId, noteData]);

  useEffect(() => {
    if (isFocused) {
      getlabelData();
      fetchData();
    }
  }, [isFocused, fetchData, getlabelData]);

  const editNotes = item => {
    navigation.navigate('CreateNote', {
      editData: item,
      noteId: item.id,
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => {
            navigation.openDrawer();
          }}>
          <Feather name="menu" color={'#87ceeb'} size={25} />
        </TouchableOpacity>
        <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
          {labelName}
        </Text>
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => navigation.navigate('SearchNote')}>
          <Ionicons name="search" size={25} color={'#87ceeb'} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            dispatch(layoutChange());
          }}>
          <MaterialCommunityIcons
            name={layout ? 'view-agenda-outline' : 'view-grid-outline'}
            color={'#87ceeb'}
            size={25}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.searchButton}>
          <MaterialCommunityIcons
            name="dots-vertical"
            color="#87ceeb"
            size={25}
          />
        </TouchableOpacity>
      </View>
      <View style={{flex: 1}}>
        <View>
          <FlatList
            style={styles.list}
            data={labelsData}
            numColumns={layout ? 2 : 1}
            key={layout ? 2 : 1}
            renderItem={({item}) => (
              <TouchableOpacity
                style={layout ? styles.gridLayout : styles.listLayout}
                onPress={() => {
                  editNotes(item);
                }}>
                <NoteCard {...item} />
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1},
  topBar: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
    paddingTop: 25,
    flexDirection: 'row',
    margin: 10,
  },
  text: {
    color: '#87ceeb',
    fontSize: 20,
    marginLeft: 20,
    fontWeight: '500',
    width: '50%',
  },
  searchButton: {
    paddingRight: 20,
    paddingLeft: 20,
  },
  list: {
    paddingLeft: 10,
    paddingRight: 10,
  },

  listLayout: {
    backgroundColor: 'white',
    margin: 7,
    borderColor: '#87ceeb',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  gridLayout: {
    backgroundColor: 'white',
    margin: '2.5%',
    borderColor: '#87ceeb',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    width: '45%',
  },
});
export default LabelsWithNotes;
