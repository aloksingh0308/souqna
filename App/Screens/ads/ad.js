import React, { Component } from 'react'
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, FlatList, Image, TouchableHighlight } from 'react-native'
import { InputBox } from '../../Components/input'
import { texts } from '../../Components/textfile'
import ModalDropdown from 'react-native-modal-dropdown';
import { ScrollView } from 'react-native-gesture-handler';
import { colors } from '../../Components/colors';
import * as ImagePicker from "react-native-image-picker"
import { categoryData } from '../../Components/categoryData';
import { postApi,generate_UUID, postApiwithToken } from '../../Components/functions';
import { create_ads } from '../../Components/api_link';
import AsyncStorage from '@react-native-community/async-storage';
import Geocoder from 'react-native-geocoding';
Geocoder.init("AIzaSyC5m-C32piW2yiT3kevVbvLfHXsLsPTWik")

// import { Image } from 'native-base';
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
     lat:"",
     long:""
    }
  }


  postAd = async (uri) => {
    const { title,price,category,description,address,images,userLocation,lat,long} = this.state

    

  let location=await Geocoder.from(address)
  .then(json => {
    var location = json.results[0].geometry.location;
    return location

  })
  .catch(error => console.warn(error));
    let data = new FormData()
    data.append('title',title)
    data.append('description', description)
    data.append('type', 'COMPANY')
    data.append('extra', '{"RAM":"2gb"}')
    data.append('region', 'Lucknow')
    data.append('category', '1')
    data.append('location', `{ "lat":${location.lat}, "lon":${location.lng}}`)
    data.append('price', price)
    data.append('address',address)
    this.state.images.map((item)=>{
      let photo = {
        name: generate_UUID() + 'aloksingh' + '.png',
        type: "image/png",
        uri: item,
    };
      data.append("images", photo)
    })
    
    try {
      const token = await AsyncStorage.getItem('token');
      if (token !== null) {
        postApiwithToken(create_ads, data, token).then((res) => {
          console.log(res)
          this.props.navigation.replace('Sucess')
        })
      }

    } catch (error) {
      console.log(error);
    }
  }



  addImage = () => {
    let options = {
      title: 'Select Image',
      
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 200,
      maxWidth: 200,
      customButtons: [
        { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
  try{
    ImagePicker.launchImageLibrary(
      options,
      (response) => {
        // let img={'image':response.assets[0].uri}
        this.setState({ images:[...this.state.images,response.assets[0].uri] })
        // this.setState({resourcePath: response});
        console.log(this.state.images);
      },
    )
  }catch{
    console.log('something went worng')
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
      <Image source={{ uri: item }} style={{ width: '100%', height: '95%', resizeMode: 'cover' }} />
    </View>
  )
  render() {
    return (
      <ScrollView >
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', }}>
          <View style={{ width: '100%', alignItems: 'center' }}>
            <Text style={[texts.SUBHEADING_TEXT, { paddingHorizontal: '1%', paddingVertical: '5%', width: '100%' }]} >create new product ad</Text>
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
              onChangeText={(text) => this.setState({ title: text })}
              styles={{ width: '100%', alignItems: 'center' }}
            />
            <InputBox
              title='Price *'
              placeHolder='Enter Product Price'
              onChangeText={(text) => this.setState({ price: text })}
              styles={{ width: '100%', alignItems: 'center', marginTop: '3%' }}
            />
            <View style={{ width: '95%', marginTop: '3%' }}>
              <Text style={[texts.NORMAL_TEXT, { paddingHorizontal: '2%', width: '95%' }]}>Category</Text>
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
                textStyle={{ paddingHorizontal: '5%', paddingVertical: '5%', color: colors.TEXT_COLOR }}
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
            </View>
            <InputBox
              multiline={true}
              textBoxStyle={{ height: 100 }}
              title='Description'
              placeHolder='Description'
              onChangeText={(text) => this.setState({ description: text })}
              styles={{ width: '100%', alignItems: 'center', marginTop: '3%' }}
            />
            <InputBox
              title='Address'
              placeHolder='Address'
              onChangeText={(text) => {this.setState({ address: text })}}
              styles={{ width: '100%', alignItems: 'center', marginTop: '3%' }}
            />
            
            <TouchableOpacity onPress={() => this.postAd()}
              style={{ width: '60%', backgroundColor: colors.TEXT_COLOR, alignItems: 'center', borderRadius: 20, marginVertical: '5%', marginTop: '10%' }}>
              <Text style={{ paddingVertical: '5%', color: '#fff' }}>Post</Text>
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