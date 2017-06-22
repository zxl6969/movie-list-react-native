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

export default class MovieList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: this.props.listData,
            isEnd : this.props.isEnd,
            btm : this.props.btm
        };
    }

    handleClick(rowData){
        this.props.navigation.navigate('MovieDetail',{
            title : rowData.title,
            id : rowData.id
        });
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            dataSource:nextProps.listData,
            btm : nextProps.btm,
            isEnd : nextProps.isEnd
        });
    }

    handlefooter(){
        if(this.state.isEnd){
            return (
                <View style={{alignItems:'center'}}>
                    <Text>没有更多了...</Text>
                </View>
                );
        }else{
            if(this.state.btm){
                return <ActivityIndicator/>
            }else{
                return null
            }
        }
    }

    handlerow(rowData) {
        return (
            <TouchableOpacity activeOpacity={0.8} onPress={()=>this.handleClick(rowData)}>
                <View style={styles.item}>
                    <Image style={styles.leftImg} source={{uri: rowData.images.large }}/>
                    <View style={styles.rightInfo}>
                        <View style={styles.rightItem}>
                            <Text style={styles.title}>影片类型:</Text>
                            <Text style={styles.info}>{rowData.genres.toString()}</Text>
                        </View>
                        <View style={styles.rightItem}>
                            <Text style={styles.title}>影片名:</Text>
                            <Text style={styles.info}>{rowData.title}</Text>
                        </View>
                        <View style={styles.rightItem}>
                            <Text style={styles.title}>原名:</Text>
                            <Text style={styles.info}>{rowData.original_title}</Text>
                        </View>
                        <View style={styles.rightItem}>
                            <Text style={styles.title}>主演:</Text>
                            <Text style={styles.info}>
                                {rowData.casts.map((item) => { return (item.name + " ");})}
                            </Text>
                        </View>
                        <View style={styles.rightItem}>
                            <Text style={styles.title}>得分:</Text>
                            <Text style={styles.info}>{rowData.rating.average}</Text>
                        </View>
                        <View style={styles.rightItem}>
                            <Text style={styles.title}>年份:</Text>
                            <Text style={styles.info}>{rowData.year}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <View style={styles.listBox}>
                <ListView
                    initialListSize={this.props.count}
                    onEndReached={()=>{this.props.onEnd()}}
                    dataSource={this.state.dataSource}
                    renderRow={this.handlerow.bind(this)}
                    renderFooter={()=>this.handlefooter()}
                />
            </View>
        );
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
        alignItems:'flex-start',
        marginBottom:10
    },
    title : {
        color:'red',
        fontSize:16,
        marginRight:5
    },
    info : {
        color:'#4a4a4a',
        fontSize:15,
        width:150
    }
});

