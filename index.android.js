/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Index from './src/page/index';
import {StackNavigator} from 'react-navigation';

import MovieDetail from './src/component/movieDetail';
import SearchResult from './src/component/movieSearchResult';

export default class zxlNative extends Component {
  render() {
    return (
        <View></View>
    );
  }
}

const styles = StyleSheet.create({
});


const AppNavigate = StackNavigator({
    MovieDetail: {
        screen: MovieDetail,
    },
    Index: {
        screen: Index,
        navigationOptions: {header: null}
    },
    SearchResult:{
        screen: SearchResult,
    }
}, {
    initialRouteName: 'Index'
});

AppRegistry.registerComponent('zxlNative', () => AppNavigate);
