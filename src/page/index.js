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
  View,
  Image
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Best from './best';
import Search from './search';
import * as IMG from '../config/img';

export default class Index extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedTab : 'best'
    };
  }
  render() {
    return (
        <TabNavigator>
          <TabNavigator.Item
              selected={this.state.selectedTab === 'best'}
              title="推荐"
              renderIcon={() => <Image style={{width:20,height:20}} source={{uri:IMG.IMG.Star}} />}
              renderSelectedIcon={() => <Image style={{width:20,height:20}} source={{uri:IMG.IMG.Star_check}} />}
              onPress={() => this.setState({ selectedTab: 'best' })}>
              <Best {...this.props}/>
          </TabNavigator.Item>
          <TabNavigator.Item
              selected={this.state.selectedTab === 'search'}
              title="搜索"
              renderIcon={() => <Image style={{width:20,height:20}} source={{uri:IMG.IMG.Search}} />}
              renderSelectedIcon={() => <Image style={{width:20,height:20}} source={{uri:IMG.IMG.Search_check}} />}
              onPress={() => this.setState({ selectedTab: 'search' })}>
              <Search {...this.props}/>
          </TabNavigator.Item>
        </TabNavigator>
    );
  }
}

const styles = StyleSheet.create({
});

