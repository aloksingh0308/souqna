import React, { Component } from 'react'
import { SafeAreaView, Text, StyleSheet, View, Image, TouchableOpacity, ScrollView, Dimensions,ActivityIndicator } from 'react-native'
import { Header } from 'native-base'
// import { SliderBox } from "react-native-image-slider-box";
import { colors } from '../Components/colors'
import { FlatList } from 'react-native-gesture-handler';
import { texts } from '../Components/textfile';
import AsyncStorage from '@react-native-community/async-storage';
import { PowerTranslator, ProviderTypes, TranslatorConfiguration, TranslatorFactory } from 'react-native-power-translator';
// TranslatorConfiguration.setConfig(ProviderTypes.Google, 'AIzaSyBY54m5k1-VQeAl3nw95pX79fnHp8_CqLg','ar','en');
// const translator = TranslatorFactory.createTranslator();
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
      myAds: [],
      favAds:[],
      isLoading:false
    }
  }

  favAdList = async (id) => {
    console.log(id)
    try {
      const token = await AsyncStorage.getItem('token');
      if (token !== null) {

        fetch(`http://3.23.128.206/api/v1/ads/?favourites=${id}`, {
          method: 'get',
          headers: new Headers({
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/x-www-form-urlencoded'
          }),
        }).then((response) => response.json()).then(async (data) => {
          // console.log('success===============', data.results)
          this.setState({ favAds: data.results })
        })
      }

    } catch (error) {
      console.log(error);
      // Error retrieving data
    }
  }

  myAds=async(id)=>{
    console.log(id)
    try {
      const token = await AsyncStorage.getItem('token');
      if (token !== null) {

        fetch(`http://3.23.128.206/api/v1/ads/?user=${id}`, {
          method: 'get',
          headers: new Headers({
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/x-www-form-urlencoded'
          }),
        }).then((response) => response.json()).then(async (data) => {
          // console.log('success===============', data.results)
          this.setState({ myAds: data.results })
        })
      }

    } catch (error) {
      console.log(error);
      // Error retrieving data
    }
  }

  async componentDidMount() {
    this.setState({isLoading:true})
    try {
      const user_id = await AsyncStorage.getItem('userId');
      this.favAdList(parseInt(user_id))
      this.myAds(user_id)
      this.setState({user_id:user_id})
  } catch (error) {
      console.log(error);
      // Error retrieving data
  }
   
    // componentDidMount(){
      try {
          const lng = await AsyncStorage.getItem('lng');
          TranslatorConfiguration.setConfig(ProviderTypes.Google, 'AIzaSyBY54m5k1-VQeAl3nw95pX79fnHp8_CqLg',lng,'en');
          setTimeout(()=>{
            this.setState({isLoading:false})
          },2000)
      } catch (error) {
          console.log(error);
          // Error retrieving data
      }
      
  // }

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
    console.log(id)
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
          this.myAds(this.state.user_id)
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
      <TouchableOpacity onPress={() => this.props.navigation.navigate('ProductDetails',{item:item})}
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
              <PowerTranslator style={texts.SUBHEADING_TEXT}  text={'Delete'} />
            </TouchableOpacity>
          </View>
        )}
        <TouchableOpacity onPress={() => this.ondeletepopup(item.id)}
              style={{ alignSelf: 'flex-end',width:32,height:32 ,position:'absolute',alignItems:'center' }}>
              <Image source={require('../Assets/more.png')} style={{ width: 16, height: 16, resizeMode: 'contain' }} />
            </TouchableOpacity>
        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-around', }}>
          <View style={{ width: '20%' }}>
            <View style={{ width: 70, height: 70, borderRadius: 10, borderWidth: 1,overflow:'hidden' }}>
            {item.images.length>0?(
                    <Image 
                    source={{uri:item.images[0].file}}
                    // source={require('../Assets/prop.png')} 
                    style={{ width: '100%', height: '100%', resizeMode: 'contain' }} /> 

                ):(
                   <View style={{width:'100%',height:'100%',justifyContent:'center',alignItems:'center'}}>
                        <Text>No Image</Text>
                   </View>
                )}
            </View>
            {/* <Text style={[texts.NORMAL_TEXT, { paddingVertical: '10%' }]}>06/08/2021</Text> */}
          </View>
          <View style={{ width: '75%', }}>
            {/* <TouchableOpacity onPress={() => this.ondeletepopup(item.id)}
              style={{ alignSelf: 'flex-end', padding: 5, marginRight: 5,backgroundColor:'red' }}>
              <Image source={require('../Assets/more.png')} style={{ width: 16, height: 16, resizeMode: 'contain' }} />
            </TouchableOpacity> */}
         
            <View style={{ top: 0 }} >
            <PowerTranslator style={texts.SUBHEADING_TEXT} text={item.title} />
            <PowerTranslator style={{...texts.SUBHEADING_TEXT, color: '#068f31' }} text={`Rs. ${item.price}`} />
            <PowerTranslator numberOfLines={2} style={{...texts.NORMAL_TEXT, textAlign: 'justify', fontSize: 10 }} text={item.description} />
            </View>
            {/* <Text style={[texts.NORMAL_TEXT, { color: 'red', textAlign: 'right', fontSize: 8 }]}>your ads will expire in 20 days</Text> */}
          </View>
        </View>
      </TouchableOpacity>
    )
  }
  renderFavourite = ({ item }) => {
    return (
      <TouchableOpacity style={{ width: '100%', backgroundColor: '#fff', elevation: 1, marginVertical: '1%', }}>
        {this.state.tmpid == item.id && this.state.isclick == true && (
          <View style={{ position: 'absolute', width: '93.5%', height: 100, zIndex: 1, }}>
            <TouchableOpacity onPress={() => this.removeFav(item.id)}
              style={{
                width: '40%', justifyContent: 'center', alignItems: 'center',
                height: 35, backgroundColor: '#bbb',
                alignSelf: 'flex-end',
                borderRadius: 5
              }}>
                <PowerTranslator style={texts.SUBHEADING_TEXT}  text={'Remove'} />
            </TouchableOpacity>
          </View>
        )}

        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-around', }}>
          <View style={{ width: '18%' }}>
            <View style={{ width: 80, height: 80, borderRadius: 10, backgroundColor: colors.GREY_COLOR }}>
            {item.images.length>0?(
                    <Image 
                    source={{uri:item.images[0].file}}
                    // source={require('../Assets/prop.png')} 
                    style={{ width: '100%', height: '100%', resizeMode: 'contain' }} /> 

                ):(
                   <View style={{width:'100%',height:'100%',justifyContent:'center',alignItems:'center'}}>
                        <Text>No Image</Text>
                   </View>
                )}
            </View>
            {/* <Text style={[texts.NORMAL_TEXT, { paddingVertical: '10%', fontSize: 10 }]}>06/08/2021</Text> */}
          </View>
          <View style={{ width: '65%', paddingHorizontal: '5%', paddingVertical: 10 }}>
            <PowerTranslator style={texts.SUBHEADING_TEXT} text={item.title} />
            <PowerTranslator style={{...texts.SUBHEADING_TEXT, color: '#068f31' }} text={`Rs. ${item.price}`} />
            <PowerTranslator numberOfLines={2} style={{...texts.NORMAL_TEXT, textAlign: 'justify', fontSize: 10 }} text={item.description} />
          </View>
          <View style={{ width: '8%', alignItems: 'center', justifyContent: 'space-around', }}>
            <TouchableOpacity onPress={() => this.onRemovepopup(item.id)}
              style={{ alignSelf: 'flex-end',width:32,height:32 ,position:'absolute',alignItems:'center' }}>
              <Image source={require('../Assets/more.png')} style={{ width: 16, height: 16, resizeMode: 'contain' }} />
            </TouchableOpacity>
            <Image source={require('../Assets/wishlist.png')} style={{ width: 24, height: 24, resizeMode: 'contain', tintColor: 'red' }} />
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    const { myAds,favAds,isLoading } = this.state
    return (
      <>
      {isLoading?(
 <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
 <ActivityIndicator size='large' color={colors.TEXT_COLOR} />
</View>
      ):(
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.PRIMARY_COLOR }}>

        <ScrollView contentContainerStyle={{ flex: 1 }}>
          <View style={{ flex: 1, backgroundColor: '#fff', elevation: 1, alignItems: 'center' }}>
            <View style={styless.btn_container}>
              <TouchableOpacity
                disabled={this.state.isMyads}
                onPress={() => this.setState({ isFav: false, isMyads: true })}
                style={[styless.btnStyle, { borderColor: this.state.isMyads ? colors.PRIMARY_COLOR : '#fff' }]}>
                <PowerTranslator style={styless.btnText} text='My Ads' />
              </TouchableOpacity>
              <TouchableOpacity
                disabled={this.state.isFav}
                onPress={() => this.setState({ isMyads: false, isFav: true })}
                style={[styless.btnStyle, { borderColor: this.state.isMyads ? '#fff' : colors.PRIMARY_COLOR }]}>
                <PowerTranslator style={styless.btnText} text='Favourite' />
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
                    data={favAds}
                    keyExtractor={(item) => item.id}
                    renderItem={this.renderFavourite}
                  />
                </>
              )}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      )}
      </>
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