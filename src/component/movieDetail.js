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
    Image,
    ActivityIndicator,
    ScrollView
} from 'react-native';
import * as Douban from '../config/api';


export default class MovieDetail extends Component {

    static navigationOptions = ({navigation}) => ({
        title: navigation.state.params.title,
    });

    constructor(props) {
        super(props);
        const {params} = this.props.navigation.state;
        this.state = {
            movieInfo: '',
            isComplete : false
        };
        this.fetchData(params.id);
    }

    fetchData(id) {
        fetch(Douban.API.Movie_detail + id)
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    movieInfo: data,
                });
                setTimeout(()=>{
                    this.setState({
                        isComplete : true
                    });
                },500)
            }).done()
    }


    render() {

        if(this.state.isComplete){
            return(
                <ScrollView>
                <View style={styles.detailBox}>
                    <View style={styles.detailTop}>
                        <Image resizeMode={Image.resizeMode.contain} style={styles.movieImg} source={{uri:this.state.movieInfo.images.large}}/>
                        <View style={styles.movieInfo}>
                            <View style={styles.infoItem}>
                                <Text style={styles.title}>片名:</Text>
                                <Text style={styles.info}>{this.state.movieInfo.title}</Text>
                            </View>
                            <View style={styles.infoItem}>
                                <Text style={styles.title}>原名:</Text>
                                <Text style={styles.info}>{this.state.movieInfo.original_title}</Text>
                            </View>
                            <View style={styles.infoItem}>
                                <Text style={styles.title}>评分:</Text>
                                <Text style={styles.info}>{this.state.movieInfo.rating.average}</Text>
                            </View>
                            <View style={styles.infoItem}>
                                <Text style={styles.title}>年份:</Text>
                                <Text style={styles.info}>{this.state.movieInfo.year}</Text>
                            </View>
                            <View style={styles.infoItem}>
                                <Text style={styles.title}>演员表:</Text>
                                <Text style={styles.info}>
                                    {this.state.movieInfo.casts.map((item) => {
                                        return (
                                            item.name + " "
                                        )
                                    })}
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.movieDetail}>
                        <Text style={styles.detailTitle}>剧情摘要:</Text>
                        <Text style={styles.detailInfo}>
                            {this.state.movieInfo.summary}
                        </Text>
                    </View>
                </View>
                </ScrollView>
            );
        }else{
            return (
                <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                    <ActivityIndicator/>
                    <Text>正在加载...</Text>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    detailBox: {
        flex: 1
    },
    detailTop:{
        flexDirection:'row',
        padding:10,
        alignItems:'center'
    },
    movieImg:{
        flex:2,
        height:200
    },
    movieInfo:{
        flex:3,
        marginLeft:5,
    },
    infoItem:{
        flexDirection:'row',
        alignItems:'flex-start',
        paddingRight:10,
        marginBottom:15
    },
    title:{
        fontSize:14,
        width:50
    },
    info:{
        flex:1,
        fontSize:14,
        marginLeft:5,
        color:'#4a4a4a',
    },
    movieDetail:{
        margin:10
    },
    detailTitle:{
        color:'#4a4a4a',
        fontSize:16
    },
    detailInfo:{
        fontSize:15,
        marginTop:5
    }
});

