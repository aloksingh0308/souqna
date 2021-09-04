import React, { Component } from 'react'
import { View, Image, Text, TouchableOpacity, ScrollView ,FlatList} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import { texts } from '../Components/textfile';
import { colors } from '../Components/colors';

const data=[
  // { shortName: 'hi', longName: 'Hindi' },
  { shortName: 'en', longName: 'English' },
  { shortName: 'fr', longName: 'French' },
  { shortName: 'ar', longName: 'Arabic' },
];

export default class Select_Language_Screen extends Component {

  renderItem=({item})=>(
    <TouchableOpacity style={{width:'90%',paddingVertical:'4%',backgroundColor:colors.PRIMARY_COLOR,marginVertical:5,justifyContent:'center',alignItems:'center',borderRadius:20,alignSelf:'center'}}
     onPress={()=>this.setLanguage(item.shortName)} >
      <Text style={{...texts.SUBHEADING_TEXT}} >{item.longName}</Text>
    </TouchableOpacity>
  )

  setLanguage=async(lng)=>{
    try {
      await AsyncStorage.setItem(
          'lng',
          lng
      );
  } catch (error) {
      // Error saving data
  }
  try {
            const token = await AsyncStorage.getItem('token');
            if (token !== null) {
                setTimeout(() => {
                  this.props.navigation.navigate('DrawerNav',{screen:'Home'})
                    // this.props.navigation.replace('LoginScreen')
                    // this.props.navigation.replace('Select_Language_Screen')
                }, 1000)
            } else {
                setTimeout(() => {
                    this.props.navigation.replace('LoginScreen')
                    // this.props.navigation.navigate('DrawerNav',{screen:'Home'})
                }, 1000)
            }

        } catch (error) {
            console.log(error);
            // Error retrieving data
        }
  // setTimeout(()=>{
  //   this.props.navigation.replace('DrawerNav', { screen: 'Home' })
  // })
  }
 
  render() {
    return (
      <View >
        <Text style={{...texts.HEADING_TEXT,marginVertical:'5%',paddingHorizontal:'5%'}}>Select Language</Text>
        <FlatList
        data={data}
        renderItem={this.renderItem}
        keyExtractor={(item,index)=>index}
        />
      </View>
    );
  }
}