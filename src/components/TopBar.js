import React, {useState, useContext, useEffect, useCallback} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import {Avatar} from 'react-native-elements';
import {layoutChange} from '../redux/Action';
import ImagePickerModal from '../components/ImagePickerModal';
import CustomModal from '../components/CustomModal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {AuthContext} from '../navigation/AuthProvider';
import {useSelector, useDispatch} from 'react-redux';
import {fetchUserData, updateUserData} from '../services/UserServices';
import storage from '@react-native-firebase/storage';
import Languages from '../utility/localization/Languages';
import {Color, Padding, Icon, Font, BorderRadius} from '../utility/Theme';

const TopBar = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const {user, userLogout} = useContext(AuthContext);
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [fullName, setFullName] = useState();

  const [image, setImage] = useState('');
  const layout = useSelector(state => state.layout);
  const changeLang = useSelector(state => state.toggle);
  const dispatch = useDispatch();
  const onPressHandler = () => {
    navigation.openDrawer();
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

      uploadImage(result.assets[0].uri);
    }
  };
  const openGalary = async () => {
    const result = await launchImageLibrary(options);

    uploadImage(result.assets[0].uri);
  };
  const uploadImage = useCallback(
    async img => {
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
    },
    [user],
  );

  const dataReceiver = useCallback(async () => {
    try {
      const userdata = await fetchUserData(user);
      setFullName(userdata[0]);
      setImage(userdata[1]);
    } catch (e) {
      console.log(e);
    }
  }, [user]);

  useEffect(() => {
    try {
      dataReceiver();
    } catch (e) {
      console.log(e);
    }
  }, [uploadImage, dataReceiver]);
  return (
    <View style={styles.topBar}>
      <View style={styles.topBar1}>
        <View>
          <TouchableOpacity onPress={onPressHandler}>
            <Feather
              name="menu"
              color={Color.PRIMARY}
              size={Icon.SIZE_THREE}
              style={styles.menuButton}
            />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate('SearchNote')}>
            <Text style={styles.searchText}>
              {changeLang
                ? Languages._props.hin.Search
                : Languages._props.en.Search}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.gridButton}>
          <TouchableOpacity onPress={() => dispatch(layoutChange())}>
            <MaterialCommunityIcons
              name={layout ? 'view-agenda-outline' : 'view-grid-outline'}
              color={Color.PRIMARY}
              size={Icon.SIZE_THREE}
            />
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
              onPressEditImage={() => setImageModalVisible(!imageModalVisible)}
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
  );
};
const styles = StyleSheet.create({
  topBar: {
    justifyContent: 'center',
    padding: Padding.PADDING_FOUR,
    paddingTop: Padding.PADDING_SEVEN,
  },
  topBar1: {
    backgroundColor: Color.SECONDARY,
    borderRadius: BorderRadius.RADIUS_ONE,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuButton: {
    padding: Padding.PADDING_FOUR,
    paddingLeft: Padding.PADDING_FOUR,
  },
  searchText: {
    color: Color.PRIMARY,
    fontSize: Font.PRIMARY,
    paddingLeft: Padding.PADDING_FOUR,
    paddingRight: Padding.PADDING_THIRTEEN,
  },
  gridButton: {
    paddingRight: Padding.PADDING_SIX,
    paddingLeft: Padding.PADDING_SIX,
  },
});
export default TopBar;
