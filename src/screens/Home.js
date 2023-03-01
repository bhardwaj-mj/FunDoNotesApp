import React, {useContext, useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {Avatar} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {AuthContext} from '../navigation/AuthProvider';
import CustomModal from '../components/CustomModal';
import {fetchUserData} from '../services/UserServices';
import ImagePickerModal from '../components/ImagePickerModal';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';

const Home = ({navigation}) => {
  const {user, userLogout} = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [fullName, setFullName] = useState();
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [imageFile, setImageFile] = useState('');

  const onPressHandler = () => {
    navigation.openDrawer();
  };
  const uploadImage = async img => {
    const uri = img;
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const uploadUri = uri;
    console.log(filename);
    const reference = storage().ref(filename);

    try {
      await reference.putFile(uploadUri);
      const url = await storage().ref(filename).getDownloadURL();
      setImageFile(url);
      Alert.alert(
        'Photo uploaded!',
        'Your photo has been uploaded to Firebase Cloud Storage!',
      );
    } catch (e) {
      console.error(e);
    }
  };

  const dataReceiver = async () => {
    try {
      const userdata = await fetchUserData(user);
      setFullName(userdata[0]);
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
  }, []);

  const choosePhotoFromGalary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        console.log(image);
        uploadImage(image.path);
      })
      .catch(e => {
        console.log(e);
      });
  };
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
                source={{
                  uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                }}
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
              />
            ) : null}
          </View>
          <View>
            {imageModalVisible ? (
              <ImagePickerModal
                visible={imageModalVisible}
                onRequestClose={() => setImageModalVisible(false)}
                hideModal={() => setImageModalVisible(false)}
                onPressOpenGalary={() => {
                  choosePhotoFromGalary();
                }}
              />
            ) : null}
          </View>
        </View>
      </View>
      <View style={styles.secondFlexViewOne}>
        <ScrollView>
          <SafeAreaView>
            <View></View>
          </SafeAreaView>
        </ScrollView>
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
                  style={styles.plusTouchable}>
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
