import React, { Component } from "react";
import { SafeAreaView, Text, View, TouchableOpacity, Image } from 'react-native';
import { Header } from 'native-base';
import { texts } from "../Components/textfile";
import { InputBox } from "../Components/input";
import { ScrollView } from "react-native-gesture-handler";
import { colors } from "../Components/colors";

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            mobile_number: '',
            password: '',

        }
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView>
                    <Header style={{ backgroundColor: '#fff', elevation: 0 }}>
                        <View style={{ width: '90%', height: '100%', justifyContent: 'center' }}>
                            <Text style={texts.HEADING_TEXT}>Create an Account</Text>
                        </View>
                    </Header>

                    <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#fff' }}>
                        <View style={{ width: 80, height: 80, borderRadius: 80 / 2, backgroundColor: '#fff', elevation: 2, alignSelf: 'center', marginVertical: '3%', marginBottom: '2%' }} >
                            <Image source={require('../Assets/logo_small.png')} style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
                        </View>
                        <Text style={[texts.HEADING_TEXT, { paddingHorizontal: '5%', paddingVertical: '3%', width: '100%' }]}>Sign Up</Text>
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
                            title='Password *'
                            placeHolder='Enter Password'
                            onChangeText={(text) => this.setState({ password: text })}
                            secureEntry={true}
                            styles={{ width: '100%', alignItems: 'center', marginTop: '3%' }}
                        />
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: '3%', width: '95%', justifyContent: 'space-around' }}>
                            <TouchableOpacity>
                                <View style={{ width: 25, height: 25, borderRadius: 5, borderWidth: 1, borderColor: colors.TEXT_COLOR }}></View>
                            </TouchableOpacity>
                            <Text style={[texts.NORMAL_TEXT, { width: '90%' }]} >Accept our terms & conditions to continue</Text>
                        </View>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('VerifyOtp')}
                            style={{ width: '70%', backgroundColor: colors.TEXT_COLOR, alignItems: 'center', borderRadius: 10, marginVertical: '5%' }}>
                            <Text style={[texts.SUBHEADING_TEXT, { paddingVertical: '5%', color: '#fff' }]}>Sign Up</Text>
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginBottom: '5%' }}>
                            <Text style={texts.NORMAL_TEXT}>Already have an Account?</Text>
                            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                                <Text style={[texts.SUBHEADING_TEXT, { fontSize: 16, color: colors.PRIMARY_COLOR, paddingHorizontal: '2%' }]}>Login</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

export default Register