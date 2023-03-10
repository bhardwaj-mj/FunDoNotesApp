import React, {useContext, useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {Avatar} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {AuthContext} from '../navigation/AuthProvider';
import CustomModal from '../components/CustomModal';
import {fetchUserData, updateUserData} from '../services/UserServices';
import ImagePickerModal from '../components/ImagePickerModal';
import storage from '@react-native-firebase/storage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Notes from '../components/Notes';

const Home = ({navigation}) => {
  const {user, userLogout} = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [fullName, setFullName] = useState();
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [image, setImage] = useState('');

  const onPressHandler = () => {
    navigation.openDrawer();
  };
  const uploadImage = async img => {
    const uploadUri = img;
    const fileName = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    try {
      await storage().ref(fileName).putFile(uploadUri);

      const url = await storage().ref(fileName).getDownloadURL();

      updateUserData(user, url);
      Alert.alert(
        'Image uploaded!',
        'Your image has been uploaded to the Firebase cloud Storage successfully!',
      );
    } catch (e) {
      console.log(e);
    }
  };
  let options = {
    saveToPhotos: true,
    mediaType: 'photo',
    maxWidth: 300,
    maxHeight: 400,
  };
  const openCamera = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const result = await launchCamera(options);
      //console.log(result);
      uploadImage(result.assets[0].uri);
    }
  };
  const openGalary = async () => {
    const result = await launchImageLibrary(options);
    //console.log(result);
    uploadImage(result.assets[0].uri);
  };

  const dataReceiver = async () => {
    try {
      const userdata = await fetchUserData(user);
      setFullName(userdata[0]);
      setImage(userdata[1]);
      //console.log(userdata[1]);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    try {
      dataReceiver();
    } catch (e) {
      console.log(e);
    }
  }, [uploadImage]);

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <View style={styles.topBar1}>
          <View>
            <TouchableOpacity onPress={onPressHandler}>
              <Feather
                name="menu"
                color={'white'}
                size={25}
                style={styles.menuButton}
              />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity>
              <Text style={styles.searchText}>Search</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.gridButton}>
            <TouchableOpacity>
              <Feather name="grid" color={'white'} size={25} />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
              <Avatar
                rounded
                source={
                  image
                    ? {uri: image}
                    : {
                        uri: 'https://t4.ftcdn.net/jpg/03/75/38/73/240_F_375387396_wSJM4Zm0kIRoG7Ej8rmkXot9gN69H4u4.jpg',
                      }
                }
              />
            </TouchableOpacity>
          </View>
          <View>
            {modalVisible ? (
              <CustomModal
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
                hideModal={() => setModalVisible(false)}
                onPressLogout={() => userLogout()}
                fullName={fullName}
                onPressEditImage={() =>
                  setImageModalVisible(!imageModalVisible)
                }
                source={
                  image
                    ? {uri: image}
                    : {
                        uri: 'https://t4.ftcdn.net/jpg/03/75/38/73/240_F_375387396_wSJM4Zm0kIRoG7Ej8rmkXot9gN69H4u4.jpg',
                      }
                }
              />
            ) : null}
          </View>
          <View>
            {imageModalVisible ? (
              <ImagePickerModal
                visible={imageModalVisible}
                onRequestClose={() => setImageModalVisible(false)}
                hideModal={() => setImageModalVisible(false)}
                onPressOpenCamera={() => openCamera()}
                onPressOpenGalary={() => openGalary()}
              />
            ) : null}
          </View>
        </View>
      </View>
      <View style={styles.secondFlexViewOne}>
        <View>
          <Notes navigation={navigation} />
        </View>
      </View>
      <View style={styles.bottomBarViewOne}>
        <View style={styles.bottomBarViewSecond}>
          <View style={styles.bottomBarViewThird}>
            <View style={styles.bottomBarViewFour}>
              <TouchableOpacity>
                <Ionicons
                  name="checkbox-outline"
                  style={styles.bottomBarIcon}
                  size={25}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <MaterialIcon
                  name="brush"
                  style={styles.bottomBarIcon}
                  size={25}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <MaterialIcon
                  name="mic-none"
                  style={styles.bottomBarIcon}
                  size={25}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <MaterialIcon
                  name="crop-original"
                  style={styles.bottomBarIcon}
                  size={25}
                />
              </TouchableOpacity>
              <View style={styles.plusView}>
                <TouchableOpacity
                  activeOpacity={0.1}
                  style={styles.plusTouchable}
                  onPress={() => {
                    navigation.navigate('CreateNote');
                  }}>
                  <Feather
                    name="plus-square"
                    style={styles.plusIcon}
                    size={40}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  topBar: {
    justifyContent: 'center',
    padding: 10,
    paddingTop: 25,
  },
  topBar1: {
    backgroundColor: '#87ceeb',
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuButton: {
    padding: 10,
    paddingLeft: 10,
  },
  searchText: {
    color: 'white',
    fontSize: 20,
    paddingLeft: 10,
    paddingRight: 160,
  },
  gridButton: {
    paddingRight: 20,
    paddingLeft: 20,
  },
  secondFlexViewOne: {flex: 2},
  secondFlexViewSecond: {
    paddingLeft: 20,
    paddingTop: 15,
  },
  secondFlexText: {
    color: 'white',
    fontSize: 20,
    fontWieght: 'Bold',
  },
  bottomBarViewOne: {
    backgroundColor: '#87ceeb',
    justifyContent: 'flex-end',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  bottomBarViewSecond: {
    width: 100,
  },
  bottomBarViewThird: {
    flexDirection: 'row',
    padding: 5,
  },
  bottomBarViewFour: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomBarIcon: {
    color: 'white',
    padding: 15,
  },
  plusView: {
    backgroundColor: 'rgba(0,0,0,0)',
    borderColor: 'rgba(0,0,0,0)',
    borderWidth: 10,
    position: 'absolute',
    width: 70,
    height: 70,
    bottom: '80%',
    left: '130%',
  },
  plusTouchable: {
    borderRadius: 20,
    height: 70,
    width: 70,
    borderColor: '#ffffff',
    borderWidth: 5,
    alignSelf: 'center',
    backgroundColor: '#87ceeb',
  },

  plusIcon: {
    padding: 10,
    color: 'white',
  },
  logoutButton: {
    //borderWidth: 5,
    borderRadius: 10,
    backgroundColor: '#87ceeb',
    width: 70,
  },
});
export default Home;
