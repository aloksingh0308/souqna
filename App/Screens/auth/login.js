import React, { Component } from 'react'
import { SafeAreaView, View, Text, Image, TextInput, ScrollView, TouchableOpacity,ImageBackground ,StyleSheet} from 'react-native'
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
import { PowerTranslator, ProviderTypes, TranslatorConfiguration, TranslatorFactory } from 'react-native-power-translator';
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
            is_error: false,
            securedPass:true

        }
    }

   async  componentDidMount(){
        try {
            const lng = await AsyncStorage.getItem('lng');
            TranslatorConfiguration.setConfig(ProviderTypes.Google, 'AIzaSyBY54m5k1-VQeAl3nw95pX79fnHp8_CqLg',lng,'en');
            // const translator = TranslatorFactory.createTranslator();
            // translator.translate('Find Cars, Mobile phones and more').then(translated => {
            //     //Do something with the translated text
            //     this.setState({placeholdertxt:translated})
            // });
            setTimeout(()=>{
                this.setState({isLoading:false})
            },1000)
        } catch (error) {
            console.log(error);
            // Error retrieving data
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
                        try {
                            await AsyncStorage.setItem(
                                'userId',
                                res.user.id.toString()
                            );
                        } catch (error) {
                            // Error saving data
                        }

                        this.props.navigation.replace('Select_Language_Screen')
                        showToast('Logged In Successfully')
                    }else {
                        this.setState({ invalid_login: true })
                        setTimeout(() => {
                            this.setState({ invalid_login: false })
                        }, 2000)
                    }
                   
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
                                {/* <Text style={[texts.SUBHEADING_TEXT, { paddingHorizontal: '5%', color: 'red', paddingTop: '2%' }]}>Something Went Wrong</Text> */}
                                <PowerTranslator style={{...texts.SUBHEADING_TEXT,paddingHorizontal: '5%', color: 'red', paddingTop: '2%' }} text='Something Went Wrong' />
                                <PowerTranslator style={{...texts,NORMAL_TEXT,paddingHorizontal: '5%', color: '#f79c34' }} text={this.state.error_msg}  />
                                {/* <Text style={[texts.NORMAL_TEXT, { paddingHorizontal: '5%', color: '#f79c34' }]}>{this.state.error_msg}</Text> */}
                            </View>
                            <View style={{ width: '20%', alignItems: 'center' }}>
                                <Image source={require('../../Assets/triangle.png')} style={{ width: 32, height: 32, resizeMode: 'contain' }} />
                            </View>
                        </View>
                    ) : null}
                    <View style={{ width: '100%' }}>
                        {/* <Text style={[texts.SUBHEADING_TEXT, { fontSize: 30, width: '95%', paddingVertical: '5%' }]}>Welcome {'\n'} Back ...</Text> */}
                        <PowerTranslator style={{...texts.SUBHEADING_TEXT,fontSize: 30, width: '95%', marginHorizontal:'2%'}} text={`Welcome \n Back ...`} />
                    </View>
                    <View style={{ width: 80, height: 80, borderRadius: 80 / 2, backgroundColor:colors.TEXT_COLOR, elevation: 2, alignSelf: 'center', marginVertical: '3%', marginBottom: '2%', overflow: 'hidden' }} >
                        <Image source={require('../../Assets/logo_small.png')} style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
                    </View>
                    {/* <Text style={[texts.HEADING_TEXT, { paddingHorizontal: '5%' }]}>Login</Text> */}
                    <PowerTranslator style={{...texts.SUBHEADING_TEXT,fontSize: 20, color:colors.TEXT_COLOR,paddingHorizontal:'5%'}} text='Login' />
                    <View style={{ alignItems: 'center', width: '100%', height: hp('22%'), justifyContent: 'flex-end' }}>
                        <View style={{ width: '90%', height: 50, borderBottomWidth: 2, borderColor: this.state.email !== '' ? this.state.email ? colors.PRIMARY_COLOR : 'red' : this.state.is_error ? 'red' : '#ccc', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                            {/* <Image source={require('../../Assets/user.png')} style={{ width: 20, height: 20, resizeMode: 'contain', tintColor: colors.TEXT_COLOR }} /> */}
                            <UserIcons colorbg={'#fff'} color={colors.TEXT_COLOR} />
                            <TextInput
                                placeholderTextColor={'#ccc'}
                                style={[{ width: '80%', color: colors.TEXT_COLOR }, texts.SUBHEADING_TEXT]}
                                placeholder='Username'
                                onChangeText={(text) => this.setState({ email: usernameValidation(text.toLowerCase()) })}
                            />
                            <Text style={{width:16}}></Text>
                        </View>

                        <View style={{ width: '90%', height: 50, borderBottomWidth: 2, marginTop: '5%', borderColor: this.state.password !== '' ? this.state.password ? colors.PRIMARY_COLOR : 'red' : this.state.is_error ? 'red' : '#ccc', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                            {/* <Image source={require('../../Assets/key.png')} style={{ width: 20, height: 20, resizeMode: 'contain', tintColor: colors.TEXT_COLOR }} /> */}
                            <LockIcons color={colors.TEXT_COLOR} />
                            <TextInput
                                placeholderTextColor={'#ccc'}
                                style={[{ width: '80%', color: colors.TEXT_COLOR }, texts.SUBHEADING_TEXT]}
                                placeholder='Password'
                                secureTextEntry={this.state.securedPass}
                                onChangeText={(text) => this.setState({ password: passwordValidation(text) })}
                            />
                            <TouchableOpacity onPress={()=>this.setState({securedPass:!this.state.securedPass})} >
                            <Image source={require('../../Assets/hidden.png')} style={{width:16,height:16,resizeMode:'contain',tintColor:colors.TEXT_COLOR}} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity>
                        <PowerTranslator style={{...texts.NORMAL_TEXT,paddingVertical: '3%', textAlign: 'right', width: '95%' }} text='Forgot Password ?' />
                    </TouchableOpacity>
                    <View style={{ width: '100%', height: hp('28%'), alignItems: 'center', justifyContent: 'flex-end' }}>
                        <TouchableOpacity onPress={() => this.onLogin()}
                            style={{ width: '70%', backgroundColor: colors.TEXT_COLOR, alignItems: 'center', borderRadius: 10, marginVertical: '1%' }}>
                            <Text style={[texts.SUBHEADING_TEXT, { paddingVertical: '5%', color: '#fff' }]}>Login</Text>
                        </TouchableOpacity>
                        {/* <View style={{width:'100%',height:'40%',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                        <View style={styles.logo}>
                        <Image source={require('../../Assets/facebook.png')} style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
                    </View>
                    <View style={styles.logo}>
                        <Image source={require('../../Assets/search.png')} style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
                    </View>
                        </View> */}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginBottom: '1%' }}>
                            {/* <Text style={texts.NORMAL_TEXT}>Don't have an Account?</Text> */}
                            <PowerTranslator style={texts.NORMAL_TEXT} text="Don't have an Account?" />
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('SignUp')}>
                                <PowerTranslator style={{...texts.SUBHEADING_TEXT, fontSize: 16, color: colors.PRIMARY_COLOR, paddingHorizontal: '2%' }} text='Register' />
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

const styles = StyleSheet.create({
  
        logo: {
            height: 30,
            width: 30,
            borderRadius: 30 / 2,
            overflow:'hidden',
            // backgroundColor: colors.TEXT_COLOR,
            marginHorizontal:'3%'
        }
})

