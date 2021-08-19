import React, { Component } from 'react'
import { SafeAreaView, View, Text, Image, TextInput, ScrollView, TouchableOpacity,ImageBackground } from 'react-native'
import { colors } from '../../Components/colors'
import { texts } from '../../Components/textfile'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TestIcons } from '../../Components/icons';
import { postApi } from '../../Components/functions';
import { login_api } from '../../Components/api_link';
import AsyncStorage from '@react-native-community/async-storage';
import CustomAlert from '../../Components/custom_alert'
import { emailValidation, passwordValidation, usernameValidation } from './validation_functions';
import { showToast } from '../../Components/toast_function';
import { LockIcons, UserIcons } from '../../Components/menu_icons';
// import { InputBox } from '../../Components/card'

class LoginScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            emailFcous: false,
            passFocus: false,
            email: '',
            password: '',

            invalid_login: false,
            error_msg: 'Invalid Crediential',
            is_error: false

        }
    }

    onLogin = () => {
        const { email, password, is_error } = this.state
        if (email) {
            if (password) {
                let data = new FormData()
                data.append('username', this.state.email)
                data.append('password', this.state.password)
                postApi(login_api, data).then(async (res) => {
                    console.log(res)
                    if (res.token) {
                        try {
                            await AsyncStorage.setItem(
                                'token',
                                res.token
                            );
                        } catch (error) {
                            // Error saving data
                        }

                        this.props.navigation.replace('DrawerNav', { screen: 'Home' })
                        showToast('Logged In Successfully')
                    }
                    this.setState({ invalid_login: true })
                    setTimeout(() => {
                        this.setState({ invalid_login: false })
                    }, 2000)
                })
            } else {
                this.setState({ is_error: true })
            }
        } else {
            this.setState({ is_error: true })
        }
    }


    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                {/* <ImageBackground source={(require('../../Assets/background_image.png'))} style={{flex:1}}> */}
                <ScrollView>
                    {this.state.invalid_login ? (
                        <View style={{ width: '100%', height: 60, backgroundColor: '#fff', elevation: 5, position: 'absolute', flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: '80%' }} >
                                <Text style={[texts.SUBHEADING_TEXT, { paddingHorizontal: '5%', color: 'red', paddingTop: '2%' }]}>Something Went Wrong</Text>
                                <Text style={[texts.NORMAL_TEXT, { paddingHorizontal: '5%', color: '#f79c34' }]}>{this.state.error_msg}</Text>
                            </View>
                            <View style={{ width: '20%', alignItems: 'center' }}>
                                <Image source={require('../../Assets/triangle.png')} style={{ width: 32, height: 32, resizeMode: 'contain' }} />
                            </View>
                        </View>
                    ) : null}
                    <View style={{ alignItems: 'center', width: '100%' }}>
                        <Text style={[texts.SUBHEADING_TEXT, { fontSize: 30, width: '95%', paddingVertical: '5%' }]}>Welcome {'\n'} Back ...</Text>
                    </View>
                    <View style={{ width: 80, height: 80, borderRadius: 80 / 2, backgroundColor:colors.TEXT_COLOR, elevation: 2, alignSelf: 'center', marginVertical: '3%', marginBottom: '2%', overflow: 'hidden' }} >
                        <Image source={require('../../Assets/logo_small.png')} style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
                    </View>
                    <Text style={[texts.HEADING_TEXT, { paddingHorizontal: '5%' }]}>Login</Text>
                    <View style={{ alignItems: 'center', width: '100%', height: hp('22%'), justifyContent: 'flex-end' }}>
                        <View style={{ width: '90%', height: 50, borderBottomWidth: 2, borderColor: this.state.email !== '' ? this.state.email ? colors.PRIMARY_COLOR : 'red' : this.state.is_error ? 'red' : '#ccc', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                            {/* <Image source={require('../../Assets/user.png')} style={{ width: 20, height: 20, resizeMode: 'contain', tintColor: colors.TEXT_COLOR }} /> */}
                            <UserIcons colorbg={'#fff'} color={colors.PRIMARY_COLOR} />
                            <TextInput
                                placeholderTextColor={'#ccc'}
                                style={[{ width: '80%', color: colors.TEXT_COLOR }, texts.SUBHEADING_TEXT]}
                                placeholder='Username'
                                onChangeText={(text) => this.setState({ email: usernameValidation(text.toLowerCase()) })}
                            />
                        </View>
                        <View style={{ width: '90%', height: 50, borderBottomWidth: 2, marginTop: '5%', borderColor: this.state.password !== '' ? this.state.password ? colors.PRIMARY_COLOR : 'red' : this.state.is_error ? 'red' : '#ccc', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                            {/* <Image source={require('../../Assets/key.png')} style={{ width: 20, height: 20, resizeMode: 'contain', tintColor: colors.TEXT_COLOR }} /> */}
                            <LockIcons color={colors.PRIMARY_COLOR} />
                            <TextInput
                                placeholderTextColor={'#ccc'}
                                style={[{ width: '80%', color: colors.TEXT_COLOR }, texts.SUBHEADING_TEXT]}
                                placeholder='Password'
                                secureTextEntry={true}
                                onChangeText={(text) => this.setState({ password: passwordValidation(text) })}
                            />
                        </View>
                    </View>
                    <TouchableOpacity>
                        <Text style={[texts.NORMAL_TEXT, { paddingVertical: '3%', textAlign: 'right', width: '95%' }]}>Forgot Password ?</Text>
                    </TouchableOpacity>
                    <View style={{ width: '100%', height: hp('28%'), alignItems: 'center', justifyContent: 'flex-end' }}>
                        <TouchableOpacity onPress={() => this.onLogin()}
                            style={{ width: '70%', backgroundColor: colors.TEXT_COLOR, alignItems: 'center', borderRadius: 10, marginVertical: '5%' }}>
                            <Text style={[texts.SUBHEADING_TEXT, { paddingVertical: '5%', color: '#fff' }]}>Login</Text>
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginBottom: '5%' }}>
                            <Text style={texts.NORMAL_TEXT}>Don't have an Account?</Text>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('SignUp')}>
                                <Text style={[texts.SUBHEADING_TEXT, { fontSize: 16, color: colors.PRIMARY_COLOR, paddingHorizontal: '2%' }]}>Register</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
                {/* </ImageBackground> */}
            </SafeAreaView>
        )
    }
}
export default LoginScreen