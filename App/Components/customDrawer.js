import React, { Component } from 'react'
import { Text, FlatList, SafeAreaView, View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { colors } from './colors'
import { PowerTranslator, ProviderTypes, TranslatorConfiguration, TranslatorFactory } from 'react-native-power-translator';
import AsyncStorage from '@react-native-community/async-storage';
import { getUser } from './api_link';
import { texts } from './textfile';
// TranslatorConfiguration.setConfig(ProviderTypes.Google, 'AIzaSyBY54m5k1-VQeAl3nw95pX79fnHp8_CqLg','en','en');
// const translator = TranslatorFactory.createTranslator();

const DrawerData = [
    {
        id: 1,
        name: 'Profile',
        link: 'Profile'
    },
    {
        id: 2,
        name: 'Category',
        link: 'Category'
    },
    {
        id: 4,
        name: 'Language',
        link: 'Select_Language_Screen'
    },
    {
        id: 5,
        name: 'Customer Support',
        link: ''
    }
]

class CustomDrawer extends Component {
    constructor(props){
        super(props)
        this.state={
            user_data:{}
        }
    }
async componentDidMount(){
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
                // console.log( data.user)
                this.setState({ user_data: data.user })
            })
          
        }
  
    } catch (error) {
        console.log(error);
        // Error retrieving data
    }
}
    renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.item_container}
                onPress={() => this.props.navigation.navigate(item.link)}
            >
                {/* <Text style={styles.item_text}>{item.name}</Text> */}
                <PowerTranslator style={styles.item_text} text={item.name} />
            </TouchableOpacity>
        )
    }
    render() {
        const {user_data} = this.state
        console.log(this.state.user_data.fullname,'===')
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: colors.TEXT_COLOR }}>
                <View style={{ flex: 0.6, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.prfl_pic}>
                       {user_data.pic==null?(
                        <Image source={require('../Assets/logo_small.png')} style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
                       ):(
                        <Image source={{uri:user_data.pic}} style={{ width: '100%', height: '100%', resizeMode: 'cover' }} />
                       )}
                    </View>
                    <PowerTranslator style={{...texts.SUBHEADING_TEXT,color:'#fff'}} text={user_data.fullname} />
                    <Text style={{...texts.NORMAL_TEXT,color:'#fff'}}>{user_data.email}</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={DrawerData}
                        keyExtractor={(item) => item.id}
                        renderItem={this.renderItem}
                    />
                </View>
                <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={styles.logo}>
                        <Image source={require('../Assets/logo_small.png')} style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
                    </View>
                    <PowerTranslator style={{ fontSize: 10, color: '#fff', paddingVertical: '5%' }} text={'Copyright by Souqna Inc.'} />
                </View>
            </SafeAreaView>
        )
    }
}

export default CustomDrawer

const styles = StyleSheet.create({
    item_container: {
        backgroundColor: colors.PRIMARY_COLOR,
        marginVertical: 5,
        borderBottomRightRadius: 20,
        borderTopRightRadius: 20,
        width: '80%'
    },
    item_text: {
        paddingVertical: '5%',
        paddingHorizontal: '10%',
        color: colors.TEXT_COLOR
    },
    prfl_pic: {
        height: 100,
        width: 100,
        borderRadius: 100 / 2,
        overflow:'hidden',
        backgroundColor: colors.TEXT_COLOR
    },
        logo: {
            height: 60,
            width: 60,
            borderRadius: 60 / 2,
            backgroundColor: colors.TEXT_COLOR
        }
})