import React, { Component } from "react";
import { SafeAreaView, Text, View, TouchableOpacity, Image } from 'react-native';
import { Header } from 'native-base';
import { texts } from "../Components/textfile";
import { InputBox } from "../Components/input";
import { ScrollView } from "react-native-gesture-handler";
import { colors } from "../Components/colors";
import * as ImagePicker from "react-native-image-picker"
import AsyncStorage from '@react-native-community/async-storage';
class ProfileSetting extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            mobile_number: '',
            password: '',
            profile_pic: ''

        }
    }

    

    addImage = () => {
        let options = {
            title: 'Select Image',
            mediaType: 'photo',
            includeBase64: false,
            maxHeight: 200,
            maxWidth: 200,
            customButtons: [
                { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
            ],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.launchImageLibrary(
            options,
            (response) => {
                // let img={'image':response.assets[0].uri}
                this.setState({ profile_pic: response.assets[0].uri })
                // this.setState({resourcePath: response});
                console.log(this.state.images);
            },
        )
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView>
                    <Header style={{ backgroundColor: '#fff', elevation: 0 }}>
                        <View style={{ width: '90%', height: '100%', justifyContent: 'center' }}>
                            <Text style={texts.HEADING_TEXT}>Profile Setting</Text>
                        </View>
                    </Header>

                    <View style={{ flex: 1, backgroundColor: '#fff' }}>
                        <TouchableOpacity onPress={() => this.addImage()}>
                            <View style={{ width: 80, height: 80, borderRadius: 80 / 2, overflow: 'hidden', backgroundColor: '#fff', elevation: 2, marginVertical: '3%', marginBottom: '2%', marginHorizontal: '5%' }} >
                                <Image source={this.state.profile_pic ? { uri: this.state.profile_pic } : require('../Assets/logo_small.png')} style={{ width: '100%', height: '100%', resizeMode: 'stretch' }} />
                            </View>
                        </TouchableOpacity>
                        {/* <Text style={[texts.HEADING_TEXT, { paddingHorizontal: '5%', paddingVertical: '3%', width: '100%' }]}>Sign Up</Text> */}
                        <InputBox
                            title='Name *'
                            placeHolder='Enter Name'
                            onChangeText={(text) => this.setState({ name: text })}
                            styles={{ width: '100%', alignItems: 'center', marginTop: '1%' }}
                        />
                        <InputBox
                            title="Email I'd *"
                            placeHolder='Enter email'
                            onChangeText={(text) => this.setState({ email: text })}
                            styles={{ width: '100%', alignItems: 'center', marginTop: '3%' }}
                        />
                        <InputBox
                            title='Mobile Numner *'
                            placeHolder='Enter mobile number'
                            onChangeText={(text) => this.setState({ mobile_number: text })}
                            styles={{ width: '100%', alignItems: 'center', marginTop: '3%' }}
                        />
                        <InputBox
                            title='Address *'
                            placeHolder='Enter Address'
                            onChangeText={(text) => this.setState({ password: text })}
                            // secureEntry={true}
                            styles={{ width: '100%', alignItems: 'center', marginTop: '3%' }}
                        />

                        <TouchableOpacity style={{ width: '70%', backgroundColor: colors.TEXT_COLOR, alignItems: 'center', alignSelf: 'center', borderRadius: 10, marginVertical: '10%', top: '5%' }}>
                            <Text style={[texts.SUBHEADING_TEXT, { paddingVertical: '5%', color: '#fff' }]}>Update</Text>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

export default ProfileSetting