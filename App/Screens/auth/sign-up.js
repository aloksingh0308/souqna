import React, { Component } from "react";
import { SafeAreaView, Text, View, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Header } from 'native-base';
import { texts } from "../../Components/textfile";
import { InputBox } from "../../Components/input";
import { ScrollView } from "react-native-gesture-handler";
import { colors } from "../../Components/colors";
import { signup_api } from "../../Components/api_link";
import { postApi } from "../../Components/functions";
import { emailValidation, mobileValidation, passwordValidation, usernameValidation } from './validation_functions'
import { showToast } from "../../Components/toast_function";

class SignUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            mobile_number: '',
            password: '',
            user_name: '',
            is_error: false,
            is_mark: false,
            isLoading: false

        }
    }

    onSignup = () => {
        this.setState({ isLoading: true })
        const { name, email, mobile_number, password, user_name } = this.state
        if (user_name) {
            if (name) {
                if (email) {
                    if (mobile_number) {
                        if (password) {
                            let data = new FormData()
                            data.append('mobile', mobile_number)
                            data.append('fullname', name)
                            data.append('email', email)
                            data.append('password', password)
                            data.append('username', user_name)
                            console.log(data)

                            postApi(signup_api, data).then((res) => {
                                console.log(res)
                                showToast(res.msg?res.msg:'Resistered Successfully')
                                if (res.token) {
                                    // showToast('Registered Successfully')
                                    
                                    this.props.navigation.goBack()
                                }
                                this.setState({ isLoading: false })
                            })
                        } else {
                            this.setState({ is_error: true })
                        }
                    } else {
                        this.setState({ is_error: true })
                    }
                } else {
                    this.setState({ is_error: true })
                }
            } else {
                this.setState({ is_error: true })
            }
        } else {
            this.setState({ is_error: true })
        }

    }
    render() {
        const { user_name, email, password, mobile_number, name, is_error } = this.state
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView>
                    {/* <Header style={{ backgroundColor: '#fff', elevation: 0 }}>
                        <View style={{ width: '90%', height: '100%', justifyContent: 'center' }}>
                            <Text style={texts.HEADING_TEXT}>Create an Account</Text>
                        </View>
                    </Header> */}

                    <View style={{ alignItems: 'center', backgroundColor: '#fff' }}>
                        <View style={{ width: 80, height: 80, borderRadius: 80 / 2, backgroundColor: colors.TEXT_COLOR, elevation: 2, alignSelf: 'center', marginVertical: '3%', marginBottom: '2%' }} >
                            <Image source={require('../../Assets/logo_small.png')} style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
                        </View>
                        <Text style={[texts.HEADING_TEXT, { paddingHorizontal: '5%', paddingVertical: '3%', width: '100%' }]}>Create an Account</Text>
                        <InputBox
                            title='User Name *'
                            placeHolder='Enter Name'
                            maxLength={100}
                            onChangeText={(text) => this.setState({ user_name: usernameValidation(text.toLowerCase()) })}
                            styles={{ width: '100%', alignItems: 'center', marginTop: '1%' }}
                            textBoxStyle={{ borderColor: user_name !== '' ? user_name == false ? 'red' : '#aaa' : is_error == true ? 'red' : '#aaa' }}
                        />
                        <InputBox
                            title='Name *'
                            placeHolder='Enter Name'
                            maxLength={100}
                            onChangeText={(text) => this.setState({ name: text })}
                            styles={{ width: '100%', alignItems: 'center', marginTop: '1%' }}
                        />
                        <InputBox
                            title="Email I'd *"
                            placeHolder='Enter email'
                            maxLength={100}
                            onChangeText={(text) => this.setState({ email: emailValidation(text) })}
                            styles={{ width: '100%', alignItems: 'center', marginTop: '3%' }}
                            textBoxStyle={{ borderColor: email !== '' ? email == false ? 'red' : '#aaa' : is_error == true ? 'red' : '#aaa' }}
                        />
                        <InputBox
                            title='Mobile Numner *'
                            keyBoardType='decimal-pad'
                            placeHolder='Enter mobile number'
                            maxLength={10}
                            onChangeText={(text) => this.setState({ mobile_number: mobileValidation(text) })}
                            styles={{ width: '100%', alignItems: 'center', marginTop: '3%' }}
                            textBoxStyle={{ borderColor: mobile_number !== '' ? mobile_number == false ? 'red' : '#aaa' : is_error == true ? 'red' : '#aaa' }}
                        />
                        <InputBox
                            title='Password *'
                            placeHolder='Enter Password'
                            maxLength={100}
                            onChangeText={(text) => this.setState({ password: passwordValidation(text) })}
                            secureEntry={true}
                            styles={{ width: '100%', alignItems: 'center', marginTop: '3%' }}
                            textBoxStyle={{ borderColor: password !== '' ? password == false ? 'red' : '#aaa' : is_error == true ? 'red' : '#aaa' }}
                        />
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: '5%', width: '95%', justifyContent: 'space-around' }}>
                            <TouchableOpacity onPress={() => this.setState({ is_mark: !this.state.is_mark })}>
                                <View style={{ width: 20, height: 20, borderRadius: 5, borderWidth: 1, borderColor: colors.TEXT_COLOR, justifyContent: 'center', alignItems: 'center' }}>
                                    {this.state.is_mark ? (
                                        <Image source={require('../../Assets/checked.png')} style={{ width: 16, height: 16, resizeMode: 'contain', tintColor: colors.TEXT_COLOR }} />
                                    ) : null}
                                </View>
                            </TouchableOpacity>
                            <Text style={[texts.NORMAL_TEXT, { width: '90%' }]} >Accept our terms & conditions to continue</Text>
                        </View>
                        <TouchableOpacity onPress={() => this.onSignup()}
                            style={{ width: '70%', backgroundColor: colors.TEXT_COLOR, alignItems: 'center', borderRadius: 10, marginVertical: '5%' }}>
                            {this.state.isLoading ? (
                                <ActivityIndicator
                                style={{paddingVertical:'5%'}}
                                    // animating={animating}
                                    color='#fff'
                                    size="large" />

                            ) : (
                                <Text style={[texts.SUBHEADING_TEXT, { paddingVertical: '5%', color: '#fff' }]}>Sign Up</Text>
                            )}

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

export default SignUp