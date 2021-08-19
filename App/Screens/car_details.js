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
import Geocoder from 'react-native-geocoding';
import { ChatIcons, CommentIcons, LikeIcons, LocationIcons, LockIcons, ShareIcons } from '../Components/menu_icons';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
Geocoder.init("AIzaSyC5m-C32piW2yiT3kevVbvLfHXsLsPTWik");
class CarDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [
                "https://source.unsplash.com/1024x768/?nature",
                "https://source.unsplash.com/1024x768/?water",
                "https://source.unsplash.com/1024x768/?girl",
                "https://source.unsplash.com/1024x768/?tree", // Network image
                // require('./assets/images/girl.jpg'),          // Local image
            ],
            current_city: ''
        };
    }


    renderItem = ({ item }) => (
        <TouchableOpacity
            // onPress={() => this.props.navigation.navigate('ProductList')}
            style={{ width: '100%', height: 150, marginHorizontal: '2.5%', borderRadius: 10, alignItems: 'center', marginVertical: 5, elevation: 5, backgroundColor: '#fff' }}>
            <View style={{ width: '90%' }}>
                <Text>Hello</Text>
            </View>
        </TouchableOpacity>
    )
    render() {
        return (
            <SafeAreaView style={{ flex: 1, }}>
                <ScrollView >
                    <View style={{ backgroundColor: '#fff', borderTopLeftRadius: 40, borderTopRightRadius: 40, alignItems: 'center' }}>

                        <View style={{ width: '100%', backgroundColor: '#fff', overflow: 'hidden', }}>
                            <SliderBox sliderBoxHeight={210} images={this.state.images} autoplay />
                            {/* <Image source={require('../Assets/prop.png')} /> */}
                        </View>
                        <View style={{ width: '95%', height: hp('25%') }}>
                            <Text style={[texts.SUBHEADING_TEXT, { fontSize: 16, paddingTop: '5%' }]}>Shoe Company</Text>
                            <Text style={[texts.HEADING_TEXT, { color: 'green' }]}>Rs. 2500000</Text>
                            <Text style={texts.SUBHEADING_TEXT}>Description </Text>
                            <Text style={[texts.NORMAL_TEXT, { fontSize: 12, textAlign: 'justify', paddingBottom: '5%' }]}>Lorem ipsum dolor sit amet,
                                consectetur adipiscing elit. Curabitur
                                cursus tincidunt commodo. Nunc justo </Text>
                        </View>
                        <Text style={[texts.SUBHEADING_TEXT, { width: '95%' }]}>Address </Text>
                        <View style={{ width: '95%', height: '15%', backgroundColor: colors.GREY_COLOR, borderRadius: 10, overflow: 'hidden' }}>
                            <MapView
                                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                                style={{ flex: 1 }}
                                region={{
                                    latitude: 37.78825,
                                    longitude: -122.4324,
                                    latitudeDelta: 0.015,
                                    longitudeDelta: 0.0121,
                                }}
                            >
                            </MapView>
                        </View>
                        <View style={{ width: '90%', marginTop: '5%', }}>
                            {/* <Text style={[texts.SUBHEADING_TEXT, { fontSize: 12, paddingVertical: '2%' }]}>Product Details</Text> */}
                            <View style={{ width: '80%', flexDirection: 'row', justifyContent: 'space-around' }}>
                                <Text style={[texts.SUBHEADING_TEXT, { width: '50%', textAlign: 'left' }]}>Brand </Text>
                                <Text style={[texts.NORMAL_TEXT, { width: '50%', textAlign: 'left' }]}>Cadillac </Text>
                            </View>
                            <View style={{ width: '80%', flexDirection: 'row', justifyContent: 'space-around' }}>
                                <Text style={[texts.SUBHEADING_TEXT, { width: '50%', textAlign: 'left' }]}>Year </Text>
                                <Text style={[texts.NORMAL_TEXT, { width: '50%', textAlign: 'left' }]}>2017 </Text>
                            </View>
                            <View style={{ width: '80%', flexDirection: 'row', justifyContent: 'space-around' }}>
                                <Text style={[texts.SUBHEADING_TEXT, { width: '50%', textAlign: 'left' }]}>Fuel </Text>
                                <Text style={[texts.NORMAL_TEXT, { width: '50%', textAlign: 'left' }]}>Petrol </Text>
                            </View>
                            <View style={{ width: '80%', flexDirection: 'row', justifyContent: 'space-around' }}>
                                <Text style={[texts.SUBHEADING_TEXT, { width: '50%', textAlign: 'left' }]}>Transmission  </Text>
                                <Text style={[texts.NORMAL_TEXT, { width: '50%', textAlign: 'left' }]}>Mannual </Text>
                            </View>
                            <View style={{ width: '80%', flexDirection: 'row', justifyContent: 'space-around' }}>
                                <Text style={[texts.SUBHEADING_TEXT, { width: '50%', textAlign: 'left' }]}>No. Of Owners  </Text>
                                <Text style={[texts.NORMAL_TEXT, { width: '50%', textAlign: 'left' }]}>Third </Text>
                            </View>
                            <View style={{ width: '80%', flexDirection: 'row', justifyContent: 'space-around' }}>
                                <Text style={[texts.SUBHEADING_TEXT, { width: '50%', textAlign: 'left' }]}>Km Driven  </Text>
                                <Text style={[texts.NORMAL_TEXT, { width: '50%', textAlign: 'left' }]}>10236 KM </Text>
                            </View>
                        </View>
                        <View style={{ width: '90%', height: hp('15%'), marginTop: '5%' }}>
                            <Text style={texts.SUBHEADING_TEXT}>Seller Name </Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                                <View style={styless.logo}>
                                    <Image source={require('../Assets/logo_small.png')} style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
                                </View>
                                <Text style={[texts.HEADING_TEXT, { width: '65%' }]}>Alok</Text>
                                <Image source={require('../Assets/wishlist.png')} style={{ width: 24, height: 24, resizeMode: 'contain', tintColor: 'red' }} />
                            </View>
                        </View>
                        <View style={{ width: '100%', height: hp('10%'),justifyContent:'center' }}>
                            <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
                                <TouchableOpacity 
                                    style={{ width: '45%', backgroundColor: colors.PRIMARY_COLOR, alignItems: 'center', borderRadius: 10 }}>
                                    <Text style={{ paddingVertical: '5%', color:colors.TEXT_COLOR }}>ChatNow</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    style={{ width: '45%', backgroundColor: colors.TEXT_COLOR, alignItems: 'center', borderRadius: 10 }}>
                                    <Text style={{ paddingVertical: '5%', color: '#fff' }}>Call Now</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ width: '100%', height: hp('25%'), backgroundColor: '#fff' }}>

                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}
export default CarDetails

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