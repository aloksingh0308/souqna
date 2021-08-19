import React, { Component } from 'react'
import { Text, FlatList, SafeAreaView, View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { colors } from './colors'

const DrawerData = [
    {
        id: 1,
        name: 'Profile',
        link: ''
    },
    {
        id: 2,
        name: 'Category',
        link: 'Category'
    },
    {
        id: 3,
        name: 'Company',
        link: ''
    },
    {
        id: 4,
        name: 'Language',
        link: ''
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
    }

    renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.item_container}
                onPress={() => this.props.navigation.navigate(item.link)}
            >
                <Text style={styles.item_text}>{item.name}</Text>
            </TouchableOpacity>
        )
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: colors.TEXT_COLOR }}>
                <View style={{ flex: 0.6, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.prfl_pic}>
                        <Image source={require('../Assets/logo_small.png')} style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
                    </View>
                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#fff', paddingVertical: '2%' }}>ALok SIngh</Text>
                    <Text style={{ fontSize: 12, color: '#fff' }}>abc@gmail.com</Text>
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
                    <Text style={{ fontSize: 10, color: '#fff', paddingVertical: '5%' }}>Copyright by Souqna Inc.</Text>
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
        color: '#fff'
    },
    prfl_pic: {
        height: 100,
        width: 100,
        borderRadius: 100 / 2,
        backgroundColor: colors.TEXT_COLOR
    },
        logo: {
            height: 60,
            width: 60,
            borderRadius: 60 / 2,
            backgroundColor: colors.TEXT_COLOR
        }
})