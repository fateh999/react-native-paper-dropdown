/**
 * @format
 */

import App from './App';
import {AppRegistry} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {name as appName} from './app.json';

Icon.loadFont();

AppRegistry.registerComponent(appName, () => App);
