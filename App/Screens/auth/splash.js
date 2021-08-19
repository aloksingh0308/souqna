import React, { Component } from 'react'
import { SafeAreaView, Image } from 'react-native'
// import { LogoIcons } from '../../Components/logo'
import AsyncStorage from '@react-native-community/async-storage';
import { colors } from '../../Components/colors';
class SplashScreen extends Component {
    async componentDidMount() {
        try {
            const token = await AsyncStorage.getItem('token');
            if (token !== null) {
                setTimeout(() => {
                    // this.props.navigation.replace('LoginScreen')
                    this.props.navigation.navigate('DrawerNav', { screen: 'Home' })
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
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor:colors.TEXT_COLOR, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../../Assets/splash_screen.png')} style={{ width: 400, height: 400, resizeMode: 'contain' }} />
            </SafeAreaView>
        )
    }
}
export default SplashScreen