import { Header } from 'native-base'
import React, { Component } from 'react'
import { SafeAreaView, View, Image, Text, ScrollView } from 'react-native'
// import { ScrollView } from 'react-native-gesture-handler'
import { colors } from '../Components/colors'
import { texts } from '../Components/textfile'
// import { SafeAreaView } from 'react-native-safe-area-context'

class AboutUs extends Component {
    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                <Header />

                <View style={{ width: '95%', height: '35%', backgroundColor: colors.TEXT_COLOR, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={require('../Assets/splash_screen.png')} style={{ width: '110%', height: '110%', resizeMode: 'contain' }} />
                </View>

                <View style={{ width: '95%', alignItems: 'center', alignSelf: 'center' }}>
                    <ScrollView>
                        <Text style={[texts.NORMAL_TEXT, { textAlign: 'justify' }]}>Souqna is one of the application specialized in classified ads that allows its users to search easily for their requirements or offer them for sale.</Text>
                        <Text style={[texts.NORMAL_TEXT, { textAlign: 'justify' }]}>There is a list of electronics that opens the ways for the user to find many offers for buying and selling of all electronic devices, equipment such as printers, televisions, computers, mobile devices, video games and much more.</Text>
                        <Text style={[texts.NORMAL_TEXT, { textAlign: 'justify' }]}>The browser can also review the fashion list specialized in fashion, accessories and children's supplies, as well as perfumes, cosmetics, and many more options.  It can also finds the home list that shows them all available advertisements about home furniture and requirements of electrical equipment and special accessories.</Text>
                        <Text style={[texts.NORMAL_TEXT, { textAlign: 'justify' }]}>Then the researcher finds a list for sale, which gives the opportunity to find or advertise devices, books, phone numbers, or anything for sale.  And then it moves to the list of services through which our market site seeks to facilitate the search for home and medical services electrical, technical and other services that are very popular.</Text>
                        <Text style={[texts.NORMAL_TEXT, { textAlign: 'justify' }]}>Then comes a list of cars and vehicles, which is the first destination for those looking to offer their cars for sale or to buy a car, whether new or used.  The real estate lists serves to many of those looking to rent, buy, or even offer any property for sale.</Text>
                        <Text style={[texts.NORMAL_TEXT, { textAlign: 'justify' }]}>Also, the application - souqna - displays giant portals for major companies with distinctive pages within the application to facilitate the process of direct orders from companies and display job opportunities available .</Text>
                        <Text style={[texts.NORMAL_TEXT, { textAlign: 'justify' }]}>All this you can find on the app - souqna - for advertising and marketing services .</Text>
                    </ScrollView>
                </View>



            </SafeAreaView>
        )
    }
}

export default AboutUs