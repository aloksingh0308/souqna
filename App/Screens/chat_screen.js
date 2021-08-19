import React, { Component } from 'react'
import { SafeAreaView, Text, StyleSheet, View, Image, TouchableOpacity, ScrollView, Dimensions, TextInput } from 'react-native'
import { Header } from 'native-base'
// import { SliderBox } from "react-native-image-slider-box";
import { colors } from '../Components/colors'
import { FlatList } from 'react-native-gesture-handler';
import { texts } from '../Components/textfile';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import { color } from 'react-native-reanimated';
const DATA = [
    {
        id: 1,
        title: 'First Item',
    },
    {
        id: 2,
        title: 'Second Item',
    },
    {
        id: 3,
        title: 'Third Item',
    },
];

class Chat extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isFav: false,
            isMyads: true,
        }
    }
    // http://127.0.0.1:8000/api/v1/chats/
    
    renderChat = ({ item }) => {
        return (
            <View style={{ width: '100%', }}>
                {item.id % 2 != 0 ? (
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: 30, height: 30, borderRadius: 30 / 2,overflow:'hidden',backgroundColor:colors.TEXT_COLOR }}>
                            <Image source={require('../Assets/logo_small.png')} style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
                        </View>
                        <View style={{ backgroundColor: colors.GREY_COLOR, marginTop: 15, minWidth: '25%', maxWidth: '75%', borderRadius: 10 }}>
                            <Text style={{ paddingVertical: 10, paddingHorizontal: 5, color: colors.TEXT_COLOR, textAlign: 'center' }}>Hello h</Text>
                        </View>
                    </View>
                ) : null}
                {item.id % 2 == 0 ? (
                    <View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>
                        <View style={{ backgroundColor: colors.TEXT_COLOR, marginTop: 15, minWidth: '25%', maxWidth: '75%', borderRadius: 10 }}>
                            <Text style={{ paddingVertical: 10, paddingHorizontal: 5, color: '#fff', textAlign: 'center' }}>Hello h</Text>
                        </View>
                        <View style={{ width: 30, height: 30, borderRadius: 30 / 2,backgroundColor:colors.TEXT_COLOR }}>
                            <Image source={require('../Assets/logo_small.png')} style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
                        </View>
                    </View>
                ) : null}
            </View>
        )
    }

    render() {
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
                        <View style={{flex:1}}>
                            <Text style={[texts.SUBHEADING_TEXT, { color: colors.TEXT_COLOR, paddingHorizontal: '1%' }]}>User Name</Text>
                            <View style={{ position: 'absolute',justifyContent:'flex-end',height:38 }}>
                                <Text style={[texts.NORMAL_TEXT, { color: 'green', paddingHorizontal: '1%',paddingTop:5 }]}>online</Text>
                            </View>
                        </View>
                    </View>
                </Header>
                <ScrollView>
                {/* <View style={{ flex: 1, backgroundColor: 'red', }}> */}
                    <View style={{ width: '100%', height: hp('80%'),backgroundColor:'#fff' }}>
                        <FlatList
                            data={DATA}
                            inverted
                            keyExtractor={(item) => item.id}
                            renderItem={this.renderChat}
                        />

                    </View>
                {/* </View> */}

                <View style={{ width: windowWidth, height: hp('7%'), backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', elevation: 2 }}>

                    <View style={{ width: '98%', height: '90%', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                        <View style={{
                            width: '87%', backgroundColor: '#fff', height: '100%', borderWidth: 1, borderColor: '#bbb',
                            borderRadius: 30, justifyContent: 'space-around', flexDirection: 'row', overflow: 'hidden', alignItems: 'center'
                        }}>
                            <View style={{ width: '12%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity>
                                    <Image source={require('../Assets/paper-clip.png')} style={{ width: 28, height: 28, resizeMode: 'contain', tintColor: colors.TEXT_COLOR }} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: '88%', height: '100%', justifyContent: 'center', }}>
                                <TextInput
                                    multiline
                                    style={texts.NORMAL_TEXT}
                                    placeholder='| Type a message'
                                    placeholderTextColor={'#aaa'}
                                />
                            </View>
                        </View>
                        <View style={{ width: '12%', height: '65%', justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity>
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
        // backgroundColor: colors.TEXT_COLOR,
        // justifyContent: 'center',
        // alignItems: 'center',
        // paddingHorizontal:'2%',
        alignSelf: 'center',
        flexDirection: 'row'
        // height:60
        // marginTop:50,
        // borderRadius:10
    },
    btn_container: {
        width: '100%',
        // flexDirection: 'row',
        // justifyContent: 'space-around',
        // alignItems: 'center',
        marginTop: '5%'
    },
    btnStyle: {
        // borderBottomWidth: 2,
        borderColor: colors.PRIMARY_COLOR
    },
    btnText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        padding: '2%'
    },
    icn_style: { width: 24, height: 25, resizeMode: 'contain', tintColor: colors.TEXT_COLOR }
})