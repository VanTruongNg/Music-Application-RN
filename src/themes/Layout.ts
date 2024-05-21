import { StyleSheet } from 'react-native';
import { kHeight, kWidth } from 'src/common/constants';
import Colors from './Colors';
/**
 *
 * @param Theme can be spread like {Colors, NavigationColors, Gutters, Layout, Common, ...args}
 * @return {*}
 */
export default StyleSheet.create({
  /* Container */
  containerCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  /* Column Layouts */
  column: {
    flexDirection: 'column',
  },
  columnReverse: {
    flexDirection: 'column-reverse',
  },
  colCenter: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  colHCenter: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  colVCenter: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  colBetween: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  /* Row Layouts */
  row: {
    flexDirection: 'row',
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowHBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowReverse: {
    flexDirection: 'row-reverse',
  },
  rowVReverse: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowHCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  rowVCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  /* Default Layouts */
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  alignItemsCenter: {
    alignItems: 'center',
  },
  alignSelfCenter: {
    alignSelf: 'center',
  },
  alignItemsStart: {
    alignItems: 'flex-start',
  },
  alignItemsStretch: {
    alignItems: 'stretch',
  },
  justifyContentCenter: {
    justifyContent: 'center',
  },
  justifyContentAround: {
    justifyContent: 'space-around',
  },
  justifyContentBetween: {
    justifyContent: 'space-between',
  },
  scrollSpaceAround: {
    flexGrow: 1,
    justifyContent: 'space-around',
  },
  scrollSpaceBetween: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  selfStretch: {
    alignSelf: 'stretch',
  },
  /* Text Input */

  boxShadow: {
    shadowOpacity: 0.09,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 10,
    elevation: 3,
  },
  /* Shadow */
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 10,
  },
  /* Text Color */
  textContent: {
    color: Colors.black.default,
  },
  textNote: {
    color: Colors.black.default,
  },
  textTitle: {
    color: Colors.black.default,
  },
  textCapitalize: {
    textTransform: 'capitalize',
  },
  textUppercase: {
    textTransform: 'uppercase',
  },
  /* Sizes Layouts */
  fill: {
    flex: 1,
  },
  fullDevice: {
    width: kWidth,
    height: kHeight,
  },
  fullSize: {
    height: '100%',
    width: '100%',
  },
  fullWidth: {
    width: '100%',
  },
  fullHeight: {
    height: '100%',
  },
  fillAbsolute: {
    flex: 1,
    position: 'absolute',
    zIndex: 999,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  /* Operation Layout */
  mirror: {
    transform: [{ scaleX: -1 }],
  },
  rotate90: {
    transform: [{ rotate: '90deg' }],
  },
  rotate90Inverse: {
    transform: [{ rotate: '-90deg' }],
  },
  /* Text Layout */
  whiteBg: {
    backgroundColor: Colors.white.default,
  },
  textCenter: {
    textAlign: 'center',
  },
  whiteText: {
    color: Colors.white.default,
  },
});
