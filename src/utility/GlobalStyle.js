import {StyleSheet} from 'react-native';
import {Color, Padding, Border, Font, Flex} from './Theme';

export const pageStyles = StyleSheet.create({
  openingScreen: {
    flex: Flex.ONE,
    backgroundColor: Color.PRIMARY,
    justifyContent: 'center',
  },
  display: {
    flex: Flex.ONE,
    backgroundColor: Color.PRIMARY,
  },
  topView: {
    flex: Flex.ONE,
    justifyContent: 'flex-start',
    paddingHorizontal: Padding.PADDING_SIX,
    paddingBottom: Padding.PADDING_TWELVE,
  },
  titleText: {
    fontSize: Font.EXTRA_LARGE,
    color: Color.HEADING,
    fontWeight: 'bold',
    marginLeft: 40,
    marginTop: 10,
  },
  bottomView: {
    flex: Flex.THREE,
    backgroundColor: Color.HEADING,
    borderTopLeftRadius: Border.ROUND_CORNER,
    borderTopRightRadius: Border.ROUND_CORNER,
    paddingHorizontal: Padding.PADDING_SIX,
    paddingVertical: 100,
    flexShrink: 0,
  },

  textInput: {
    width: '90%',
    borderWidth: 1,
    backgroundColor: Color.PLACE_HOLDER_COLOR,
    borderColor: Color.HEADING,
    borderRadius: Border.BORDER_RADIUS,
    paddingLeft: Padding.PADDING_FIVE,
    marginTop: Padding.PADDING_SIX,
    marginLeft: Padding.PADDING_FIVE,
  },
  buttonText: {
    color: Color.HEADING,
    fontWeight: 'bold',
    fontSize: Font.PRIMARY,
  },
  buttonText1: {
    color: Color.LINK,
    fontWeight: 'bold',
    fontSize: Font.PRIMARY,
  },
  TextButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Padding.PADDING_SIX,
  },
  button: {
    width: '90%',
    color: Color.PRIMARY,
    height: 52,
    backgroundColor: Color.PRIMARY,
    borderRadius: Border.BUTTON_BORDER,
    marginTop: Padding.PADDING_SIX,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: Padding.PADDING_FIVE,
  },
  logo: {
    height: 100,
    width: 100,
    marginLeft: 120,
  },
  list: {
    marginLeft: 10,
    marginRight: 10,
  },
  listLayout: {
    backgroundColor: Color.PRIMARY,
    margin: 7,
    borderColor: Color.SECONDARY,
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  gridLayout: {
    backgroundColor: Color.PRIMARY,
    margin: '2.5%',
    borderColor: Color.SECONDARY,
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    width: '45%',
  },
});
