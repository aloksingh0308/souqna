import React, { Component } from 'react'
import { SafeAreaView, Text, StyleSheet, View, Image, TouchableOpacity, ScrollView, Dimensions, TextInput } from 'react-native'
import { Header } from 'native-base'
// import { SliderBox } from "react-native-image-slider-box";
import { colors } from '../Components/colors'
import { FlatList } from 'react-native-gesture-handler';
import { texts } from '../Components/textfile';
import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from "react-native-customized-image-picker";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { PowerTranslator, ProviderTypes, TranslatorConfiguration, TranslatorFactory } from 'react-native-power-translator';
import { generate_UUID } from '../Components/functions';


class Chat extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isFav: false,
            isMyads: true,
            user_id:'',
            msgData:[],
            msgtxt:'',
            lst_msg:this.props.route.params.last_message
        }
        this.socket = new WebSocket(`ws://3.23.128.206/ws/chat/?token=${this.props.route.params.token}&user=${this.props.route.params.userId.id}`);
        this.socket.onopen = () => {
          console.log('connected')
        }; 
        this.emit = this.emit.bind(this);
       
    }

    emit(text) {
       if(text){
        this.socket.send(JSON.stringify({
            "action":"MESSAGE_SEND",
            "text":text
          }))
   this.setState({msgtxt:""})     
   this.getLastmsg()
        }
      }

      addImage = () => {
        ImagePicker.openPicker({
          multiple: true
        }).then(images => {
          console.log(images[0].path);
        //   this.setState({images:images})
          let photo = {
            name: generate_UUID() +  '.png',
            type: "image/png",
            uri: images[0].path,
        };
        });
      }
    

      getLastmsg=async()=>{
        try {
            const token = await AsyncStorage.getItem('token');
            if (token !== null) {
                // console.log(token)
                let last_msg_id=this.state.lst_msg+1
                this.setState({lst_msg:last_msg_id})
                let url=`http://3.23.128.206/api/v1/messages/?user=${this.props.route.params.userId.id}`
                fetch(url, {
                    method: 'get',
                    headers: new Headers({
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }),
                }).then((response) => response.json()).then(async (data) => {
                    console.log(data.results)
                    this.setState({ msgData: data.results })
                })  
            }
        } catch (error) {
            console.log(error);
        }
      }

   async componentDidMount(){
try {
    const user_id = await AsyncStorage.getItem('userId');
   this.setState({user_id:user_id})
   console.log(user_id)
} catch (error) {
    console.log(error);
}
this.getLastmsg()
        try {
            const lng = await AsyncStorage.getItem('lng');
            TranslatorConfiguration.setConfig(ProviderTypes.Google, 'AIzaSyBY54m5k1-VQeAl3nw95pX79fnHp8_CqLg',lng,'en');
        } catch (error) {
            console.log(error);
        } 
    }
    renderChat = ({ item }) => {
        return (
            <View style={{ width: '100%', }}>
                {this.state.user_id==item.user.id?(
                     <View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>
                     <View style={{ backgroundColor: colors.TEXT_COLOR, marginTop: 15, minWidth: '25%', maxWidth: '75%', borderRadius: 10 }}>
                         <Text style={{ paddingVertical: 10, paddingHorizontal: 5, color: '#fff', textAlign: 'center' }}>{item.text}</Text>
                     </View>
                     <View style={{ width: 30, height: 30, borderRadius: 30 / 2,backgroundColor:colors.TEXT_COLOR }}>
                         <Image source={require('../Assets/logo_small.png')} style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
                     </View>
                 </View>
                ):(
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: 30, height: 30, borderRadius: 30 / 2,overflow:'hidden',backgroundColor:colors.TEXT_COLOR }}>
                            <Image source={require('../Assets/logo_small.png')} style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
                        </View>
                        <View style={{ backgroundColor: colors.GREY_COLOR, marginTop: 15, minWidth: '25%', maxWidth: '75%', borderRadius: 10 }}>
                            <Text style={{ paddingVertical: 10, paddingHorizontal: 5, color: colors.TEXT_COLOR, textAlign: 'center' }}>{item.text}</Text>
                        </View>
                    </View>
                )}
                
            </View>
        )
    }

    render() {
        const {msgData} = this.state
        return (

            <SafeAreaView style={{ flex: 1 }}>
                <Header style={{ backgroundColor: colors.PRIMARY_COLOR, elevation: 0 }}>
                    <View style={{ width: '10%', justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Image source={require('../Assets/arrow.png')} style={styless.icn_style} />
                        </TouchableOpacity>
                    </View>
                    <View style={styless.headerStyle}>
                        <View style={{ width: 40, height: 40, borderRadius: 40 / 2,backgroundColor:colors.TEXT_COLOR }}>
                            <Image source={require('../Assets/logo_small.png')} style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
                        </View>
                        <View style={{flex:1,paddingRight:'5%'}}>
                            <PowerTranslator style={{...texts.SUBHEADING_TEXT, color: colors.TEXT_COLOR, paddingHorizontal: '1%' }} text={this.props.route.params.userId.fullname} />
                            <View style={{ position: 'absolute',justifyContent:'flex-end',height:38,width:'100%' }}>
                                {/* <PowerTranslator style={[texts.NORMsAL_TEXT, { color: 'green', paddingHorizontal: '1%',paddingTop:5 }]} text='online' /> */}
                            </View>
                        </View>
                    </View>
                </Header>
                <ScrollView>
                    <View style={{ width: '100%', height: hp('85%'),backgroundColor:'#fff' }}>
                        <FlatList
                            data={msgData}
                            inverted
                            // ListFooterComponent={this.chatHeader}
                            keyExtractor={(item) => item.id}
                            renderItem={this.renderChat}
                        />
                    </View>
                <View style={{ width: windowWidth, height: hp('7%'), backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', elevation: 2 }}>

                    <View style={{ width: '98%', height: '90%', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                        <View style={{
                            width: '87%', backgroundColor: '#fff', height: '100%', borderWidth: 1, borderColor: '#bbb',
                            borderRadius: 30, justifyContent: 'space-around', flexDirection: 'row', overflow: 'hidden', alignItems: 'center'
                        }}>
                            <View style={{ width: '12%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity onPress={()=>this.addImage()} >
                                    <Image source={require('../Assets/paper-clip.png')} style={{ width: 28, height: 28, resizeMode: 'contain', tintColor: colors.TEXT_COLOR }} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: '88%', height: '100%', justifyContent: 'center', }}>
                                <TextInput
                                    multiline
                                    value={this.state.msgtxt}
                                    style={texts.NORMAL_TEXT}
                                    placeholder='| Type a message'
                                    placeholderTextColor={'#aaa'}
                                    onChangeText={(text)=>this.setState({msgtxt:text})}
                                />
                            </View>
                        </View>
                        <View style={{ width: '12%', height: '65%', justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity onPress={()=>this.emit(this.state.msgtxt)} >
                                <Image source={require('../Assets/send.png')} style={{ width: 32, height: 32, resizeMode: 'contain', tintColor: colors.TEXT_COLOR }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                </ScrollView>
            </SafeAreaView>

        )
    }
}
export default Chat

const styless = StyleSheet.create({
    headerStyle: {
        width: '95%',
        alignSelf: 'center',
        flexDirection: 'row'
    },
    btn_container: {
        width: '100%',
        marginTop: '5%'
    },
    btnStyle: {
        borderColor: colors.PRIMARY_COLOR
    },
    btnText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        padding: '2%'
    },
    icn_style: { 
        width: 24, 
        height: 25, 
        resizeMode: 'contain', 
        tintColor: colors.TEXT_COLOR 
    }
})