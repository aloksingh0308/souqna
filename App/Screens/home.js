import React, { Component } from 'react'
import { SafeAreaView, Text, StyleSheet, View, Image, TouchableOpacity, ScrollView, PermissionsAndroid, TextInput } from 'react-native'
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
import { SearchIcons } from '../Components/menu_icons';
import { getApi } from '../Components/functions';
import { banners, categories_api } from '../Components/api_link';
import AsyncStorage from '@react-native-community/async-storage';
Geocoder.init("AIzaSyC5m-C32piW2yiT3kevVbvLfHXsLsPTWik");
import { decode, encode } from 'base-64'

if (!global.btoa) { global.btoa = encode }

if (!global.atob) { global.atob = decode }

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [
                "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
                "https://source.unsplash.com/1024x768/?water",
                "https://source.unsplash.com/1024x768/?girl",
                "https://i.pinimg.com/originals/24/0b/b0/240bb075697234b28bcbca3c7b2cbb97.jpg", // Network image
                // require('./assets/images/girl.jpg'),          // Local image
            ],
            newimages: [],
            current_city: ''
        };
    }

    async componentDidMount() {
        try {
            const token = await AsyncStorage.getItem('token');
            if (token !== null) {
                fetch(banners, {
                    method: 'get',
                    headers: new Headers({
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }),
                }).then((response) => response.json()).then(async (data) => {
                    console.log('success===============', data)
                    this.setState({ newimages: data.results })
                })
                fetch(categories_api, {
                    method: 'get',
                    headers: new Headers({
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }),
                }).then((response) => response.json()).then(async (data) => {
                    console.log('success===============', data)
                    // this.setState({ newimages: data.results })
                })
            }

        } catch (error) {
            console.log(error);
            // Error retrieving data
        }

        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    'title': 'Example App',
                    'message': 'Example App access to your location '
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the location")
                Geolocation.getCurrentPosition(
                    (position) => {
                        console.log(position.coords.latitude);
                        Geocoder.from(position.coords.latitude, position.coords.longitude)
                            .then(json => {
                                var addressComponent = json.results[0].address_components[4];
                                console.log(addressComponent);
                                this.setState({ current_city: json.results[0].address_components[4].long_name })
                            })
                            .catch(error => console.warn(error));
                    },
                    (error) => {
                        // See error code charts below.
                        console.log(error.code, error.message);
                    },
                    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
                );
                //   alert("You can use the location");
            } else {
                console.log("location permission denied")
                alert("Location permission denied");
            }
        } catch (err) {
            console.warn(err)
        }

    }

    renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => this.props.navigation.navigate('ProductList')}
            style={{ width: '40%', height: 130, marginHorizontal: '5%', justifyContent: 'center', alignItems: 'center', marginVertical: 10, }}>
            <View style={{width:140,height:130,justifyContent:'center',alignItems:'center',backgroundColor:'#fff', elevation: 5, borderRadius: 15, overflow: 'hidden'}}>
                <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', }}>
                    {item.icon}

                </View>
                <View style={{ width: '100%', height: '100%', justifyContent: 'flex-end', alignItems: 'center', position: 'absolute', paddingBottom: 10 }}>
                    <Text style={[texts.SUBHEADING_TEXT]}>{item.name}</Text>

                </View>
            </View>

        </TouchableOpacity>
    )
    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: colors.PRIMARY_COLOR }}>
                <Header style={{ backgroundColor: colors.PRIMARY_COLOR, elevation: 0 }}>
                    <View style={styless.headerStyle}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: '100%', height: '100%' }}>
                            <View style={{ width: '20%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                                    <Image source={require('../Assets/menu.png')} style={styless.icn_style} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: '60%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={texts.HEADING_TEXT}>SOUQNA</Text>
                            </View>
                            <View style={{ width: '20%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity
                                    // onPress={() => this.props.navigation.navigate('Notifications')}
                                    onPress={() => { this.props.navigation.navigate('CarDetails') }}
                                >
                                    <Image source={require('../Assets/bell.png')} style={styless.icn_style} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Header>

                <View style={{ flex: 1, backgroundColor: '#fff', borderTopLeftRadius: 35, borderTopRightRadius: 35, alignItems: 'center', overflow: 'hidden' }}>
                    <ScrollView contentContainerStyle={{ alignItems: 'center' }} >
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: '90%', }}>
                            <View style={styless.exploreComponent}>
                                <Text style={[texts.HEADING_TEXT]} >Explore</Text>
                                <Text style={[texts.NORMAL_TEXT, { opacity: 0.6, fontSize: 18 }]}> Products</Text>
                            </View>
                            <View style={styless.exploreComponent}>
                                <Text style={{ fontSize: 12, paddingHorizontal: '2%', color: colors.TEXT_COLOR }}>{this.state.current_city}</Text>
                                <Image source={require('../Assets/pin.png')} style={{ width: 16, height: 16, resizeMode: 'contain', tintColor: colors.TEXT_COLOR }} />
                            </View>
                        </View>
                        <View style={{ width: '95%', backgroundColor: colors.GREY_COLOR, borderRadius: 25, marginVertical: '3%', overflow: 'hidden', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                            <TextInput
                                placeholder='Find Cars, Mobile phones and more'
                                style={{ width: '85%', backgroundColor: colors.GREY_COLOR, paddingVertical: '2.5%', paddingHorizontal: '5%' }}
                            />
                            <View style={{ width: '10%', alignItems: 'center', justifyContent: 'center' }}>
                                <SearchIcons />
                            </View>

                        </View>
                        <View style={{ width: '95%', backgroundColor: '#fff', overflow: 'hidden', borderRadius: 10 }}>
                            <SliderBox images={this.state.newimages.map((item) => item.image)} autoplay ImageComponentStyle={{ width: '100%', }} />
                        </View>
                        <View style={{ width: '95%', backgroundColor: '#fff', overflow: 'hidden', marginVertical: '0%', borderRadius: 10, }}>
                            <View style={{ paddingVertical: '5%' }}>
                                <Text style={{ fontSize: 14, paddingHorizontal: '5%', color: colors.TEXT_COLOR, opacity: 0.7 }}>Browse By</Text>
                                <Text style={[texts.SUBHEADING_TEXT, { paddingHorizontal: '5%' }]}>Categories</Text>
                            </View>
                            <FlatList
                                data={categoryData}
                                renderItem={this.renderItem}
                                keyExtractor={(item) => item.id}
                                numColumns={2}
                            />
                        </View>
                    </ScrollView>
                </View>

            </SafeAreaView>
        )
    }
}
export default Home

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
        paddingTop: '7%'
        // width:'50%'
    },
    cardItem: {
        backgroundColor: '#fff',
        width: '45%',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '2.5%',
    },
    icn_style: { width: 24, height: 25, resizeMode: 'contain', tintColor: colors.TEXT_COLOR }
})