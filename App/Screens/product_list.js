import React, { Component } from 'react'
import { SafeAreaView, Text, StyleSheet, View, Image,ActivityIndicator ,TouchableOpacity, ScrollView, PermissionsAndroid, StatusBar, TextInput } from 'react-native'
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
import { showToast } from '../Components/toast_function';
import { NotificationIcons } from '../Components/menu_icons';
import { PowerTranslator, ProviderTypes, TranslatorConfiguration, TranslatorFactory } from 'react-native-power-translator';
import { categories_api } from '../Components/api_link';

// TranslatorConfiguration.setConfig(ProviderTypes.Google, 'AIzaSyBY54m5k1-VQeAl3nw95pX79fnHp8_CqLg','ar','en');

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
            filterList:[],
            tmpId:null,
            featured_image:'',
            isLoading:false,
            isLiked:false,
            category_Data:[],
            search:''
            
        };
    }

    onCategoryChange=async(cat_id)=>{
        try {
            const token = await AsyncStorage.getItem('token');
            if (token !== null) {

                fetch(`http://3.23.128.206/api/v1/ads/?search=&category=${cat_id==null?'':cat_id}&region=lucknow`, {
                    method: 'get',
                    headers: new Headers({
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }),
                }).then((response) => response.json()).then(async (data) => {
                    console.log( data.results)
                    this.setState({ adsList: data.results ,filterList:data.results})
                })
            }

        } catch (error) {
            console.log(error);
            // Error retrieving data
        }
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
                    showToast('Added Successfully')
                    this.setState({isLiked:true})
                    // this.setState({ myAds: data.results })
                })
            }

        } catch (error) {
            console.log(error);
            // Error retrieving data
        }
    }

    onSearch=async(text)=>{
        try {
            const token = await AsyncStorage.getItem('token');
            if (token !== null) {

                fetch(categories_api, {
                    method: 'get',
                    headers: new Headers({
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }),
                }).then((response) => response.json()).then(async (data) => {
                    console.log('success===============', data)
                    this.setState({ category_Data: data.results })
                })

                fetch(`http://3.23.128.206/api/v1/ads/?search=${text}&category=${this.state.tmpId}&region=lucknow`, {
                    method: 'get',
                    headers: new Headers({
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }),
                }).then((response) => response.json()).then(async (data) => {
                    // console.log( data.results)
                    this.setState({ adsList: data.results ,filterList:data.results})
                })
            }

        } catch (error) {
            console.log(error);
            // Error retrieving data
        }
        // let filteredData = this.state.adsList.filter((item)=> {
        //     return item.title.includes(text);
        // // })
        // let filteredData = this.state.adsList.filter(function (item) {
        //     return item.title.includes(text);
        //   });
        // console.log(filteredData)
        // this.setState({ filterList: filteredData });
    }


    async componentDidMount() {
        // console.log(this.props.route.params.cat_id)
        this.setState({isLoading:true,tmpId:this.props.route.params.cat_id})
        // componentDidMount(){
            // 'Find Cars, Mobile phones and more'
            try {
                const lng = await AsyncStorage.getItem('lng');
                TranslatorConfiguration.setConfig(ProviderTypes.Google, 'AIzaSyBY54m5k1-VQeAl3nw95pX79fnHp8_CqLg',lng,'en');
                const translator = TranslatorFactory.createTranslator();
                translator.translate('Find Cars, Mobile phones and more').then(translated => {
                    //Do something with the translated text
                    this.setState({placeholdertxt:translated})
                });
                setTimeout(()=>{
                    this.setState({isLoading:false})
                },2500)
            } catch (error) {
                console.log(error);
                // Error retrieving data
            }
            
            
        // }

        try {
            const token = await AsyncStorage.getItem('token');
            if (token !== null) {

                fetch(categories_api, {
                    method: 'get',
                    headers: new Headers({
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }),
                }).then((response) => response.json()).then(async (data) => {
                    console.log('success===============', data)
                    this.setState({ category_Data: data.results })
                })

                fetch(`http://3.23.128.206/api/v1/ads/?search=&category=${this.props.route.params.cat_id}&region=lucknow`, {
                    method: 'get',
                    headers: new Headers({
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }),
                }).then((response) => response.json()).then(async (data) => {
                    // console.log( data.results)
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
        <TouchableOpacity
        onPress={()=>{this.setState({tmpId:null}),this.onCategoryChange(null)}}
        style={{ padding: 5, paddingHorizontal: 15, backgroundColor:this.state.tmpId==null?colors.TEXT_COLOR:colors.GREY_COLOR, margin: 5, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
            <PowerTranslator style={{...texts.SUBHEADING_TEXT,color:this.state.tmpId==null?'#fff':colors.TEXT_COLOR}} text='All' />        
            </TouchableOpacity>
    )

    renderCategories = ({ item }) => (
        <TouchableOpacity onPress={()=>{this.setState({tmpId:item.id}),this.onCategoryChange(item.id)}}
        style={{ padding: 5, paddingHorizontal: 15, backgroundColor:this.state.tmpId==null?colors.GREY_COLOR:this.state.tmpId==item.id ?colors.TEXT_COLOR:colors.GREY_COLOR, margin: 5, borderRadius: 20, justifyContent: 'center', alignItems: 'center', }}>
            <PowerTranslator style={{...texts.SUBHEADING_TEXT,color:this.state.tmpId==null?colors.TEXT_COLOR:this.state.tmpId==item.id ?'#fff':colors.TEXT_COLOR}} text={item.name} />
        </TouchableOpacity>
    )

    renderItem = ({ item,index }) => (
       
        <TouchableOpacity
            onPress={() => this.props.navigation.navigate('ProductDetails',{item:this.state.adsList[index]})}
            style={{width: '45%', height: 210, marginLeft:'2.5%', borderRadius: 10,alignSelf:'center',
                elevation: 1, alignItems: 'center', marginVertical: 5, overflow: 'hidden',
            }}>
            <View style={{ width: '100%', height: '55%', borderRadius: 0,backgroundColor:'#ccc' }}>
                {item.images.length>0?(
                    <Image 
                    source={{uri:item.images[0].file}}
                    // source={require('../Assets/prop.png')} 
                    style={{ width: '100%', height: '100%', resizeMode: 'cover' }} /> 

                ):(
                   <View style={{width:'100%',height:'100%',justifyContent:'center',alignItems:'center'}}>
                    <PowerTranslator numberOfLines={2} style={{...texts.SUBHEADING_TEXT, fontSize: 14, paddingHorizontal: '3%', paddingTop: '1%' }} text={'No Image'} />
                   </View>
                )}
                {/* <Image 
                source={{uri:item.images[0].file}}
                // source={require('../Assets/prop.png')} 
                style={{ width: '100%', height: '100%', resizeMode: 'contain' }} /> */}
            </View>
            <View style={{ width: '100%', height: '45%', backgroundColor: '#fff', overflow: 'hidden' }}>
                <View>
                    <PowerTranslator numberOfLines={2} style={{...texts.SUBHEADING_TEXT, fontSize: 14, paddingHorizontal: '3%', paddingTop: '1%' }} text={`${item.title.slice(0,20)}...`} />
                    <PowerTranslator style={{...texts.SUBHEADING_TEXT, paddingHorizontal: '3%', color: '#068f31' }} text={`£SD. ${item.price}`}  />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'flex-end',width:'95%',justifyContent:'space-between',alignSelf:'center' }}>
                    <View style={{width:'80%'}}>
                    <PowerTranslator style={{...texts.NORMAL_TEXT,paddingHorizontal: '3%'}} text={`${item.description.slice(0,30)}...`}  />
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => this.addtoFav(item.id)} >
                        <Image source={require('../Assets/wishlist.png')} style={{ width: 20, height: 20, resizeMode: 'contain', tintColor:this.state.isLiked?'red':'#777' }} />
                    </TouchableOpacity> 
                    </View>
              
                </View>
            </View>
        </TouchableOpacity>
    )
    render() {
        const {isLoading,current_city} = this.state
        return (
           <>
           {isLoading?(
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <ActivityIndicator size='large' color={colors.TEXT_COLOR} />
            </View>
           ):(
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
                                    <NotificationIcons bgcolor={colors.PRIMARY_COLOR} color={colors.TEXT_COLOR} />
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
                                {/* <Text style={{ fontSize: 12, paddingHorizontal: '2%', color: colors.TEXT_COLOR }}>{this.state.current_city}</Text> */}
                                <PowerTranslator numberOfLines={2} style={{...texts.NORMAL_TEXT, fontSize: 12}} text={current_city.slice(0, 12)} />
                                <Image source={require('../Assets/pin.png')} style={{ width: 16, height: 16, resizeMode: 'contain', tintColor: colors.TEXT_COLOR }} />
                            </View>
                            <View style={{ width: '70%', backgroundColor: colors.GREY_COLOR, borderRadius: 25, marginVertical: '3%', overflow: 'hidden', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginRight: 10 }}>
                                <TextInput
                                    placeholder={this.state.placeholdertxt}
                                    style={{ width: '95%', paddingVertical: '2.5%', paddingHorizontal: '2.5%' }}
                                    onChangeText={(text)=>this.setState({search:text})}
                                    onSubmitEditing={()=>this.onSearch(this.state.search)}
                                />
                                <View style={{ width: '10%', alignItems: 'center', justifyContent: 'center' }}>
                                    <SearchIcons />
                                </View>

                            </View>
                        </View>
                        <FlatList
                            horizontal
                            contentContainerStyle={{ marginVertical: '5%', marginTop: '2%', }}
                            showsHorizontalScrollIndicator={false}
                            data={this.state.category_Data}
                            ListHeaderComponent={this.listHeader}
                            renderItem={this.renderCategories}
                            keyExtractor={(item) => item.id}

                        />
                        <View style={{ width: '100%', backgroundColor: '#fff', overflow: 'hidden', marginVertical: '0%', borderRadius: 10, }}>
                            <FlatList

                                data={this.state.filterList}
                                renderItem={this.renderItem}
                                keyExtractor={(item) => item.id}
                                numColumns={2}
                                showsVerticalScrollIndicator={false}
                            />
                        </View>
                    </ScrollView>
                </View>

            </SafeAreaView>
           )}
           </>
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
    },
    icn_style: { width: 24, height: 25, resizeMode: 'contain', tintColor: colors.TEXT_COLOR }
})