import React, { Component } from "react";
import { SafeAreaView, Text, View, TouchableOpacity, Image,Modal } from 'react-native';
import { Header } from 'native-base';
import { texts } from "../Components/textfile";
import { InputBox } from "../Components/input";
import { ScrollView } from "react-native-gesture-handler";
import { colors } from "../Components/colors";
// import * as ImagePicker from "react-native-image-picker"
import ImagePicker from "react-native-customized-image-picker";
import AsyncStorage from '@react-native-community/async-storage';
import { generate_UUID, postApi, postApiwithToken } from "../Components/functions";
import { change_pass, send_otp, update_profile } from "../Components/api_link";
import { showToast } from "../Components/toast_function";
class ProfileSetting extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            mobile_number: '',
            password: '',
            otp:'',
            profile_pic: '',
            // profile_pic_path:''
            is_change_pass:false,
            isOtp:false

        }
    }

    updateProfile=async()=>{
        let photo = {
            name: generate_UUID()+  '.png',
            type: "image/png",
            uri:this.state.profile_pic,
        };
        let data = new FormData()
        data.append("fullname", this.state.name)
        data.append("pic", photo)
    try {
        const token = await AsyncStorage.getItem('token');
        if (token !== null) {
          postApiwithToken(update_profile, data, token).then(async(res) => {
           console.log(res)
           if(res.token){
            try {
                await AsyncStorage.setItem(
                    'token',
                    res.token
                );
            } catch (error) {
                // Error saving data
            }
               showToast('Updated Successfully')
               this.props.navigation.goBack()
           }

          })
        }
  
      } catch (error) {
        console.log(error);
      }
    
    }

    sendOtp=()=>{
        let data = new FormData()
        data.append("email", this.state.email)
        
        postApi(send_otp,data).then(async(res) => {
            console.log(res)
            if(res.message==='OTP sent successfully'){
                this.setState({isOtp:true})
                showToast(res.message)
            }

        })
    }

    changePassword=()=>{
        let data = new FormData()
        data.append("email", this.state.email)
        data.append("new_password", this.state.password)
        data.append("otp", this.state.otp)
        postApi(change_pass,data).then(async(res) => {
            console.log(res)
            if(res.message==='Password changed successfully!'){
                
                this.setState({isOtp:false,is_change_pass:false})
                showToast(res.message)
            }

        })
    }

    

    addImage = () => {
        ImagePicker.openPicker({
        //   multiple: true
        }).then(images => {
          console.log(images);
          this.setState({profile_pic:images[0].path})
        });
      }
    render() {
        return (
            <SafeAreaView style={{ flex: 1,backgroundColor:'#fff' }}>
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
                        {/* <InputBox
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
                        /> */}

                        <TouchableOpacity onPress={()=>this.setState({is_change_pass:true})} style={{ alignSelf:'flex-end'}}>
                            <Text style={[texts.NORMAL_TEXT, { paddingVertical: '5%',paddingHorizontal:'5%', color:colors.TEXT_COLOR }]}>Change Password ? </Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=>this.updateProfile()}
                        style={{ width: '70%', backgroundColor: colors.TEXT_COLOR, alignItems: 'center', alignSelf: 'center', borderRadius: 10, marginVertical: '10%', top: '5%' }}>
                            <Text style={[texts.SUBHEADING_TEXT, { paddingVertical: '5%', color: '#fff' }]}>Update</Text>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
                <Modal 
                onRequestClose={()=>this.setState({is_change_pass:false})}
                transparent={true} visible={this.state.is_change_pass}>
                   <View style={{flex:1,justifyContent:"flex-end"}}>
                   <View style={{width:'100%',height:'50%',backgroundColor:colors.TEXT_COLOR,borderTopLeftRadius:25,borderTopRightRadius:25,paddingTop:'7%'}}>
                  {this.state.isOtp?(
                      <>
                       <InputBox
                       title='OTP'
                       placeHolder='Enter OTP'
                       onChangeText={(text) => this.setState({ otp: text })}
                       // secureEntry={true}
                       titleStyle={{color:'#fff'}}
                       styles={{ width: '100%', alignItems: 'center', marginTop: '3%' }}
                   />
                    <InputBox
                       title='New Password'
                       placeHolder='Enter New Password'
                       onChangeText={(text) => this.setState({ password: text })}
                       titleStyle={{color:'#fff'}}
                       // secureEntry={true}
                       styles={{ width: '100%', alignItems: 'center', marginTop: '3%' }}
                   />
                   <TouchableOpacity onPress={()=>this.changePassword()}
                   style={{ width: '70%', backgroundColor:'#fff', alignItems: 'center', alignSelf: 'center', borderRadius: 10, marginVertical: '10%', top: '5%',justifyContent:'center' }}>
                       <Text style={[texts.SUBHEADING_TEXT, { paddingVertical: '5%', color: '#333' }]}>Change Password</Text>
                   </TouchableOpacity>
                   </>
                  ):(
                      <>
                    <InputBox
                    title='Email'
                    placeHolder='Enter Email'
                    onChangeText={(text) => this.setState({ email: text })}
                    titleStyle={{color:'#fff'}}
                    // secureEntry={true}
                    styles={{ width: '100%', alignItems: 'center', marginTop: '3%' }}
                />
                <TouchableOpacity onPress={()=>this.sendOtp()}
                style={{ width: '70%', backgroundColor:'#fff', alignItems: 'center', alignSelf: 'center', borderRadius: 10, marginVertical: '10%', top: '5%',justifyContent:'center' }}>
                    <Text style={[texts.SUBHEADING_TEXT, { paddingVertical: '5%', color: '#333' }]}>Send OTP</Text>
                </TouchableOpacity>
                </>
                  )}
                   </View>
                   </View>
                </Modal>
            </SafeAreaView>
        )
    }
}

export default ProfileSetting