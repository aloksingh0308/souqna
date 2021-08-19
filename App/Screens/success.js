import React, { Component } from 'react'
import { SafeAreaView, Image,Text } from 'react-native'
// import { LogoIcons } from '../../Components/logo'
import AsyncStorage from '@react-native-community/async-storage';
import { colors } from '../Components/colors';
import { texts } from '../Components/textfile';
class Sucess extends Component {

    componentDidMount(){
        setTimeout(()=>{
            this.props.navigation.navigate('ProductList')
        },1000)
    }
    
    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor:colors.TEXT_COLOR, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../Assets/check.png')} style={{ width: 100, height: 100, resizeMode: 'contain',tintColor:'#fff' }} />
                <Text style={[texts.SUBHEADING_TEXT,{color:'#fff',paddingTop:'10%'}]}>Your Ad was posted successfully</Text>
            </SafeAreaView>
        )
    }
}
export default Sucess