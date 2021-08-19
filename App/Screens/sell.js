import React, { Component } from 'react'
import { SafeAreaView, Text, StyleSheet, View, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import { Header } from 'native-base'
// import { SliderBox } from "react-native-image-slider-box";
import { colors } from '../Components/colors'
import { FlatList } from 'react-native-gesture-handler';
import { texts } from '../Components/textfile';
import AsyncStorage from '@react-native-community/async-storage';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

class MyAdd extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isFav: false,
      isMyads: true,
      tmpid: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      isclick: false,
      tmpidAd: '',
      isadclick: false,
      myAds: []
    }
  }

  favAdList = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token !== null) {

        fetch('http://3.23.128.206/api/v1/ads/?favourites=4', {
          method: 'get',
          headers: new Headers({
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/x-www-form-urlencoded'
          }),
        }).then((response) => response.json()).then(async (data) => {
          // console.log('success===============', data.results[4].images)
          this.setState({ myAds: data.results })
        })
      }

    } catch (error) {
      console.log(error);
      // Error retrieving data
    }
  }

  async componentDidMount() {
    this.favAdList()

  }

  removeFav = async (id) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token !== null) {

        fetch(`http://3.23.128.206/api/v1/ads/${id}/remove-from-favourite/`, {
          method: 'get',
          headers: new Headers({
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/x-www-form-urlencoded'
          }),
        }).then((response) => response.json()).then(async (data) => {
          console.log('success===============', data)
          this.favAdList()
          // this.setState({ myAds: data.results })
        })
      }

    } catch (error) {
      console.log(error);
      // Error retrieving data
    }
  }

  deleteAd = async (id) => {
    // api/v1/ads/1/
    try {
      const token = await AsyncStorage.getItem('token');
      if (token !== null) {

        fetch(`http://3.23.128.206/api/v1/ads/${id}/`, {
          method: 'delete',
          headers: new Headers({
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/x-www-form-urlencoded'
          }),
        }).then((response) => response.json()).then(async (data) => {
          console.log('success', data)
          // this.setState({ myAds: data.results })
        })
      }

    } catch (error) {
      console.log(error);
      // Error retrieving data
    }
  }
  onRemovepopup = (id) => {
    const { tmpid, isclick } = this.state
    if (tmpid == id) {
      this.setState({ tmpid: id, isclick: !isclick })
    } else {
      this.setState({ tmpid: id, isclick: true })
    }
  }
  ondeletepopup = (id) => {
    const { tmpidAd, isadclick } = this.state
    if (tmpidAd == id) {
      this.setState({ tmpidAd: id, isadclick: !isadclick })
    } else {
      this.setState({ tmpidAd: id, isadclick: true })
    }
  }

  renderAds = ({ item }) => {
    return (
      <TouchableOpacity
        style={{ width: '100%', backgroundColor: '#fff', elevation: 2, marginVertical: '1%', paddingVertical: '2%' }}>
        {this.state.tmpidAd == item.id && this.state.isadclick == true && (
          <View style={{ position: 'absolute', width: '93.5%', height: 100, zIndex: 1, }}>
            <TouchableOpacity onPress={() => this.deleteAd(item.id)}
              style={{
                width: '40%', justifyContent: 'center', alignItems: 'center',
                height: 35, backgroundColor: '#bbb',
                alignSelf: 'flex-end',
                borderRadius: 5
              }}>
              <Text style={texts.SUBHEADING_TEXT} >Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-around', }}>
          <View style={{ width: '20%' }}>
            <View style={{ width: 70, height: 70, borderRadius: 10, borderWidth: 1 }}>
              <Image source={require('../Assets/mm.png')} style={{ width: '100%', height: '100%', resizeMode: 'stretch' }} />
            </View>
            <Text style={[texts.NORMAL_TEXT, { paddingVertical: '10%' }]}>06/08/2021</Text>
          </View>
          <View style={{ width: '75%', }}>
            <TouchableOpacity onPress={() => this.ondeletepopup(item.id)}
              style={{ alignSelf: 'flex-end', padding: 5, marginRight: -5 }}>
              <Image source={require('../Assets/more.png')} style={{ width: 16, height: 16, resizeMode: 'contain' }} />
            </TouchableOpacity>
            <View style={{ top: -20 }} >
              <Text style={[texts.SUBHEADING_TEXT, { width: '93%' }]}>Your Add will be posted shortly</Text>
              <Text style={[texts.NORMAL_TEXT, { textAlign: 'justify', fontSize: 10, width: '90%' }]}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Curabitur cursus tincidunt commodo.</Text>
            </View>
            <Text style={[texts.NORMAL_TEXT, { color: 'red', textAlign: 'right', fontSize: 8 }]}>your ads will expire in 20 days</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
  renderFavourite = ({ item }) => {
    return (
      <TouchableOpacity style={{ width: '100%', backgroundColor: '#fff', elevation: 1, marginVertical: '1%', height: 80 }}>
        {this.state.tmpid == item.id && this.state.isclick == true && (
          <View style={{ position: 'absolute', width: '93.5%', height: 100, zIndex: 1, }}>
            <TouchableOpacity onPress={() => this.removeFav(item.id)}
              style={{
                width: '40%', justifyContent: 'center', alignItems: 'center',
                height: 35, backgroundColor: '#bbb',
                alignSelf: 'flex-end',
                borderRadius: 5
              }}>
              <Text style={texts.SUBHEADING_TEXT} >Remove</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-around', }}>
          <View style={{ width: '18%' }}>
            <View style={{ width: 80, height: 80, borderRadius: 10, backgroundColor: colors.GREY_COLOR }}>
              <Image source={require('../Assets/mm.png')} style={{ width: '100%', height: '100%', resizeMode: 'stretch' }} />
            </View>
            {/* <Text style={[texts.NORMAL_TEXT, { paddingVertical: '10%', fontSize: 10 }]}>06/08/2021</Text> */}
          </View>
          <View style={{ width: '65%', paddingHorizontal: '5%', paddingVertical: 10 }}>
            <Text style={texts.SUBHEADING_TEXT}>{item.title}</Text>
            <Text style={[texts.SUBHEADING_TEXT, { color: '#068f31' }]}>Rs. {item.price}</Text>
            <Text style={[texts.NORMAL_TEXT, { textAlign: 'justify', fontSize: 10 }]}>{item.description}</Text>
          </View>
          <View style={{ width: '8%', alignItems: 'center', justifyContent: 'space-around', }}>
            <TouchableOpacity onPress={() => this.onRemovepopup(item.id)}
              style={{ alignSelf: 'flex-end', marginBottom: 10, padding: 5 }}>
              <Image source={require('../Assets/more.png')} style={{ width: 16, height: 16, resizeMode: 'contain' }} />
            </TouchableOpacity>
            <Image source={require('../Assets/wishlist.png')} style={{ width: 24, height: 24, resizeMode: 'contain', tintColor: 'red' }} />
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    const { myAds } = this.state
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.PRIMARY_COLOR }}>

        <ScrollView contentContainerStyle={{ flex: 1 }}>
          <View style={{ flex: 1, backgroundColor: '#fff', elevation: 1, alignItems: 'center' }}>
            <View style={styless.btn_container}>
              <TouchableOpacity
                disabled={this.state.isMyads}
                onPress={() => this.setState({ isFav: false, isMyads: true })}
                style={[styless.btnStyle, { borderColor: this.state.isMyads ? colors.PRIMARY_COLOR : '#fff' }]}>
                <Text style={styless.btnText}>My Ads</Text>
              </TouchableOpacity>
              <TouchableOpacity
                disabled={this.state.isFav}
                onPress={() => this.setState({ isMyads: false, isFav: true })}
                style={[styless.btnStyle, { borderColor: this.state.isMyads ? '#fff' : colors.PRIMARY_COLOR }]}>
                <Text style={styless.btnText}>Favourite</Text>
              </TouchableOpacity>
            </View>
            <View style={{ width: '100%' }}>
              {this.state.isMyads ? (
                <FlatList
                  data={myAds}
                  keyExtractor={(item) => item.id}
                  renderItem={this.renderAds}
                />
              ) : (
                <>
                  <FlatList
                    data={myAds}
                    keyExtractor={(item) => item.id}
                    renderItem={this.renderFavourite}
                  />
                </>
              )}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}
export default MyAdd

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
  btn_container: {
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '3%'
  },
  btnStyle: {
    borderBottomWidth: 2,
    borderColor: colors.PRIMARY_COLOR
  },
  btnText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.TEXT_COLOR,
    padding: '2%'
  }
})