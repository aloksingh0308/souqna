import { Component } from 'react'
import React from 'react'
import { Image, Text, TouchableOpacity, View, TextInput } from 'react-native'
import { texts } from './textfile'
import { colors } from './colors'
import ModalDropDown from 'react-native-modal-dropdown';
import AsyncStorage from '@react-native-community/async-storage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { PowerTranslator, ProviderTypes, TranslatorConfiguration, TranslatorFactory } from 'react-native-power-translator';

// TranslatorConfiguration.setConfig(ProviderTypes.Google, 'AIzaSyBY54m5k1-VQeAl3nw95pX79fnHp8_CqLg','ar','en');
// const translator = TranslatorFactory.createTranslator();
export class InputBox extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
  async  componentDidMount(){
        try {
            const lng = await AsyncStorage.getItem('lng');
            TranslatorConfiguration.setConfig(ProviderTypes.Google, 'AIzaSyBY54m5k1-VQeAl3nw95pX79fnHp8_CqLg',lng,'en');
        } catch (error) {
            console.log(error);
            // Error retrieving data
        }
    }
    render() {
        const { styles, title, text, iconImg, onPress, placeHolder, onChangeText, multiline,textBoxStyle,secureEntry,keyBoardType,maxLength,titleStyle } = this.props
        return (
            <View style={styles}>
                 <PowerTranslator style={{...texts.SUBHEADING_TEXT, fontSize: 14, paddingVertical: '2%' ,width:wp('100%'),paddingHorizontal:'5%'}} text={title} />
                {/* <PowerTranslator style={{...texts.NORMAL_TEXT, paddingHorizontal: '2%',...titleStyle}} text={title} /> */}
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
