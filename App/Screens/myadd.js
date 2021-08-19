import React, { Component } from 'react'
import { SafeAreaView, Text, StyleSheet, View, Image, TouchableOpacity, ScrollView, PermissionsAndroid, TextInput } from 'react-native'
import { Header } from 'native-base'
import { colors } from '../Components/colors'
import { FlatList } from 'react-native-gesture-handler';
import { texts } from '../Components/textfile';
import { categoryData } from '../Components/categoryData';


class MyAdds extends Component {


  selectCategory = (id) => {
    switch (id) {
      case 1:
        return this.props.navigation.navigate('CarAds')
      case 10:
        return this.props.navigation.navigate('CompanyAd')
      default:
        return this.props.navigation.navigate('Ads')
    }
  }


  renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => this.selectCategory(item.id)}
    style={{ width: '40%', height: 130, marginHorizontal: '5%', justifyContent: 'center', alignItems: 'center', marginVertical: 10, }}>
    <View style={{width:140,height:130,justifyContent:'center',alignItems:'center',backgroundColor:'#fff', elevation: 5, borderRadius: 15, overflow: 'hidden'}}>
        <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', }}>
            {item.icon}

        </View>
        <View style={{ width: '100%', height: '100%', justifyContent: 'flex-end', alignItems: 'center', position: 'absolute', paddingBottom: 10 }}>
            <Text style={[texts.SUBHEADING_TEXT]}>{item.name}</Text>

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
                <Text style={texts.HEADING_TEXT}>Please Select Category</Text>
              </View>

            </View>
          </View>
        </Header>
        <ScrollView>
          <View style={{ flex: 1, backgroundColor: '#fff', alignItems: 'center' }}>

            <View style={{ width: '95%', backgroundColor: '#fff', overflow: 'hidden', marginVertical: '0%', borderRadius: 10, }}>

              <FlatList
                data={categoryData}
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