import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {Color, Icon, Padding, BorderRadius} from '../utility/Theme';
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
                size={Icon.SIZE_THREE}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <MaterialIcon
                name="brush"
                style={styles.bottomBarIcon}
                size={Icon.SIZE_THREE}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <MaterialIcon
                name="mic-none"
                style={styles.bottomBarIcon}
                size={Icon.SIZE_THREE}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <MaterialIcon
                name="crop-original"
                style={styles.bottomBarIcon}
                size={Icon.SIZE_THREE}
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
                  size={Icon.SIZE_FOUR}
                />
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
    backgroundColor: Color.SECONDARY,
    justifyContent: 'flex-end',
    borderTopLeftRadius: BorderRadius.RADIUS_TWO,
    borderTopRightRadius: BorderRadius.RADIUS_TWO,
  },
  bottomBarViewSecond: {
    width: 100,
  },
  bottomBarViewThird: {
    flexDirection: 'row',
    padding: Padding.PADDING_ONE,
  },
  bottomBarViewFour: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomBarIcon: {
    color: Color.PRIMARY,
    padding: Padding.PADDING_FIVE,
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
    borderRadius: BorderRadius.RADIUS_THREE,
    height: 70,
    width: 70,
    borderColor: Color.PRIMARY,
    borderWidth: 5,
    alignSelf: 'center',
    backgroundColor: Color.SECONDARY,
  },

  plusIcon: {
    padding: Padding.PADDING_FOUR,
    color: Color.PRIMARY,
  },
});
export default BottomBar;
