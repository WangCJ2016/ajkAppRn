/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native'
import AppWithNavigationState from './src/navigators/AppNavigator'



export default class App extends Component {
  render() {   
    return (
      <AppWithNavigationState></AppWithNavigationState>
    );
  }
}


