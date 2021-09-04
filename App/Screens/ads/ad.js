import React, { Component } from 'react'
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, FlatList, Image, TouchableHighlight,PermissionsAndroid ,ActivityIndicator} from 'react-native'
import { InputBox } from '../../Components/input'
import { texts } from '../../Components/textfile'
import ModalDropdown from 'react-native-modal-dropdown';
import { ScrollView } from 'react-native-gesture-handler';
import { colors } from '../../Components/colors';
// import * as ImagePicker from "react-native-image-picker"
import { categoryData } from '../../Components/categoryData';
import { postApi,generate_UUID, postApiwithToken, languageTranslator } from '../../Components/functions';
import { create_ads } from '../../Components/api_link';
import AsyncStorage from '@react-native-community/async-storage';
import Geocoder from 'react-native-geocoding';
Geocoder.init("AIzaSyC5m-C32piW2yiT3kevVbvLfHXsLsPTWik")
import ImagePicker from "react-native-customized-image-picker";
import Geolocation from 'react-native-geolocation-service';
import MapView, { PROVIDER_GOOGLE,Marker } from 'react-native-maps';
import { PowerTranslator, ProviderTypes, TranslatorConfiguration, TranslatorFactory } from 'react-native-power-translator';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import { Image } from 'native-base';
const translator = TranslatorFactory.createTranslator();
class Ads extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      price: '',
      category: '',
      description: '',
      address: '',
      images: [],
      image:'',
      isLoading:false,
     lat:26.45678,
     long:80.34567
    }
  }


  postAd = async (uri) => {
    this.setState({isLoading:true})
    const { title,price,category,description,address,images,userLocation,lat,long} = this.state

    let data = new FormData()
    data.append('title',title)
    data.append('description', description)
    // data.append('type', 'Others')
    data.append('extra', `{}`)
    data.append('region', 'Lucknow')
    data.append('category',this.props.route.params.cat_id)
    data.append('location', `{ "lat":${lat}, "lon":${long}}`)
    data.append('price', price)
    data.append('address',address)
    this.state.images.map((item)=>{
      let photo = {
        name: generate_UUID() +  '.png',
        type: "image/png",
        uri: item.path,
    };
      data.append("images", photo)
    })
    // console.log(data)
    try {
      const token = await AsyncStorage.getItem('token');
      if (token !== null) {
        postApiwithToken(create_ads, data, token).then((res) => {
          console.log(res,this.props.route.params.cat_id)
          this.props.navigation.replace('Sucess',{cat_id:this.props.route.params.cat_id})
          this.setState({isLoading:false})
        })
      }

    } catch (error) {
      console.log(error);
    }
  }



  addImage = () => {
    ImagePicker.openPicker({
      multiple: true
    }).then(images => {
      console.log(images);
      this.setState({images:images})
    });
  }

  

  async componentDidMount(){
    console.log(this.props.route.params.cat_id)
    // componentDidMount(){
      try {
          const lng = await AsyncStorage.getItem('lng');
          TranslatorConfiguration.setConfig(ProviderTypes.Google, 'AIzaSyBY54m5k1-VQeAl3nw95pX79fnHp8_CqLg',lng,'en');
      } catch (error) {
          console.log(error);
          // Error retrieving data
      }
  // }

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
                  this.setState({lat:position.coords.latitude,long:position.coords.longitude})
                  Geocoder.from(position.coords.latitude, position.coords.longitude)
                      .then(json => {
                          var addressComponent = json.results[0].formatted_address;
                          // console.log(addressComponent);
                          this.setState({ address:addressComponent})
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
    <TouchableOpacity onPress={() => this.addImage()}>
      <View style={{ width: 80, height: 80, marginHorizontal: 5, overflow: 'hidden', borderRadius: 15, justifyContent: 'center', backgroundColor:colors.GREY_COLOR,alignItems:'center' }}>
        <Image source={require('../../Assets/plus.png')} style={{ width: 32, height: 32, resizeMode: 'contain', tintColor: '#999' }} />
      </View>
    </TouchableOpacity>
  )
  renderImages = ({ item }) => (
    <View style={{ width: 120, height: 100, marginHorizontal: 5, overflow: 'hidden', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
      <Image source={{ uri: item.path }} style={{ width: '100%', height: '95%', resizeMode: 'cover' }} />
    </View>
  )
  render() {
    console.log(this.state.title)
    return (
      <ScrollView >
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', }}>
          <View style={{ width: '100%', alignItems: 'center' }}>
            <PowerTranslator style={{...texts.SUBHEADING_TEXT, paddingHorizontal: '1%', paddingVertical: '5%', width: wp('95%') }}  text='Create New Product ad' />
            <View style={{ width: '100%', height: 100, backgroundColor: '#fff', marginBottom: '5%', justifyContent: 'center', }}>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={this.state.images}
                renderItem={this.renderImages}
                ListHeaderComponent={this.listHeader}
                // ListHeaderComponentStyle={{ justifyContent: 'center' }}
                keyExtractor={(item, index) => index}
              />

            </View>
            <InputBox
              title='Title *'
              placeHolder='Enter Product Name'
              // onChangeText={(text)=>}
              onChangeText={(text) => this.setState({ title:text})}
              styles={{ width: '100%', alignItems: 'center' }}
            />
            <InputBox
              title='Price *'
              placeHolder='Enter Product Price'
              onChangeText={(text) => this.setState({ price: text })}
              styles={{ width: '100%', alignItems: 'center', marginTop: '3%' }}
            />
            {/* <View style={{ width: '95%', marginTop: '3%' }}>
              <PowerTranslator style={{...texts.NORMAL_TEXT, paddingHorizontal: '2%', width: '95%' }} text='Category' />
              <ModalDropdown
                style={{ width: '100%', height: 50, justifyContent: 'center', borderRadius: 10, borderWidth: 1, borderColor: '#bbb' }}
                dropdownStyle={{
                  width: "70%",
                  // marginTop: -25,
                  // height:'100%',
                  paddingVertical: 10,
                  borderRadius: 10,
                  backgroundColor: "white",
                  ...styles.dowpdown_shadow
                }}
                onSelect={(item)=>this.setState({category:categoryData[item].id})}
                defaultValue='Select Category'
                textStyle={{ paddingHorizontal: '5%', color: colors.TEXT_COLOR }}
                renderSeparator={() => <View />}
                dropdownTextHighlightStyle={{
                  fontSize: 12,
                  backgroundColor: "#FFE1E5",
                  fontWeight: "500",
                  color: "#353B50",
                  paddingHorizontal: 16
                }}
                dropdownTextStyle={{
                  fontSize: 12,
                  color: colors.TEXT_COLOR,
                  paddingHorizontal: 16
                }}
                options={categoryData.map((item) => item.name)} >
              </ModalDropdown>
            </View> */}
            <InputBox
              multiline={true}
              textBoxStyle={{ height: 100 }}
              title='Description'
              placeHolder='Description'
              onChangeText={(text) => this.setState({ description: text })}
              styles={{ width: '100%', alignItems: 'center', marginTop: '3%' }}
            />
            <PowerTranslator style={{...texts.SUBHEADING_TEXT, fontSize: 14, paddingVertical: '2%' ,width:wp('95%')}} text='Address' />
                        <View style={{ width: '95%', height: 200, backgroundColor: colors.GREY_COLOR, borderRadius: 10, overflow: 'hidden' }}>
                            <MapView
                                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                                style={{ flex: 1 }}
                                region={{
                                    latitude: this.state.lat,
                                    longitude: this.state.long,
                                    latitudeDelta: 0.015,
                                    longitudeDelta: 0.0121,
                                }}
                            >
                                <Marker
                                    coordinate={{ latitude:this.state.lat, longitude: this.state.long }}
                                    // onDragEnd
                                    // image={require('../assets/pin.png')}
                                />

                            </MapView>
                        </View>
            <TouchableOpacity disabled={this.state.isLoading} onPress={() => this.postAd()}
              style={{ width: '60%', backgroundColor: colors.TEXT_COLOR, alignItems: 'center', borderRadius: 20, marginVertical: '5%', marginTop: '10%',paddingVertical:5 }}>
           {this.state.isLoading?(
             <ActivityIndicator size='large' color='#fff' />
              
           ):(
            <PowerTranslator style={{ paddingVertical: '5%', color: '#fff' }} text='Post Now' />
           )}
            </TouchableOpacity>
            {/* </View> */}

          </View>

        </SafeAreaView>
      </ScrollView>
    )
  }
}
export default Ads

const styles = StyleSheet.create({
  dowpdown_shadow: {
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: "dotted",
    borderColor: `rgba(0,0,0,0.5)`
  },
  dropdown_view: {
    flex: 1,
    // marginTop: 10,
    height: 45,
    backgroundColor: "white",

  },

  dropdown_error_view: {
    flex: 1,
    marginTop: 10,
    height: 45,
    backgroundColor: "white",
    borderColor: "red",
    borderWidth: 1
  },
  icon_style: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    // tintColor: TEXT_COLOR
  }
})