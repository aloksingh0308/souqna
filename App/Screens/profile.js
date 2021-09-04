import React, { Component } from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image, StatusBar,ActivityIndicator } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { Button } from '../Components/button'
import { colors } from '../Components/colors'
import { texts } from '../Components/textfile'
import { Header } from 'native-base'
import AsyncStorage from '@react-native-community/async-storage';
import { PowerTranslator, ProviderTypes, TranslatorConfiguration, TranslatorFactory } from 'react-native-power-translator';
import { getUser } from '../Components/api_link'

// TranslatorConfiguration.setConfig(ProviderTypes.Google, 'AIzaSyBY54m5k1-VQeAl3nw95pX79fnHp8_CqLg','ar','en');
// const translator = TranslatorFactory.createTranslator();
const listData = [
  {
    id: 1,
    title: 'My Ads',
    link: 'SellScreen'
  },
  {
    id: 2,
    title: 'Profile Setting',
    link: 'ProfileSetting'
  },
  {
    id: 3,
    title: 'Terms & Conditions',
    link: 'Terms_Conditions'
  },
  {
    id: 4,
    title: 'About Us',
    link: 'AboutUs'
  },
]

class Profile extends Component {
  constructor(props){
    super(props)
    this.state={
      isLoading:false,
      user_data:{}
    }
  }

  getUser=async()=>{
    try {
      const token = await AsyncStorage.getItem('token');
      if (token !== null) {
          // console.log(token)
          fetch(getUser, {
              method: 'get',
              headers: new Headers({
                  'Authorization': 'Bearer ' + token,
                  'Content-Type': 'application/x-www-form-urlencoded'
              }),
          }).then((response) => response.json()).then(async (data) => {
              console.log('success===============', data)
              this.setState({ user_data: data.user })
          })
        
      }

  } catch (error) {
      console.log(error);
      // Error retrieving data
  }
  }

  async componentDidMount(){
    this.setState({isLoading:true})
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
       
  this.getUser()
  this.focusListener = this.props.navigation.addListener('focus', () => {
    // this.loadData();
    this.getUser()
    //Put your Data loading function here instead of my this.loadData()
  });
}

  logout = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        if (token !== null) {
            fetch('http://3.23.128.206/api/v1/auth/logout/', {
                method: 'get',
                headers: new Headers({
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }),
            }).then((response) => response.json()).then(async (data) => {
                AsyncStorage.removeItem('token');
                this.props.navigation.replace('LoginScreen')
            })
        }

    } catch (error) {
        console.log(error);
        // Error retrieving data
    }
}
  renderList = ({ item }) => (
    <TouchableOpacity onPress={()=>this.props.navigation.navigate(item.link)} style={styles.itemContainer}>
      <View style={{ width: 10, height: 10, borderRadius: 10 / 2, backgroundColor: colors.TEXT_COLOR }}></View>
      <PowerTranslator style={{...texts.SUBHEADING_TEXT,width:320,fontSize:14 }} text={item.title} />
    </TouchableOpacity>
  )
  render() {
    const {isLoading,user_data} = this.state
    return (
      <>
      {isLoading?(
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size='large' color={colors.TEXT_COLOR} />
    </View>
      ):(
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <Header style={{ backgroundColor: '#fff', elevation: 0 }}>
          <View style={styles.headerStyle}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: '100%', height: '100%' }}>

              <View style={{ width: '90%', height: '100%', justifyContent: 'center' }}>
                <PowerTranslator style={texts.HEADING_TEXT} text={'Profile'} />
              </View>

            </View>
          </View>
        </Header>
        <StatusBar backgroundColor={colors.TEXT_COLOR} />
        <View style={{ flex: 0.7, alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ width: 80, height: 80, borderRadius: 80 / 2, elevation: 1, backgroundColor: colors.TEXT_COLOR,overFlow:'hidden',overflow:'hidden' }}>
            {user_data.pic==null?(
              <Image source={require('../Assets/logo_small.png')} style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
            ):(
              <Image source={{uri:user_data.pic}} style={{ width: '100%', height: '100%', resizeMode: 'cover' }} />
            )}
            {/* <Image source={require('../Assets/logo_small.png')} style={{ width: '100%', height: '100%', resizeMode: 'contain' }} /> */}
          </View>
          {/* <PowerTranslator style={texts.SUBHEADING_TEXT} text={user_data.fullname} /> */}
          <Text style={texts.SUBHEADING_TEXT} >{user_data.fullname} </Text>
          <Text style={texts.NORMAL_TEXT}>{user_data.email}</Text>
        </View>
        <View style={{ flex: 1.3, }}>
          <FlatList
            data={listData}
            keyExtractor={(item) => item.id}
            renderItem={this.renderList}
            ListFooterComponent={() => {
              return (
                <TouchableOpacity style={{ marginTop: '5%' }}>
                  {/* <PowerTranslator style={{ paddingHorizontal: '5%', color: 'red' }} text={'Deactivate My account'} /> */}
                </TouchableOpacity>
              )
            }}
          />
        </View>
        <View style={{ flex: 0.3, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity onPress={()=>this.logout()}
          style={{ width: '60%', backgroundColor: colors.TEXT_COLOR, alignItems: 'center', borderRadius: 10 }}>
            <PowerTranslator style={{ paddingVertical: '5%', color: '#fff' }} text='Logout' />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      )}
      </>
    )
  }
}
export default Profile

const styles = StyleSheet.create({
  itemContainer: {
    width: '90%',
    flexDirection: 'row',
    // borderWidth: 1,
    borderRadius: 20,
    shadowOpacity:0.5,
    shadowColor:'#ddd',
    backgroundColor: '#fff',
    alignSelf: 'center',
    justifyContent: 'space-between',
    height: 40,
    alignItems: 'center',
    marginVertical: '2%',
    elevation: 3,
    borderColor: '#eee'
  },
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
})