import React, { Component } from 'react'
import { SafeAreaView, Text, StyleSheet, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import { Header } from 'native-base'
// import { SliderBox } from "react-native-image-slider-box";
import { colors } from '../Components/colors'
import { FlatList } from 'react-native-gesture-handler';
import { texts } from '../Components/textfile';
import AsyncStorage from '@react-native-community/async-storage';
import { chats } from '../Components/api_link';

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
    }
  }
  async componentDidMount(){
    try {
        const token = await AsyncStorage.getItem('token');
        if (token !== null) {
            fetch(chats, {
                method: 'get',
                headers: new Headers({
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }),
            }).then((response) => response.json()).then(async (data) => {
                console.log('successs', data)
                // this.setState({ newimages: data.results })
            })
        }

    } catch (error) {
        console.log(error);
        // Error retrieving data
    }
   
}
  renderChat = () => {
    return (
      <TouchableOpacity onPress={() => this.props.navigation.navigate('Chat')}
        style={{ width: '100%', backgroundColor: '#fff', elevation: 1, marginVertical: 1, alignSelf: 'center', paddingVertical: '2%' }}>
        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-around', alignItems: 'center' }}>
          <View style={{ width: 60, height: 60, borderRadius: 60 / 2, backgroundColor: colors.TEXT_COLOR }}>
            <Image source={require('../Assets/logo_small.png')} style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
          </View>
          <View style={{ width: '80%' }}>
            <Text style={texts.SUBHEADING_TEXT}>User Name</Text>
            <Text numberOfLines={1} style={[texts.NORMAL_TEXT, { paddingVertical: '0%' }]}>Lorem ipsum dolor sit amet,</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }


  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <Header style={{ backgroundColor: colors.PRIMARY_COLOR, elevation: 0 }}>
          <View style={styless.headerStyle}>
            <Text style={[texts.HEADING_TEXT, { color: colors.TEXT_COLOR, paddingRight: '12%' }]}>My Chat</Text>
          </View>
        </Header>
        {/* <ScrollView contentContainerStyle={{ flex: 1 }}> */}
        <View style={{ flex: 1, backgroundColor: '#fff', elevation: 1, alignItems: 'center' }}>
          <View style={{ width: '100%' }}>
            <FlatList
              data={DATA}
              keyExtractor={(item) => item.id}
              renderItem={this.renderChat}
            />

          </View>
        </View>
        {/* </ScrollView> */}
      </SafeAreaView>
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