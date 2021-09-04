import { Header } from 'native-base'
import React, { Component } from 'react'
import { SafeAreaView, View, Image, Text, ScrollView,TouchableOpacity } from 'react-native'
// import { ScrollView } from 'react-native-gesture-handler'
import { colors } from '../Components/colors'
import { texts } from '../Components/textfile'
// import { SafeAreaView } from 'react-native-safe-area-context'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PowerTranslator from 'react-native-power-translator'

class Terms_Conditions extends Component {
    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <Header style={{ backgroundColor: '#fff', elevation: 0 }}>
          {/* <View style={styles.headerStyle}> */}
          <View style={{ width: '10%', justifyContent: 'center', alignItems: 'center',paddingLeft:10 }}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Image source={require('../Assets/arrow.png')} style={{width:20,height:20,resizeMode:'contain',tintColor:colors.TEXT_COLOR}} />
                        </TouchableOpacity>
                    </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: '100%', height: '100%' }}>

              <View style={{ width: '90%', height: '100%', justifyContent: 'center' }}>
                <PowerTranslator style={texts.HEADING_TEXT} text='Terms & Conditions' />
              </View>

            </View>
          {/* </View> */}
        </Header>
<ScrollView >
                <View style={{ width: wp('95%'), height:hp('30%'), backgroundColor: colors.TEXT_COLOR, borderRadius: 20, justifyContent: 'center', alignItems: 'center',alignSelf:'center',marginTop:hp('3%') }}>
                    <Image source={require('../Assets/splash_screen.png')} style={{ width: '110%', height: '110%', resizeMode: 'contain' }} />
                </View>

          <View style={{width:wp('95%'),paddingBottom:hp('5%'),alignItems:'center',alignSelf:'center',marginTop:'5%'}}>
  <PowerTranslator style={{...texts.NORMAL_TEXT, textAlign: 'justify',fontSize:14 }} text={`Souqna is one of the application specialized in classified ads that allows its users to search easily for their requirements or offer them for sale.
                        There is a list of electronics that opens the ways for the user to find many offers for buying and selling of all electronic devices, equipment such as printers, televisions, computers, mobile devices, video games and much more.
                        The browser can also review the fashion list specialized in fashion, accessories and children's supplies, as well as perfumes, cosmetics, and many more options.  It can also finds the home list that shows them all available advertisements about home furniture and requirements of electrical equipment and special accessories 
                        Then the researcher finds a list for sale, which gives the opportunity to find or advertise devices, books, phone numbers, or anything for sale.  And then it moves to the list of services through which our market site seeks to facilitate the search for home and medical services electrical, technical and other services that are very popular.
                        Then comes a list of cars and vehicles, which is the first destination for those looking to offer their cars for sale or to buy a car, whether new or used.  The real estate lists serves to many of those looking to rent, buy, or even offer any property for sale.
                        Also, the application - souqna - displays giant portals for major companies with distinctive pages within the application to facilitate the process of direct orders from companies and display job opportunities available .`} />
              
          </View>
                      


                </ScrollView>
            </SafeAreaView>
        )
    }
}

export default Terms_Conditions