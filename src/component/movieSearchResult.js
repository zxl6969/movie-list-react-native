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
    ListView,
    ActivityIndicator
} from 'react-native';
import * as Douban from '../config/api';
import MovieList from '../component/movieList';

export default class SearchResult extends Component {
    static navigationOptions = ({navigation}) => ({
        title: '搜索结果',
    });

    constructor(props) {
        super(props);
        let {params} = this.props.navigation.state;
        this.state = {
            query : params.query,
            count : 10,
            complete : false,
            btm : false,
            dataSource : new ListView.DataSource({rowHasChanged : (r1 , r2) => {r1 !== r2}}),
        };
        this.fetchdata();
    }

    fetchdata() {
        fetch(`http://api.douban.com/v2/movie/search?q=${this.state.query}`)
            .then((response) => response.json())
            .then((json) => {
                this.setState({
                    dataSource:this.state.dataSource.cloneWithRows(json.subjects),
                    complete : true,
                    btm : false,
                });
            }).done()
    }


    onend(){
        this.setState({
            count : this.state.count + 10,
            btm : true,
        })
        this.fetchdata();
    }


    render() {
        if (this.state.complete) {
            return (
                <MovieList
                    btm={this.state.btm}
                    isEnd={true}
                    count={this.state.count}
                    onEnd={()=>{this.onend()}}
                    listData={this.state.dataSource}
                    {...this.props}
                />
            );
        } else {
            return (
                <View style={{flex:1,alignItems:'center',justifyContent:'center'}}><ActivityIndicator /><Text>正在加载...</Text></View>
            );
        }
    }
}

const styles = StyleSheet.create({
});

