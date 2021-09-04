import * as React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
//import from components
import { Icons } from '../Components/images'
import { colors } from '../Components/colors'


import { PowerTranslator, ProviderTypes, TranslatorConfiguration, TranslatorFactory } from 'react-native-power-translator';

TranslatorConfiguration.setConfig(ProviderTypes.Google, 'AIzaSyBY54m5k1-VQeAl3nw95pX79fnHp8_CqLg','ar','en');
const translator = TranslatorFactory.createTranslator();

//import all screens
import Home from '../Screens/home';
import ChatScreen from '../Screens/chat';
import Add from '../Screens/myadd';
import SellScreen from '../Screens/sell';
import Profile from '../Screens/profile';
import CustomDrawer from '../Components/customDrawer';
import Notifications from '../Screens/notifications';
import SplashScreen from '../Screens/auth/splash';
import LoginScreen from '../Screens/auth/login';
import Chat from '../Screens/chat_screen';
import ProductList from '../Screens/product_list';
import Company_Detalis from '../Screens/compony_details'
import Category from '../Screens/categories';
import Ads from '../Screens/ads/ad';
import CarAds from '../Screens/ads/car_ad';
import CompanyAd from '../Screens/ads/company_ads';
import SignUp from '../Screens/auth/sign-up';
import VerifyOtp from '../Screens/auth/otp_verification';
import ProfileSetting from '../Screens/profile_setting';
import Terms_Conditions from '../Screens/terms_conditions';
import {
    HomeIcons,
    ChatIcons,
    FavIcons,
    UserIcons,
    SellIcons
} from '../Components/menu_icons';
import CarDetails from '../Screens/car_details';
import ProductDetails from '../Screens/product_details';
import Sucess from '../Screens/success';
import AboutUs from '../Screens/about';
import Select_Language_Screen from '../Screens/select_language';
// import Register from '../Screens/registration';
//initialize navigations 
const BottomTab = createBottomTabNavigator()
const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

const DrawerNavigation = () => {
    return (
        <Drawer.Navigator
            drawerType="front"
            // initialRouteName="Main"
            drawerContent={(props) => <CustomDrawer {...props} />}>
            <Drawer.Screen name='BottomTab' component={BottomNavigation} />
        </Drawer.Navigator>
    )
}

const BottomNavigation = () => {
    return (
        <BottomTab.Navigator
            initialRouteName='Home'
            tabBarOptions={{
                activeTintColor: colors.PRIMARY_COLOR,
                inactiveTintColor: colors.SECONDARY_COLOR,
                showLabel: false,
                style: {
                    // position: 'absolute',
                    width: '97%',
                    bottom: 2,
                    left: 5,
                    right: 5,
                    elevation: 2,
                    backgroundColor: colors.TEXT_COLOR,
                    
                    borderRadius: 25,
                    height: 58,
                    paddingVertical: 5
                }
            }}
        >
            <BottomTab.Screen
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => (
                        <>
                            <HomeIcons color={color} />
                            {/* <Text style={{ fontSize: 10, color: color }}>Home</Text> */}
                            <PowerTranslator style={{ fontSize: 10, color: color }} text='Home' />
                        </>
                    )
                }}
                name="Home" component={Home} />
            <BottomTab.Screen
                options={{
                    tabBarLabel: 'Chat',
                    tabBarIcon: ({ color }) => (
                        <>
                            <ChatIcons color={color} />
                            {/* <Text style={{ fontSize: 10, color: color }}>Chat</Text> */}
                            <PowerTranslator style={{ fontSize: 10, color: color }} text='Chat' />
                        </>
                    )
                }}
                name="ChatScreen" component={ChatScreen} />
            <BottomTab.Screen
                options={{
                    tabBarLabel: 'Sell',
                    tabBarIcon: ({ color }) => (
                        <>
                            <SellIcons color={color} />
                            {/* <Text style={{ fontSize: 10, color: color }}>Sell</Text> */}
                            <PowerTranslator style={{ fontSize: 10, color: color }} text='Sell' />
                        </>
                    )
                }}
                name="Add" component={Add} />
            <BottomTab.Screen
                options={{
                    tabBarLabel: 'My Ads',
                    tabBarIcon: ({ color }) => (
                        <>
                            <FavIcons color={color} />
                            {/* <Text style={{ fontSize: 10, color: color }}>My Ads</Text> */}
                            <PowerTranslator style={{ fontSize: 10, color: color }} text='My Ads' />
                        </>
                    )
                }}
                name="SellScreen" component={SellScreen} />
            <BottomTab.Screen
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color }) => (
                        <>
                            <UserIcons color={color} />
                            {/* <Text style={{ fontSize: 10, color: color }}>My Ads</Text> */}
                            <PowerTranslator style={{ fontSize: 10, color: color }} text='Profile' />
                        </>
                    )
                }}
                name="Profile" component={Profile} />
        </BottomTab.Navigator>
    )
}


export default function Navigation() {
    return (
        <NavigationContainer
        >
            <Stack.Navigator

                screenOptions={{

                    headerShown: false,
                    // cardStyleInterpolator: ({ index, current, next, layouts: { screen } }) => {
                    //     const translateX = current.progress.interpolate({
                    //         inputRange: [index - 1, index, index + 1],
                    //         outputRange: [screen.width, 0, 0],
                    //     });

                    //     const opacity = next?.progress.interpolate({
                    //         inputRange: [0, 1, 2],
                    //         outputRange: [1, 0, 0],
                    //     });

                    //     return { cardStyle: { opacity, transform: [{ translateX }] } };
                    // },
                }}
            >
                <Stack.Screen name='SplashScreen' component={SplashScreen} />
                <Stack.Screen name='LoginScreen' component={LoginScreen} />
                <Stack.Screen name='DrawerNav' component={DrawerNavigation} />
                <Stack.Screen name='Notifications' component={Notifications} />
                <Stack.Screen name='Chat' component={Chat} />
                <Stack.Screen name='ProductList' component={ProductList} />
                <Stack.Screen name='Category' component={Category} />
                <Stack.Screen name='Ads' component={Ads} />
                <Stack.Screen name='CarAds' component={CarAds} />
                <Stack.Screen name='CompanyAd' component={CompanyAd} />
                <Stack.Screen name='SignUp' component={SignUp} />
                <Stack.Screen name='VerifyOtp' component={VerifyOtp} />
                <Stack.Screen name='ProfileSetting' component={ProfileSetting} />
                <Stack.Screen name='Company_Details' component={Company_Detalis} />
                <Stack.Screen name='CarDetails' component={CarDetails} />
                <Stack.Screen name='ProductDetails' component={ProductDetails} />
                <Stack.Screen name='Sucess' component={Sucess} />
                <Stack.Screen name='AboutUs' component={AboutUs} />
                <Stack.Screen name='Terms_Conditions' component={Terms_Conditions} />
                <Stack.Screen name='Select_Language_Screen' component={Select_Language_Screen} />
                {/* Terms_Conditions */}
            </Stack.Navigator>
        </NavigationContainer>
    );
}


const styles = StyleSheet.create({
    iconStyles: {
        width: 24,
        height: 24,
        resizeMode: 'contain'
    }
})