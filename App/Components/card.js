import { Component } from 'react'
import React from 'react'
import { Image, Text, TouchableOpacity, View, TextInput } from 'react-native'

export class Card extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        const { styles, title, text, iconImg, onPress } = this.props
        return (
            <TouchableOpacity style={{ width: '45%', height: 150, marginHorizontal: '2.5%', borderRadius: 10,alignItems:'center',marginVertical:5 }}>
                <View style={{ width: '100%', height: '80%', backgroundColor: '#fff',elevation:2 ,borderRadius: 10,}}>

                </View>
                <Text style={{padding:'4%',color:'#999'}}>Category</Text>
            </TouchableOpacity>
        )
    }
}