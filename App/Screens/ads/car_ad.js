import React, { Component } from 'react'
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, FlatList, Image, TouchableHighlight, Dimensions } from 'react-native'
import { InputBox } from '../../Components/input'
import { texts } from '../../Components/textfile'
// import ModalDropdown from 'react-native-modal-dropdown';
import { ScrollView } from 'react-native-gesture-handler';
import { colors } from '../../Components/colors';
import * as ImagePicker from "react-native-image-picker"
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const transmissionData = [
  {
    id: 1,
    title: 'Manual'
  },
  {
    id: 2,
    title: 'Automatic'
  }
]

const ownersData = [
  {
    id: 1,
    title: 'Fisrt'
  },
  {
    id: 2,
    title: 'Second'
  },
  {
    id: 3,
    title: 'Third'
  },
  {
    id: 4,
    title: 'Fourth'
  }
]

const fuelData = [
  {
    id: 1,
    title: 'CNG & Hybrid'
  },
  {
    id: 2,
    title: 'Diesel'
  },
  {
    id: 3,
    title: 'Petrol'
  },
  {
    id: 4,
    title: 'Electric'
  }
]

// import { Image } from 'native-base';
class CarAds extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      price: '',
      category: '',
      description: '',
      address: '',
      images: [],

      //tmp id
      tmpid_fuel: null,
      tmpid_transmission: null,
      tmpid_owner: null
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
    ImagePicker.launchImageLibrary(
      options,
      
      (response) => {
        // let img={'image':response.assets[0].uri}
        this.setState({ images: [...this.state.images, response.assets[0].uri] })
        // this.setState({resourcePath: response});
        console.log(this.state.images);
      },
    )
  }

  listHeader = () => (
    <TouchableOpacity onPress={() => this.addImage()}>
      <View style={{ width: 80, height: 80, marginHorizontal: 5, overflow: 'hidden', borderRadius: 15, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ddd' }}>
        <Image source={require('../../Assets/plus.png')} style={{ width: 32, height: 32, resizeMode: 'contain',tintColor:'#999' }} />
      </View>
    </TouchableOpacity>
  )
  renderImages = ({ item }) => (
    <View style={{ width: 120, height: 100, marginHorizontal: 5, overflow: 'hidden', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
      <Image source={{ uri: item }} style={{ width: '100%', height: '95%', resizeMode: 'cover' }} />
    </View>
  )
  renderFuel = ({ item }) => (
    <TouchableOpacity onPress={() => this.setState({ tmpid_fuel: item.id })}
      style={{ backgroundColor: '#fff', marginHorizontal: windowWidth * 0.026, justifyContent: 'center' }}>
      <Text style={[texts.NORMAL_TEXT, { paddingHorizontal: 8, backgroundColor: this.state.tmpid_fuel == item.id ? colors.PRIMARY_COLOR : '#fff', paddingVertical: 8, borderRadius: 5, borderWidth: 1,borderColor:'#aaa' }]}>{item.title}</Text>
    </TouchableOpacity>
  )
  renderTransmission = ({ item }) => (
    <TouchableOpacity onPress={() => this.setState({ tmpid_transmission: item.id })}
      style={{ backgroundColor: '#fff', marginHorizontal: windowWidth * 0.026, justifyContent: 'center' }}>
      <Text style={[texts.NORMAL_TEXT, { paddingHorizontal: 8, backgroundColor: this.state.tmpid_transmission == item.id ? colors.PRIMARY_COLOR : '#fff', paddingVertical: 8, borderRadius: 5, borderWidth: 1,borderColor:'#aaa' }]}>{item.title}</Text>
    </TouchableOpacity>
  )
  renderOwner = ({ item }) => (
    <TouchableOpacity onPress={() => this.setState({ tmpid_owner: item.id })}
      style={{ backgroundColor: '#fff', marginHorizontal: windowWidth * 0.026, justifyContent: 'center' }}>
      <Text style={[texts.NORMAL_TEXT, { paddingHorizontal: 10, backgroundColor: this.state.tmpid_owner == item.id ? colors.PRIMARY_COLOR : '#fff', paddingVertical: 8, borderRadius: 5, borderWidth: 1,borderColor:'#aaa' }]}>{item.title}</Text>
    </TouchableOpacity>
  )
  render() {
    return (
      <ScrollView >
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', }}>
          <View style={{ width: '100%', alignItems: 'center' }}>
            <Text style={[texts.SUBHEADING_TEXT, { paddingHorizontal: '1%', paddingVertical: '5%', width: '100%' }]} >create new Car ad</Text>
            <View style={{ width: '100%', height: 100, backgroundColor: '#fff', marginBottom: '5%', justifyContent: 'center', alignItems: 'center' }}>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={this.state.images}
                renderItem={this.renderImages}
                ListHeaderComponent={this.listHeader}
                ListHeaderComponentStyle={{ justifyContent: 'center' }}
                keyExtractor={(item, index) => index}
              />

            </View>
            <InputBox
              title='Brand Name *'
              placeHolder='Enter Brand Name'
              onChangeText={(text) => this.setState({ title: text })}
              styles={{ width: '100%', alignItems: 'center' }}
            />
            <InputBox
              title='Year'
              placeHolder='Year of Buy'
              onChangeText={(text) => this.setState({ price: text })}
              styles={{ width: '100%', alignItems: 'center', marginTop: '3%' }}
            />
            <View style={{ height: 80, width: '95%', backgroundColor: '#fff', marginTop: '3%' }}>
              <Text style={[texts.NORMAL_TEXT,{paddingHorizontal:'4%'}]}>Fuel</Text>
              <FlatList
                horizontal
                data={fuelData}
                renderItem={this.renderFuel}
                keyExtractor={(item) => item.id}
              />
            </View>
            <View style={{ height: 80, width: '95%', backgroundColor: '#fff', marginTop: '3%' }}>
              <Text style={[texts.NORMAL_TEXT,{paddingHorizontal:'4%'}]}>Transmission</Text>
              <FlatList
                horizontal
                data={transmissionData}
                renderItem={this.renderTransmission}
                keyExtractor={(item) => item.id}
              />
            </View>

            <InputBox
              title='KM Driven'
              placeHolder='Km'
              onChangeText={(text) => this.setState({ price: text })}
              styles={{ width: '100%', alignItems: 'center', marginTop: '3%' }}
            />
            <View style={{ height: 80, width: '95%', backgroundColor: '#fff', marginTop: '3%' }}>
              <Text style={[texts.NORMAL_TEXT,{paddingHorizontal:'4%'}]}>No. of Owners</Text>
              <FlatList
                horizontal
                data={ownersData}
                renderItem={this.renderOwner}
                keyExtractor={(item) => item.id}
              />
            </View>
            <InputBox
              title='Title *'
              placeHolder='Enter Product Name'
              onChangeText={(text) => this.setState({ title: text })}
              styles={{ width: '100%', alignItems: 'center', marginTop: '3%' }}
            />
            <InputBox
              title='Price *'
              placeHolder='Enter Product Price'
              onChangeText={(text) => this.setState({ price: text })}
              styles={{ width: '100%', alignItems: 'center', marginTop: '3%' }}
            />
            <InputBox
              multiline={true}
              textBoxStyle={{ height: 100 }}
              title='Description'
              placeHolder='Description'
              onChangeText={(text) => this.setState({ description: text })}
              styles={{ width: '100%', alignItems: 'center', marginTop: '3%' }}
            />
            <InputBox
              // multiline={true}
              // textBoxStyle={{height:60}}
              title='Address'
              placeHolder='Address'
              onChangeText={(text) => this.setState({ address: text })}
              styles={{ width: '100%', alignItems: 'center', marginTop: '3%' }}
            />
            {/* <View style={{ flex: 0.3, justifyContent: 'center', alignItems: 'center' }}> */}
            <TouchableOpacity onPress={() => this.addImage()}
              style={{ width: '60%', backgroundColor: colors.TEXT_COLOR, alignItems: 'center', borderRadius: 20, marginVertical: '5%', marginTop: '10%' }}>
              <Text style={{ paddingVertical: '5%', color: '#fff' }}>Post Now</Text>
            </TouchableOpacity>
            {/* </View> */}

          </View>

        </SafeAreaView>
      </ScrollView>
    )
  }
}
export default CarAds

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