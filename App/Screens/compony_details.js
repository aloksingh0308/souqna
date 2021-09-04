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

Geocoder.init("AIzaSyC5m-C32piW2yiT3kevVbvLfHXsLsPTWik");
class CompanyDetails extends Component {
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

    componentDidMount() {
        console.log('here====================')
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
            <View style={{  backgroundColor: '#F3F3F3',
            flex: 1,}}><Text>hello</Text></View>
            // <SafeAreaView style={{ flex: 1, }}>

            //     <ScrollView connteContainerStyle={{flex:1}}>
            //         <View style={{ flex: 1, backgroundColor: '#fff', borderTopLeftRadius: 40, borderTopRightRadius: 40, alignItems: 'center' }}>

            //             <View style={{ width: '100%', backgroundColor: '#fff', overflow: 'hidden', borderBottomLeftRadius: 25, borderBottomRightRadius: 25 }}>
            //                 <SliderBox sliderBoxHeight={210} images={this.state.images} autoplay />
            //                 {/* <Image source={require('../Assets/prop.png')} /> */}
            //             </View>
            //             <View style={{ height: 70, width: '95%', borderWidth: 1, borderRadius: 20, justifyContent: 'space-around', flexDirection: 'row', marginVertical: '5%', alignItems: 'center' }}>
            //                 <View style={{ width: '18%' }}>
            //                     <View style={{ width: 50, height: 50, borderRadius: 50 / 2, }}>
            //                         <Image source={require('../Assets/logo_small.png')} style={{ width: '100%', height: '100%', resizeMode: 'stretch' }} />
            //                     </View>
            //                     {/* <Text style={[texts.NORMAL_TEXT, { paddingVertical: '10%', fontSize: 10 }]}>06/08/2021</Text> */}
            //                 </View>
            //                 <View style={{ width: '65%' }}>
            //                     <Text style={texts.SUBHEADING_TEXT}>Shoe Company</Text>
            //                     <Text style={[texts.NORMAL_TEXT, { textAlign: 'justify', fontSize: 10 }]}>
            //                         cursus tincidunt commodo. Nunc justo </Text>
            //                 </View>
            //                 <View style={{ width: '12%', flexDirection: 'row', alignItems: 'center' }}>
            //                     <Image source={require('../Assets/wishlist.png')} style={{ width: 16, height: 16, resizeMode: 'contain', tintColor: 'red' }} />
            //                     <Text style={[texts.NORMAL_TEXT, { textAlign: 'justify', fontSize: 10, paddingHorizontal: '10%' }]}>
            //                         4.5</Text>
            //                 </View>
            //             </View>
            //             <View style={{ width: '95%' }}>
            //                 <Text style={[texts.SUBHEADING_TEXT, { fontSize: 16 }]}>Shoe Company</Text>
            //                 <Text style={[texts.NORMAL_TEXT, { fontSize: 12, textAlign: 'justify' }]}>Lorem ipsum dolor sit amet,
            //                     consectetur adipiscing elit. Curabitur
            //                     cursus tincidunt commodo. Nunc justo </Text>
            //             </View>
            //             <View style={{ width: '95%', marginTop: '5%' }}>
            //                 <Text style={[texts.SUBHEADING_TEXT, { fontSize: 12, paddingVertical: '2%' }]}>Product Details</Text>
            //                 <Text style={texts.NORMAL_TEXT}>1. White Shoe</Text>
            //                 <Text style={texts.NORMAL_TEXT}>2. White Shoe</Text>
            //                 <Text style={texts.NORMAL_TEXT}>3. White Shoe</Text>
            //                 <Text style={texts.NORMAL_TEXT}>4. White Shoe</Text>
            //                 <Text style={texts.NORMAL_TEXT}>5. White Shoe</Text>
            //             </View>
            //             <View style={{ width: '90%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
            //                 <View style={styless.exploreComponent}>
            //                     <LocationIcons />
            //                     <Text style={[texts.SUBHEADING_TEXT, { fontSize: 12, paddingHorizontal: '1%' }]}>Lucknow, U. P.</Text>

            //                 </View>
            //                 <View style={styless.exploreComponent}>
            //                     <LikeIcons />
            //                     <Text style={[texts.SUBHEADING_TEXT, { fontSize: 12, paddingHorizontal: '1%' }]}>Brand New</Text>
            //                 </View>
            //                 <View style={styless.exploreComponent}>
            //                     <LockIcons />
            //                     <Text style={[texts.SUBHEADING_TEXT, { fontSize: 12, paddingHorizontal: '1%' }]}>VIP</Text>
            //                 </View>
            //             </View>
            //             <View style={[styless.exploreComponent, { marginVertical: '5%', width: '60%' }]}>
            //                 <ShareIcons bgcolor={'#fff'} color={colors.TEXT_COLOR} />
            //                 <TouchableOpacity>
            //                     <Text style={[texts.SUBHEADING_TEXT, {
            //                         paddingHorizontal: '5%', borderRadius: 20, color: '#fff',
            //                         paddingVertical: '2%', backgroundColor: colors.PRIMARY_COLOR
            //                     }]}>Make a Offer</Text>
            //                 </TouchableOpacity>
            //                 <CommentIcons bgcolor={'#fff'} color={colors.TEXT_COLOR} />
            //             </View>
            //         </View>

            //     </ScrollView>
            // </SafeAreaView>
        )
    }
}
export default CompanyDetails

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
    icn_style: { width: 24, height: 25, resizeMode: 'contain', tintColor: colors.ICON_COLOR }
})