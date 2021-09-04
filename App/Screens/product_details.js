import React, { Component } from 'react'
import { SafeAreaView, Text, StyleSheet, View, Image, TouchableOpacity, ScrollView, PermissionsAndroid } from 'react-native'
import { Header } from 'native-base'
import { SliderBox } from "react-native-image-slider-box";
import { colors } from '../Components/colors'
import { Card } from '../Components/card'
import { FlatList } from 'react-native-gesture-handler';
import { texts } from '../Components/textfile';
const img = require('../Assets/home.png')
import { categoryData } from '../Components/categoryData';
import Geolocation from 'react-native-geolocation-service';
import AsyncStorage from '@react-native-community/async-storage';
import Geocoder from 'react-native-geocoding';
import { ChatIcons, CommentIcons, LikeIcons, LocationIcons, LockIcons, ShareIcons } from '../Components/menu_icons';
import MapView, { PROVIDER_GOOGLE,Marker } from 'react-native-maps';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
Geocoder.init("AIzaSyC5m-C32piW2yiT3kevVbvLfHXsLsPTWik");
import { PowerTranslator, ProviderTypes, TranslatorConfiguration, TranslatorFactory } from 'react-native-power-translator';

class ProductDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
            current_city: '',
            isCompany:false,
            is_car:false,
            productList:[],
            token:"",
            userid:''
            // data=this.props.route.params.item
        };
    }

    async componentDidMount() {
        // console.log('=============fvgbhnm')
        try {
            const userid = await AsyncStorage.getItem('userId');
            if (userid !== null) {
                console.log(userid)
              this.setState({userid:userid})
            }
    
        } catch (error) {
            console.log(error);
            // Error retrieving data
        }
        
        if(this.props.route.params.item.type==='COMPANY'){
            this.setState({isCompany:true,
            productList:this.props.route.params.item.extra
            })
            
        }else if(this.props.route.params.item.type==='CAR'){
            this.setState({is_car:true,
                productList:this.props.route.params.item.extra
                })
        }
        try {
            const lng = await AsyncStorage.getItem('lng');
            TranslatorConfiguration.setConfig(ProviderTypes.Google, 'AIzaSyBY54m5k1-VQeAl3nw95pX79fnHp8_CqLg',lng,'en');
        } catch (error) {
            console.log(error);
            // Error retrieving data
        }
        try {
            const token = await AsyncStorage.getItem('token');
            if (token !== null) {
                // console.log(token)
              this.setState({token:token})
            }
    
        } catch (error) {
            console.log(error);
            // Error retrieving data
        }
    }

   
    render() {
        const { item} = this.props.route.params;
        const {token} =this.state
        // console.log(item)
        return (
            <SafeAreaView style={{ flex: 1,backgroundColor:'#fff' }}>
                <ScrollView >
                    <View style={{ backgroundColor: '#fff', borderTopLeftRadius: 40, borderTopRightRadius: 40, alignItems: 'center' }}>

                        <View style={{ width: '100%', backgroundColor: '#fff', overflow: 'hidden', }}>
                            <SliderBox autoplay sliderBoxHeight={210} images={item.images.map((item)=>item.file)} autoplay resizeMode='cover'  />
                            {/* <Image source={require('../Assets/prop.png')} /> */}
                        </View>
                        <View style={{ width: '95%', }}>
                            <PowerTranslator style={{...texts.SUBHEADING_TEXT, fontSize: 16, paddingTop: '5%' }} text={item.title} />
                            <PowerTranslator style={{...texts.HEADING_TEXT, color: 'green' }} text={`Rs. ${item.price}`} />
                            <PowerTranslator style={{...texts.SUBHEADING_TEXT}} text='Description' />
                            <PowerTranslator style={{...texts.NORMAL_TEXT, fontSize: 14, paddingVertical: '2%' ,width:wp('95%')}} text={item.description} />
                        </View>
                     {this.state.isCompany?(
                         <>
                            <PowerTranslator style={{...texts.SUBHEADING_TEXT,width:'95%'}} text='Products' />
                            <View style={{width:'95%',paddingVertical:'3%'}}>
                            <PowerTranslator style={texts.NORMAL_TEXT} text={item.extra.prod1} />
                            <PowerTranslator style={texts.NORMAL_TEXT} text={item.extra.prod2} />
                            <PowerTranslator style={texts.NORMAL_TEXT} text={item.extra.prod3} />
                            <PowerTranslator style={texts.NORMAL_TEXT} text={item.extra.prod4} />
                            <PowerTranslator style={texts.NORMAL_TEXT} text={item.extra.prod5} />
                            </View>
                            </>
                     ):null}

                     {this.state.is_car?(
                            <View style={{ width: '90%', marginTop: '0%',alignItems:'center' }}>
                            <PowerTranslator style={{...texts.SUBHEADING_TEXT, fontSize: 14, paddingVertical: '2%' ,width:wp('95%')}} text='Product Details' />
                            <View style={{ width: '80%', flexDirection: 'row', justifyContent: 'space-around' }}>
                                <PowerTranslator style={{...texts.SUBHEADING_TEXT,textAlign: 'left',width:200 }} text='Brand' /> 
                                <PowerTranslator style={{...texts.NORMAL_TEXT,  textAlign: 'left' ,width:100}} text={item.extra.brand_name} />
                            </View>
                            <View style={{ width: '80%', flexDirection: 'row', justifyContent: 'space-around' }}>
                            <PowerTranslator style={{...texts.SUBHEADING_TEXT,textAlign: 'left',width:200 }} text='Year' /> 
                            <PowerTranslator style={{...texts.NORMAL_TEXT,  textAlign: 'left',width:100 }} text={item.extra.buy_year} />
                            </View>
                            <View style={{ width: '80%', flexDirection: 'row', justifyContent: 'space-around' }}>
                            <PowerTranslator style={{...texts.SUBHEADING_TEXT, textAlign: 'left' ,width:200}} text='Fuel' /> 
                            <PowerTranslator style={{...texts.NORMAL_TEXT,  textAlign: 'left',width:100 }} text={item.extra.fuel} />
                            </View>
                            <View style={{ width: '80%', flexDirection: 'row', justifyContent: 'space-around' }}>
                            <PowerTranslator style={{...texts.SUBHEADING_TEXT,textAlign: 'left',width:200 }} text='Transmission' /> 
                            <PowerTranslator style={{...texts.NORMAL_TEXT,  textAlign: 'left',width:100 }} text={item.extra.transmission} />
                            </View>
                            <View style={{ width: '80%', flexDirection: 'row', justifyContent: 'space-around' }}>
                            <PowerTranslator style={{...texts.SUBHEADING_TEXT, textAlign: 'left',width:200 }} text='Number of Owners' /> 
                            <PowerTranslator style={{...texts.NORMAL_TEXT,  textAlign: 'left',width:100 }} text={item.extra.number_owners} />
                            </View>
                            <View style={{ width: '80%', flexDirection: 'row', justifyContent: 'space-around' }}>
                            <PowerTranslator style={{...texts.SUBHEADING_TEXT, textAlign: 'left',width:200 }} text='K.M. Driven' /> 
                            <PowerTranslator style={{...texts.NORMAL_TEXT,  textAlign: 'left',width:100 }} text={item.extra.km_driven} />
                            </View>
                        </View>
                     ):null}
                        
                        <PowerTranslator style={{...texts.SUBHEADING_TEXT, fontSize: 14, paddingVertical: '2%' ,width:wp('95%')}} text='Address' />
                        <View style={{ width: '95%', height: '15%', backgroundColor: colors.GREY_COLOR, borderRadius: 10, overflow: 'hidden' }}>
                            <MapView
                                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                                style={{ flex: 1 }}
                                region={{
                                    latitude: parseFloat(item.location.lat),
                                    longitude: parseFloat(item.location.lon),
                                    latitudeDelta: 0.015,
                                    longitudeDelta: 0.0121,
                                }}
                            >
                                <Marker
                                    coordinate={{ latitude:  parseFloat(item.location.lat), longitude: parseFloat(item.location.lon), }}
                                    // image={require('../assets/pin.png')}
                                />

                            </MapView>
                        </View>

                        {this.state.userid==item.user.id?null:(
                            <>
                            <View style={{ width: '90%', height: hp('15%'), marginTop: '5%' }}>
                            <PowerTranslator style={texts.SUBHEADING_TEXT} text='Seller Name' />
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                                <View style={styless.logo}>
                                    <Image source={require('../Assets/logo_small.png')} style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
                                </View>
                                <PowerTranslator style={{...texts.HEADING_TEXT,width:wp('60%') }} text={item.user.fullname} />
                                <Image source={require('../Assets/wishlist.png')} style={{ width: 24, height: 24, resizeMode: 'contain', tintColor: 'red' }} />
                            </View>
                        </View>
                        <View style={{ width: '100%', height: hp('10%'), justifyContent: 'center' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                <TouchableOpacity onPress={()=>this.props.navigation.navigate('Chat',{userId:item.user,token:token})}
                                    style={{ width: '45%', backgroundColor: colors.PRIMARY_COLOR, alignItems: 'center', borderRadius: 10 }}>
                                    <PowerTranslator style={{ paddingVertical: '5%', color: colors.TEXT_COLOR }} text={`Chat Now` }/>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{ width: '45%', backgroundColor: colors.TEXT_COLOR, alignItems: 'center', borderRadius: 10 }}>
                                    <PowerTranslator style={{ paddingVertical: '5%', color: '#fff' }} text='Call Now' />
                                </TouchableOpacity>
                            </View>
                        </View>
                        </>
                        )}

                        
                        <View style={{ width: '100%', height: hp('30%'), backgroundColor: '#fff' }}>

                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}
export default ProductDetails

const styless = StyleSheet.create({
    headerStyle: {
        width: '110%',
        // backgroundColor:'#008844',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        // height:60
        // marginTop:50,
        // borderRadius:10
    },
    headerTextStyle: {
        paddingVertical: '5%',
        color: '#fff'
    },
    exploreComponent: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        // paddingTop: '7%'
        // width:'50%'
    },
    cardItem: {
        backgroundColor: '#fff',
        width: '45%',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '2.5%',
    },
    icn_style: { width: 24, height: 25, resizeMode: 'contain', tintColor: colors.ICON_COLOR },
    logo: {
        height: 50,
        width: 50,
        borderRadius: 50 / 2,
        backgroundColor: colors.TEXT_COLOR
    }
})