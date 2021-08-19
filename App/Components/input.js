import { Component } from 'react'
import React from 'react'
import { Image, Text, TouchableOpacity, View, TextInput } from 'react-native'
import { texts } from './textfile'
import { colors } from './colors'
import ModalDropDown from 'react-native-modal-dropdown';
export class InputBox extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        const { styles, title, text, iconImg, onPress, placeHolder, onChangeText, multiline,textBoxStyle,secureEntry,keyBoardType,maxLength } = this.props
        return (
            <View style={styles}>
                <Text style={[texts.NORMAL_TEXT, { paddingHorizontal: '2%', width: '95%', }]}>{title}</Text>
                <View style={[{
                    width: '95%', height: 50, borderWidth: 1, borderColor: '#aaa',
                    justifyContent: 'center', backgroundColor: '#fff', borderRadius: 10
                },textBoxStyle]}>
                    {/* <Image source={require('../Assets/user.png')} style={{width:32,height:32,resizeMode:'contain',tintColor:'#fff',alignSelf:'center'}} /> */}
                    <TextInput
                        multiline={multiline}
                        secureTextEntry={secureEntry}
                        placeholderTextColor={'#aaa'}
                        style={[texts.NORMAL_TEXT, { width: '100%', paddingHorizontal: '3%' }]}
                        placeholder={placeHolder}
                        onChangeText={onChangeText}
                        keyboardType={keyBoardType}
                        maxLength={maxLength}

                    />
                </View>
            </View>
        )
    }
}
