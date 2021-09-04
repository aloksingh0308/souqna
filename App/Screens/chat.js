import React, { Component } from 'react'
import { SafeAreaView, Text, StyleSheet, View, Image,ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native'
import { Header } from 'native-base'
// import { SliderBox } from "react-native-image-slider-box";
import { colors } from '../Components/colors'
import { FlatList } from 'react-native-gesture-handler';
import { texts } from '../Components/textfile';
import AsyncStorage from '@react-native-community/async-storage';
import { chats } from '../Components/api_link';
import { PowerTranslator, ProviderTypes, TranslatorConfiguration, TranslatorFactory } from 'react-native-power-translator';
// TranslatorConfiguration.setConfig(ProviderTypes.Google, 'AIzaSyBY54m5k1-VQeAl3nw95pX79fnHp8_CqLg','ar','en');
// const translator = TranslatorFactory.createTranslator();

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

class ChatScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isFav: false,
      isMyads: true,
      chatData:[],
      isChat:false,
      isLoading:false,
      token:""
    }
  }
  getChats=async()=>{

    try {
      const token = await AsyncStorage.getItem('token');
      if (token !== null) {
        this.setState({token:token})
          fetch(chats, {
              method: 'get',
              headers: new Headers({
                  'Authorization': 'Bearer ' + token,
                  'Content-Type': 'application/x-www-form-urlencoded'
              }),
          }).then((response) => response.json()).then(async (data) => {
              console.log('successs', data.results)
              if(data.results.length>0){
                this.setState({ chatData: data.results,isChat:true,isLoading:false })
              }else{
                this.setState({ chatData: data.results,isChat:false,isLoading:false })
              }
              
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
      } catch (error) {
          console.log(error);
          // Error retrieving data
      }
  this.getChats()

  this.focusListener = this.props.navigation.addListener('focus', () => {
    // this.loadData();
    this.getChats()
    //Put your Data loading function here instead of my this.loadData()
  });
   
}
  renderChat = ({item}) => {
    const {token} = this.state
    return (
      <TouchableOpacity onPress={() => this.props.navigation.navigate('Chat',{token:token,userId:item.seller,last_message:item.last_message.id})}
        style={{ width: '100%', backgroundColor: '#fff', elevation: 1, marginVertical: 1, alignSelf: 'center', paddingVertical: '2%' }}>
        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-around', alignItems: 'center' }}>
          <View style={{ width: 60, height: 60, borderRadius: 60 / 2, backgroundColor: colors.TEXT_COLOR }}>
            <Image source={require('../Assets/logo_small.png')} style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
          </View>
          <View style={{ width: '80%' }}>
            <PowerTranslator style={{...texts.SUBHEADING_TEXT}} text={item.seller.fullname} />
            <Text>{item.last_message.text}</Text>
            {/* <PowerTranslator numberOfLines={1} style={{...texts.NORMAL_TEXT,paddingVertical: '0%' }} text={item.last_message.text} /> */}
          </View>
        </View>
      </TouchableOpacity>
    )
  }


  render() {
    const {chatData,isChat,isLoading} =this.state
    return (
      <>
      {isLoading?(
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size='large' color={colors.TEXT_COLOR} />
    </View>
      ):(
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <Header style={{ backgroundColor: colors.PRIMARY_COLOR, elevation: 0 }}>
          <View style={styless.headerStyle}>
            <PowerTranslator style={{...texts.HEADING_TEXT, color: colors.TEXT_COLOR, paddingRight: '12%' }} text='My Chat' />
          </View>
        </Header>
        {/* <ScrollView contentContainerStyle={{ flex: 1 }}> */}
        <View style={{ flex: 1, backgroundColor: '#fff', elevation: 1, alignItems: 'center' }}>
          <View style={{ flex:1}}>
           {isChat?(
              <FlatList
              data={chatData}
              keyExtractor={(item) => item.id}
              renderItem={this.renderChat}
            />
           ):(
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
               {/* <Text style={texts.SUBHEADING_TEXT}>Sorry! you didn't chat with anyone</Text> */}
               <PowerTranslator style={{...texts.SUBHEADING_TEXT}} text="Sorry! you didn't chat with anyone" />
            </View>
           )}

          </View>
        </View>
        {/* </ScrollView> */}
      </SafeAreaView>
      )}
      </>
    )
  }
}
export default ChatScreen

const styless = StyleSheet.create({
  headerStyle: {
    width: '110%',
    // backgroundColor:'#008844',
    justifyContent: 'center',
    // alignItems: 'center',
    alignSelf: 'center',
    marginLeft: '10%'
    // height:60
    // marginTop:50,
    // borderRadius:10
  },
  btn_container: {
    width: '100%',
    // flexDirection: 'row',
    // justifyContent: 'space-around',
    // alignItems: 'center',
    marginTop: '5%'
  },
  btnStyle: {
    // borderBottomWidth: 2,
    borderColor: colors.PRIMARY_COLOR
  },
  btnText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    padding: '2%'
  }
})