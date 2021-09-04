import { Component } from 'react'
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

export default class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        // const { styles, title, text, iconImg } = this.props
        return (
            <View style={styless.headerStyle}>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-around',width:'100%',height:'100%'}}>
                    <View style={{width:'20%',backgroundColor:'red',height:'100%',justifyContent:'center',alignItems:'center'}}>
                        <Image source={require('../Assets/add.png')} style={{width:24,height:25,resizeMode:'contain'}} />
                    </View>
                    <View style={{width:'60%',backgroundColor:'green',height:'100%'}}></View>
                    <View style={{width:'20%',backgroundColor:'blue',height:'100%'}}></View>
                </View>
            </View>
        )
    }
}
const styless=StyleSheet.create({
    headerStyle:{
        width:'100%',
        // backgroundColor:'#008844',
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center',
        height:60
        // marginTop:50,
        // borderRadius:10
    },
    headerTextStyle:{
        paddingVertical:'5%',
        color:'#fff'
    }
})