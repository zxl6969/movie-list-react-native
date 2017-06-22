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
    ListView,
    Image,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native';
import * as Douban from '../config/api';
import MovieList from '../component/movieList';

export default class Best extends Component {

    constructor(props) {
        super(props);
        this.state = {
            start : 0,
            count : 20,
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            complete: false,
            btm : false,
            isLoadingEnd : false,
            isEnd : false
        };
        this.fetchdata();
    }

    fetchdata() {
        fetch(Douban.API.Movie_250+'?start='+this.state.start+'&count='+this.state.count)
            .then((response) => response.json())
            .then((json) => {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(json.subjects),
                    complete: true,
                    btm : false,
                    isEnd : this.state.count >= 250 ? true : false
                })
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
                    isEnd={this.state.isEnd}
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
    listBox: {
        padding: 10
    },
    item: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    leftImg: {
        width: 150,
        height: 200
    },
    rightInfo: {
        flex: 1,
        paddingLeft:15
    },
    rightItem:{
        flexDirection:'row',
        alignItems:'center',
        marginBottom:10
    },
    title : {
        color:'red',
        fontSize:18,
        marginRight:5
    },
    info : {
        color:'#4a4a4a',
        fontSize:16
    }
});

