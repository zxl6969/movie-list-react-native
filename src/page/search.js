/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
    ListView
} from 'react-native';
import * as Douban from '../config/api';
import MovieList from '../component/movieList';

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query:'',
        };
    }

    render() {
        return (
            <View style={styles.searchBox}>
                <View style={styles.searchTop}>
                    <TextInput placeholder={'搜索电影...'}
                               onSubmitEditing={()=>{this.props.navigation.navigate('SearchResult',{query:this.state.query})}}
                               onChangeText={(text)=>{this.setState({query:text})}}
                               style={styles.search}
                               underlineColorAndroid={'transparent'}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    searchBox: {
        flex: 1
    },
    searchTop: {
        borderBottomColor: '#4a4a4a',
        borderBottomWidth: 1
    },
    search: {
        paddingLeft: 15
    },
    searchRes: {

    }
});

