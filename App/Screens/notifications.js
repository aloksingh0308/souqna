import React, { Component } from 'react'
import { SafeAreaView, Text, StyleSheet, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import { Header } from 'native-base'
// import { SliderBox } from "react-native-image-slider-box";
import { colors } from '../Components/colors'
import { FlatList } from 'react-native-gesture-handler';
import { texts } from '../Components/textfile';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

class Notifications extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isFav: false,
      isMyads: true,
    }
  }
  renderAds = () => {
    return (
      <TouchableOpacity style={{ width: '100%', backgroundColor: '#fff', elevation: 2, marginVertical: '1%', paddingVertical: '2%' }}>
        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-around', }}>
          <View style={{ width: '20%' }}>
            <View style={{ width: 70, height: 70, borderRadius: 10, borderWidth: 1 }}>
              <Image source={require('../Assets/mm.png')} style={{ width: '100%', height: '100%', resizeMode: 'stretch' }} />
            </View>
            <Text style={[texts.NORMAL_TEXT, { paddingVertical: '10%' }]}>06/08/2021</Text>
          </View>
          <View style={{ width: '75%', justifyContent: 'space-around' }}>
            <View>
              <Text style={texts.SUBHEADING_TEXT}>Your Add will be posted shortly</Text>
              <Text style={[texts.NORMAL_TEXT, { textAlign: 'justify', fontSize: 10 }]}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Curabitur cursus tincidunt commodo.</Text>
            </View>
            <Text style={[texts.NORMAL_TEXT, { color: 'red', textAlign: 'right', fontSize: 8 }]}>your ads will expire in 20 days</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }


  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.PRIMARY_COLOR }}>
        <Header style={{ backgroundColor: colors.PRIMARY_COLOR, elevation: 0 }}>
          <View style={styless.headerStyle}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: '100%', height: '100%' }}>
              <View style={{ width: '20%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                  <Image source={require('../Assets/arrow.png')} style={{ width: 24, height: 25, resizeMode: 'contain' }} />
                </TouchableOpacity>
              </View>
              <View style={{ width: '60%', height: '100%' }}></View>
              <View style={{ width: '20%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                {/* <Image source={require('../Assets/bell.png')} style={{ width: 24, height: 25, resizeMode: 'contain' }} /> */}
              </View>
            </View>
          </View>
        </Header>
        {/* <ScrollView contentContainerStyle={{ flex: 1 }}> */}
        <View style={{ flex: 1, backgroundColor: '#fff', borderTopLeftRadius: 40, borderTopRightRadius: 40, elevation: 1, alignItems: 'center' }}>
          <View style={styless.btn_container}>
            <TouchableOpacity
              disabled={this.state.isMyads}
              // onPress={() => this.setState({ isFav: false, isMyads: true })}
              style={[styless.btnStyle, { borderColor: this.state.isMyads ? colors.PRIMARY_COLOR : '#fff' }]}>
              <Text style={styless.btnText}>Notifications</Text>
            </TouchableOpacity>

          </View>
          <View style={{ width: '100%' }}>

            <FlatList
              data={DATA}
              keyExtractor={(item) => item.id}
              renderItem={this.renderAds}
            />

          </View>
        </View>
        {/* </ScrollView> */}
      </SafeAreaView>
    )
  }
}
export default Notifications

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
  btn_container: {
    width: '100%',
    // flexDirection: 'row',
    // justifyContent: 'space-around',
    // alignItems: 'center',
    marginTop: '5%'
  },
  btnStyle: {
    // borderBottomWidth: 2,
    borderColor: colors.PRIMARY_COLOR
  },
  btnText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    padding: '2%'
  }
})