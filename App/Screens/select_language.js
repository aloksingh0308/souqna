import React, { Component } from 'react'
import { View, Image, Text, TouchableOpacity, ScrollView } from 'react-native'

class Select_Language_Screen extends Component {

  static navigationOptions =
    {
      title: 'Select_Language_Screen',
      header: null
    };

  constructor(props) {
    super(props);
    this.lang = [
      { shortName: 'hi', longName: 'Hindi' },
      { shortName: 'en', longName: 'English' },
      { shortName: 'fr', longName: 'French' },
      { shortName: 'sp', longName: 'Spanish' },
    ];
  }

  navigate_To_Next_Activity(item) {

    All_Language_Strings.setLanguage(item);

    this.props.navigation.navigate('Second', { Language_Code: item });

  }
  render() {
    return (
      <View style={styles.MainContainer}>

        <Text style={styles.heading}>
          Please Select Your Language
        </Text>

        <Image
          source={{ uri: 'https://reactnativecode.com/wp-content/uploads/2019/06/language_icon.png' }}
          style={styles.imageStyle}
        />

        <ScrollView style={{ marginTop: 30, width: '80%' }}>
          {
            this.lang.map((item, key) => (

              <TouchableOpacity key={key} onPress={this.navigate_To_Next_Activity.bind(this, item.shortName)}>

                <Text style={styles.text} >{item.longName} </Text>

                <View style={{ width: '100%', height: 1, backgroundColor: '#000' }} />

              </TouchableOpacity>

            ))
          }
        </ScrollView>

      </View>
    );
  }
}