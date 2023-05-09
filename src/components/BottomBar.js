import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
const BottomBar = ({navigation}) => {
  return (
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
                <Feather name="plus-square" style={styles.plusIcon} size={40} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
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
});
export default BottomBar;
