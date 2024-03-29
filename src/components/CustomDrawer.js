import React, {
  Component,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import EvilIconsGlyphs from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useIsFocused} from '@react-navigation/native';
import {fetchLabelData} from '../services/LabelServices';
import {AuthContext} from '../navigation/AuthProvider';
import {useSelector, useDispatch} from 'react-redux';
import {labelsData} from '../redux/Action';
import Languages from '../utility/localization/Languages';
// class CustomDrawer extends Component {
//   constructor(props) {
//     super(props);
//   }
//   render(props) {
const CustomDrawer = ({props, navigation}) => {
  //const [labelsData, setLabelsData] = useState([]);
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
  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props} style={styles.drawer}>
        <View style={styles.logoView}>
          <Text style={styles.logoText}>
            {changeLang
              ? Languages._props.hin.Fun_Do_Notes
              : Languages._props.en.Fun_Do_Notes}
          </Text>
        </View>
        <View>
          <DrawerItem
            onPress={() => navigation.navigate('Note')}
            icon={() => <Icon name="bulb-outline" size={25} color={'white'} />}
            label={() => (
              <Text style={styles.labelText}>
                {changeLang
                  ? Languages._props.hin.Notes
                  : Languages._props.en.Notes}
              </Text>
            )}
          />

          <DrawerItem
            onPress={() => navigation.navigate('Remainder')}
            icon={() => (
              <Icon name="notifications-outline" size={25} color={'white'} />
            )}
            label={() => (
              <Text style={styles.labelText}>
                {changeLang
                  ? Languages._props.hin.Reminder
                  : Languages._props.en.Reminder}
              </Text>
            )}
          />

          <View style={labelData.length ? styles.labelsContainer : styles.null}>
            {labelData.length ? (
              <View
                style={labelData.length ? styles.labelsHeading : styles.null}>
                <Text
                  style={labelData.length ? styles.labelsText : styles.null}>
                  {changeLang
                    ? Languages._props.hin.Labels
                    : Languages._props.en.Labels}
                </Text>

                <TouchableOpacity
                  onPress={() => navigation.navigate('NewLabel')}>
                  <Text
                    style={labelData.length ? styles.labelsText : styles.null}>
                    {changeLang
                      ? Languages._props.hin.Edit
                      : Languages._props.en.Edit}
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View />
            )}

            <View style={styles.labelItems}>
              {labelData?.map(item => (
                <TouchableOpacity
                  style={styles.itemView}
                  key={item.id}
                  onPress={() =>
                    navigation.navigate('LabelsWithNotes', {
                      ...item,
                    })
                  }>
                  <View>
                    <MaterialCommunityIcons
                      name="label-outline"
                      size={25}
                      color={'white'}
                    />
                  </View>
                  <Text style={styles.itemText}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <DrawerItem
              onPress={() => navigation.navigate('NewLabel')}
              icon={() => <Icon name="add-outline" size={25} color={'white'} />}
              label={() => (
                <Text style={styles.labelText}>
                  {changeLang
                    ? Languages._props.hin.Create_New_Label
                    : Languages._props.en.Create_New_Label}
                </Text>
              )}
            />
          </View>

          <DrawerItem
            onPress={() => navigation.navigate('Archive')}
            icon={() => (
              <Icon name="archive-outline" size={25} color={'white'} />
            )}
            label={() => (
              <Text style={styles.labelText}>
                {changeLang
                  ? Languages._props.hin.Archive
                  : Languages._props.en.Archive}
              </Text>
            )}
          />
          <DrawerItem
            onPress={() => navigation.navigate('Deleted')}
            icon={() => <Icon name="trash-outline" size={25} color={'white'} />}
            label={() => (
              <Text style={styles.labelText}>
                {changeLang
                  ? Languages._props.hin.Deleted
                  : Languages._props.en.Deleted}
              </Text>
            )}
          />
          <DrawerItem
            onPress={() => navigation.navigate('Settings')}
            icon={() => (
              <Icon name="settings-outline" size={25} color={'white'} />
            )}
            label={() => (
              <Text style={styles.labelText}>
                {changeLang
                  ? Languages._props.hin.Settings
                  : Languages._props.en.Settings}
              </Text>
            )}
          />
          <DrawerItem
            icon={() => (
              <EvilIconsGlyphs name="question" size={25} color={'white'} />
            )}
            label={() => (
              <Text style={styles.labelText}>
                {changeLang
                  ? Languages._props.hin.Help_And_Feedback
                  : Languages._props.en.Help_And_Feedback}
              </Text>
            )}
          />
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  drawer: {
    backgroundColor: '#87ceeb',
  },
  logoView: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    margin: 25,
  },
  logoText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },

  labelText: {
    fontSize: 20,
    //margin: -10,
    color: 'white',
  },
  labelsContainer: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'white',
  },
  labelsHeading: {
    margin: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  labelsText: {
    color: 'white',
  },
  labelItems: {
    marginLeft: 10,
  },
  itemView: {
    flexDirection: 'row',
    padding: 10,
  },
  itemText: {
    marginLeft: 20,
    fontSize: 20,
    color: 'white',
  },
});
export default CustomDrawer;
