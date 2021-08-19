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
Geocoder.init("AIzaSyC5m-C32piW2yiT3kevVbvLfHXsLsPTWik");
class Category extends Component {


    renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => this.props.navigation.navigate('ProductList')}
            style={{ width: '40%', height: 110, marginHorizontal: '5%', justifyContent: 'center', borderRadius: 10, alignItems: 'center', marginVertical: 5, elevation: 5, backgroundColor: '#fff' }}>
            {item.icon}
            <Text style={[texts.SUBHEADING_TEXT,{paddingVertical:'5%'}]}>{item.name}</Text>
        </TouchableOpacity>
    )
    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor:'#fff' }}>
                <Header style={{ backgroundColor:'#fff', elevation: 0 }}>
                    <View style={styless.headerStyle}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: '100%', height: '100%' }}>
                            <View style={{ width: '20%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                                    <Image source={require('../Assets/arrow.png')} style={styless.icn_style} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: '60%', height: '100%',justifyContent:'center' }}>
                                <Text style={texts.HEADING_TEXT}>Please Select Category</Text>
                            </View>
                            <View style={{ width: '20%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                {/* <TouchableOpacity
                                    // onPress={() => this.props.navigation.navigate('Notifications')}
                                    onPress={() => { this.props.navigation.navigate('Company_Details') }}
                                >
                                    <Image source={require('../Assets/bell.png')} style={styless.icn_style} />
                                </TouchableOpacity> */}
                            </View>
                        </View>
                    </View>
                </Header>
                <ScrollView>
                    <View style={{ flex: 1, backgroundColor: '#fff', alignItems: 'center' }}>
                      
                        <View style={{ width: '95%', backgroundColor: '#fff', overflow: 'hidden', marginVertical: '0%', borderRadius: 10, }}>
                           
                            <FlatList
                                data={categoryData}
                                renderItem={this.renderItem}
                                keyExtractor={(item) => item.id}
                                numColumns={2}
                            />
                        </View>

                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}
export default Category

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