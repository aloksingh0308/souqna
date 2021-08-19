import { Component } from 'react'
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

export class Button extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        // const { styles, title, text, iconImg } = this.props
        return (
            <View style={styless.btnStyle}>
               <Text style={styless.btnTextStyle}>Button</Text>
            </View>
        )
    }
}
const styless=StyleSheet.create({
    btnStyle:{
        width:'90%',
        backgroundColor:'#008844',
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center',
        // marginTop:50,
        borderRadius:10
    },
    btnTextStyle:{
        paddingVertical:'5%',
        color:'#fff'
    }
})