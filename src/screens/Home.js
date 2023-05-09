import React from 'react';
import {View, StyleSheet} from 'react-native';
import Notes from '../components/Notes';
import {useSelector} from 'react-redux';
import TopBar from '../components/TopBar';
import BottomBar from '../components/BottomBar';

const Home = ({navigation}) => {
  const layout = useSelector(state => state.layout);
  return (
    <View style={styles.container}>
      <TopBar navigation={navigation} />
      <View style={styles.secondFlexViewOne}>
        <View>
          <Notes navigation={navigation} layout={layout} setLayout={layout} />
        </View>
      </View>
      <BottomBar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  secondFlexViewOne: {flex: 1},
  secondFlexViewSecond: {
    paddingLeft: 20,
    paddingTop: 15,
  },
  secondFlexText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'Bold',
  },
});
export default Home;
