import React, { Component } from 'react'
import { SafeAreaView, Text, StyleSheet, View, Image, TouchableOpacity, ScrollView, PermissionsAndroid, StatusBar, TextInput } from 'react-native'
import { Header } from 'native-base'
import { SliderBox } from "react-native-image-slider-box";
import { colors } from '../Components/colors'
import { Card } from '../Components/card'
import { FlatList } from 'react-native-gesture-handler';
const img = require('../Assets/home.png')
import { categoryData } from '../Components/categoryData';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import { texts } from '../Components/textfile';
Geocoder.init("AIzaSyC5m-C32piW2yiT3kevVbvLfHXsLsPTWik");
import { SearchIcons } from '../Components/menu_icons';
import AsyncStorage from '@react-native-community/async-storage';
class ProductList extends Component {
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
            current_city: '',
            adsList: [],
            filterList:[]
        };
    }


    addtoFav = async (id) => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (token !== null) {

                fetch(`http://3.23.128.206/api/v1/ads/${id}/add-to-favourite/`, {
                    method: 'get',
                    headers: new Headers({
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }),
                }).then((response) => response.json()).then(async (data) => {
                    console.log('success===============', data)
                    // this.setState({ myAds: data.results })
                })
            }

        } catch (error) {
            console.log(error);
            // Error retrieving data
        }
    }

    onSearch=(text)=>{
        let filteredData = this.state.adsList.filter(function (item) {
            return item.title.includes(text.toLowerCase());
        })
        this.setState({ filterList: filteredData });
    }


    async componentDidMount() {

        try {
            const token = await AsyncStorage.getItem('token');
            if (token !== null) {

                fetch('http://3.23.128.206/api/v1/ads/?search=&category&region=lucknow', {
                    method: 'get',
                    headers: new Headers({
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }),
                }).then((response) => response.json()).then(async (data) => {
                    console.log( data.results[4].images)
                    this.setState({ adsList: data.results ,filterList:data.results})
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

    listHeader = () => (
        <TouchableOpacity style={{ padding: 5, paddingHorizontal: 15, backgroundColor: colors.GREY_COLOR, margin: 5, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={texts.SUBHEADING_TEXT}>All</Text>
        </TouchableOpacity>
    )

    renderCategories = ({ item }) => (
        <TouchableOpacity style={{ padding: 5, paddingHorizontal: 15, backgroundColor: colors.GREY_COLOR, margin: 5, borderRadius: 20, justifyContent: 'center', alignItems: 'center', }}>
            <Text style={texts.SUBHEADING_TEXT}>{item.name}</Text>
        </TouchableOpacity>
    )

    renderItem = ({ item,index }) => (
        <TouchableOpacity
            onPress={() => this.props.navigation.navigate('ProductDetails',{item:this.state.adsList[index]})}
            style={{
                width: '48%', height: 210, marginHorizontal: '1.5%', borderRadius: 10,
                elevation: 5, alignItems: 'center', marginVertical: 5, overflow: 'hidden', justifyContent: 'space-between'
            }}>
            <View style={{ width: '100%', height: '55%', backgroundColor: '#fff', borderRadius: 0, overflow: 'hidden' }}>
                <Image source={require('../Assets/prop.png')} style={{ width: '100%', height: '100%', resizeMode: 'stretch' }} />
            </View>
            <View style={{ width: '100%', height: '45%', backgroundColor: '#fff', overflow: 'hidden' }}>
                <View>
                    <Text numberOfLines={2} style={[texts.SUBHEADING_TEXT, { fontSize: 14, paddingHorizontal: '2%', paddingTop: '1%' }]}>{item.title}</Text>
                    <Text style={[texts.SUBHEADING_TEXT, { paddingHorizontal: '5%', color: '#068f31' }]}>Rs. {item.price}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                    <Text numberOfLines={2} style={[texts.NORMAL_TEXT, { width: '80%', fontSize: 10, paddingHorizontal: 5 }]}>{item.description}</Text>
                    <TouchableOpacity onPress={() => this.addtoFav(item.id)} >
                        <Image source={require('../Assets/wishlist.png')} style={{ width: 24, height: 24, resizeMode: 'contain', tintColor: 'red' }} />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    )
    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor:colors.PRIMARY_COLOR }}>

                <Header style={{ backgroundColor: colors.PRIMARY_COLOR, elevation: 0 }}>
                    <View style={styless.headerStyle}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: '100%', height: '100%' }}>
                            <View style={{ width: '20%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                                    <Image source={require('../Assets/arrow.png')} style={styless.icn_style} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: '60%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={texts.HEADING_TEXT}>SOUQNA</Text>
                            </View>
                            <View style={{ width: '20%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity
                                    // onPress={() => this.props.navigation.navigate('Notifications')}
                                    onPress={() => { this.props.navigation.navigate('Notifications') }}
                                >
                                    <Image source={require('../Assets/bell.png')} style={styless.icn_style} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Header>
                <StatusBar backgroundColor={colors.TEXT_COLOR} />
                <View style={{ flex: 1, backgroundColor: '#fff', borderTopLeftRadius: 40, borderTopRightRadius: 40, alignItems: 'center', overflow: 'hidden' }}>
                    <ScrollView>
                        <View style={{ width: '100%', height: 60, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                            <View style={styless.exploreComponent}>
                                <Text style={{ fontSize: 12, paddingHorizontal: '2%', color: colors.TEXT_COLOR }}>{this.state.current_city}</Text>
                                <Image source={require('../Assets/pin.png')} style={{ width: 16, height: 16, resizeMode: 'contain', tintColor: colors.TEXT_COLOR }} />
                            </View>
                            <View style={{ width: '70%', backgroundColor: colors.GREY_COLOR, borderRadius: 25, marginVertical: '3%', overflow: 'hidden', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginRight: 10 }}>
                                <TextInput
                                    placeholder='Find Cars, Mobile phones and more'
                                    style={{ width: '85%', paddingVertical: '2.5%', paddingHorizontal: '5%' }}
                                    onChangeText={(text)=>this.onSearch(text)}
                                />
                                <View style={{ width: '10%', alignItems: 'center', justifyContent: 'center' }}>
                                    <SearchIcons />
                                </View>

                            </View>
                        </View>
                        <FlatList
                            horizontal
                            contentContainerStyle={{ marginVertical: '5%', marginTop: '2%' }}
                            showsHorizontalScrollIndicator={false}
                            data={categoryData}
                            ListHeaderComponent={this.listHeader}
                            renderItem={this.renderCategories}
                            keyExtractor={(item) => item.id}

                        />
                        <View style={{ width: '95%', backgroundColor: '#fff', overflow: 'hidden', marginVertical: '0%', borderRadius: 10, }}>
                            <FlatList

                                data={this.state.filterList}
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
export default ProductList

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
        // paddingTop: '10%'
        // width:'50%'
    },
    cardItem: {
        backgroundColor: '#fff',
        width: '45%',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '2.5%',
        // paddingVertical:'5%',
        // elevation:5,
        // borderRadius:15

        // alignSelf:'center'
    },
    icn_style: { width: 24, height: 25, resizeMode: 'contain', tintColor: colors.TEXT_COLOR }
})