import React, { Component } from 'react'
import { SafeAreaView, Text, StyleSheet, View, Image, TouchableOpacity, ScrollView, PermissionsAndroid, TextInput } from 'react-native'
import { Header } from 'native-base'
import { colors } from '../Components/colors'
import { FlatList } from 'react-native-gesture-handler';
import { texts } from '../Components/textfile';
import { categoryData } from '../Components/categoryData';
import AsyncStorage from '@react-native-community/async-storage';
import { PowerTranslator, ProviderTypes, TranslatorConfiguration, TranslatorFactory } from 'react-native-power-translator';
import { categories_api } from '../Components/api_link';
// TranslatorConfiguration.setConfig(ProviderTypes.Google, 'AIzaSyBY54m5k1-VQeAl3nw95pX79fnHp8_CqLg','ar','en');
// const translator = TranslatorFactory.createTranslator();

class MyAdds extends Component {
  constructor(props){
    super(props)
    this.state={
      category_Data:[]
    }
  }


  selectCategory = (id,name) => {
    switch (name) {
      case 'Cars':
        return this.props.navigation.navigate('CarAds',{cat_id:id})
      case 'Company':
        return this.props.navigation.navigate('CompanyAd',{cat_id:id})
      default:
        return this.props.navigation.navigate('Ads',{cat_id:id})
    }
  }

  async componentDidMount(){
    try {
        const lng = await AsyncStorage.getItem('lng');
        TranslatorConfiguration.setConfig(ProviderTypes.Google, 'AIzaSyBY54m5k1-VQeAl3nw95pX79fnHp8_CqLg',lng,'en');
    } catch (error) {
        console.log(error);
        // Error retrieving data
    }
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
              console.log('success===============', data.results)
              this.setState({ category_Data: data.results })
          })
      }

  } catch (error) {
      console.log(error);
      // Error retrieving data
  }
}

  renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => this.selectCategory(item.id,item.name)}
    style={{ width: '40%', height: 140, marginHorizontal: '5%', justifyContent: 'center', alignItems: 'center', marginVertical: 10,elevation:5,backgroundColor:'#fff', borderRadius: 15,overflow:'hidden' }}>
    <View style={{width:140,height:140,justifyContent:'center',alignItems:'center',backgroundColor:'#fff', overflow: 'hidden'}}>
        <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', }}>
        <Image source={{uri:item.icon}} style={{width:'40%',height:'40%',resizeMode:'contain'}} />

        </View>
        <View style={{ width: '100%', height: '100%', justifyContent: 'flex-end', alignItems: 'center', position: 'absolute', paddingBottom: 10 }}>
            {/* <Text style={[texts.SUBHEADING_TEXT]}>{item.name}</Text> */}
            <PowerTranslator style={texts.SUBHEADING_TEXT} text={item.name} />

        </View>
    </View>

</TouchableOpacity>
  )
  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor:'#fff' }}>
        <Header style={{ backgroundColor: '#fff', elevation: 0 }}>
          <View style={styless.headerStyle}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: '100%', height: '100%' }}>

              <View style={{ width: '90%', height: '100%', justifyContent: 'center' }}>
                <PowerTranslator style={texts.HEADING_TEXT} text='Please Select Category' />
              </View>

            </View>
          </View>
        </Header>
        <ScrollView>
          <View style={{ flex: 1, backgroundColor: '#fff', alignItems: 'center' }}>

            <View style={{ width: '95%', backgroundColor: '#fff', overflow: 'hidden', marginVertical: '0%', borderRadius: 10, }}>

              <FlatList
                data={this.state.category_Data}
                renderItem={this.renderItem}
                keyExtractor={(item) => item.id}
                numColumns={2}
              />
            </View>

          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}
export default MyAdds

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
  icn_style: { width: 24, height: 25, resizeMode: 'contain', tintColor: colors.TEXT_COLOR }
})