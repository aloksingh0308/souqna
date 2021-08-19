import React, { Component } from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image, StatusBar } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { Button } from '../Components/button'
import { colors } from '../Components/colors'
import { texts } from '../Components/textfile'
import { Header } from 'native-base'
import AsyncStorage from '@react-native-community/async-storage';
const listData = [
  {
    id: 1,
    title: 'My Ads',
    link: 'ProfileSetting'
  },
  {
    id: 2,
    title: 'Profile Setting',
    link: 'ProfileSetting'
  },
  {
    id: 3,
    title: 'Terms & Conditions',
    link: 'ProfileSetting'
  },
  {
    id: 4,
    title: 'About Us',
    link: 'ProfileSetting'
  },
]

class Profile extends Component {

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
      <Text style={[texts.NORMAL_TEXT, { width: '80%', color: colors.TEXT_COLOR, fontSize: 14 }]}>{item.title}</Text>
    </TouchableOpacity>
  )
  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <Header style={{ backgroundColor: '#fff', elevation: 0 }}>
          <View style={styles.headerStyle}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: '100%', height: '100%' }}>

              <View style={{ width: '90%', height: '100%', justifyContent: 'center' }}>
                <Text style={texts.HEADING_TEXT}>Profile</Text>
              </View>

            </View>
          </View>
        </Header>
        <StatusBar backgroundColor={colors.TEXT_COLOR} />
        <View style={{ flex: 0.7, alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ width: 80, height: 80, borderRadius: 80 / 2, elevation: 1, backgroundColor: colors.TEXT_COLOR,overFlow:'hidden' }}>
            <Image source={require('../Assets/logo_small.png')} style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
          </View>
          <Text style={texts.SUBHEADING_TEXT}>ALok SIngh</Text>
          <Text style={texts.NORMAL_TEXT}>abc@gmail.com</Text>
        </View>
        <View style={{ flex: 1.3, }}>
          <FlatList
            data={listData}
            keyExtractor={(item) => item.id}
            renderItem={this.renderList}
            ListFooterComponent={() => {
              return (
                <TouchableOpacity style={{ marginTop: '5%' }}>
                  <Text style={{ paddingHorizontal: '5%', color: 'red' }}>Deactivate My account</Text>
                </TouchableOpacity>
              )
            }}
          />
        </View>
        <View style={{ flex: 0.3, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity onPress={()=>this.logout()}
          style={{ width: '60%', backgroundColor: colors.TEXT_COLOR, alignItems: 'center', borderRadius: 10 }}>
            <Text style={{ paddingVertical: '5%', color: '#fff' }}>Logout</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
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
    justifyContent: 'space-around',
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