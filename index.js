/**
 * @format
 */

import { AppRegistry, LogBox } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import TrackPlayer from 'react-native-track-player';
if (__DEV__) {
  const ignoreWarns = ['ViewPropTypes will be removed from React Native'];
  LogBox.ignoreLogs(ignoreWarns);
}

AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerPlaybackService(() => require('./PlayerService'));
