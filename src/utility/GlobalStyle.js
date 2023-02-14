import {StyleSheet} from 'react-native';
import {Color, Padding, Border, Font} from './Theme';

export const styles = StyleSheet.create({
  display: {
    flex: 1,
    backgroundColor: Color.PRIMARY,
  },
  topView: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: Padding.PRIMARY_PADDING,
    paddingBottom: Padding.BOTTOM_PADDING,
  },
  titleText: {
    fontSize: 35,
    color: Color.HEADING,
    fontWeight: 'bold',
    marginLeft: 40,
    marginTop: 10,
  },
  bottomView: {
    flex: 3,
    backgroundColor: 'black',
    borderTopLeftRadius: Border.ROUND_CORNER,
    borderTopRightRadius: Border.ROUND_CORNER,
    paddingHorizontal: Padding.PRIMARY_PADDING,
    paddingVertical: 100,
    flexShrink: 0,
  },

  textInput: {
    width: '90%',
    borderWidth: 1,
    backgroundColor: Color.PLACE_HOLDER_COLOR,
    borderColor: Color.HEADING,
    borderRadius: Border.BORDER_RADIUS,
    paddingLeft: Padding.INITIAL_PADDING,
    marginTop: Padding.PRIMARY_PADDING,
    marginLeft: Padding.INITIAL_PADDING,
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
    marginTop: Padding.PRIMARY_PADDING,
  },
  button: {
    width: '90%',
    color: Color.PRIMARY,
    height: 52,
    backgroundColor: Color.PRIMARY,
    borderRadius: Border.BUTTON_BORDER,
    marginTop: Padding.PRIMARY_PADDING,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: Padding.INITIAL_PADDING,
  },
  logo: {
    height: 100,
    width: 100,
    marginLeft: 120,
  },
});
