import React, { Component } from 'react'
import { AppRegistry, TouchableOpacity, View ,Text} from 'react-native'
import WS from 'react-native-websocket'
import AsyncStorage from '@react-native-community/async-storage';
export default class Example extends Component {
    constructor(props){
        super(props)
        this.state={
            token:""
        }
        this.socket = new WebSocket(`ws://3.23.128.206/ws/chat/?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTYzMDc0NjUzNiwianRpIjoiNDQzMmJiYzIzYWVmNDg3Mjk1ODhiZTY4Yzg4NjRiNTIiLCJ1c2VyX2lkIjo1fQ.xE-WzEqXWfocXpEZy-L_Z9OsQ5WjmizlWopUA7PiOC8&user=1`);
    this.socket.onopen = () => {
      console.log('connected')
    }; 
    this.emit = this.emit.bind(this);

    }
    // eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTYzMDc0NjUzNiwianRpIjoiNDQzMmJiYzIzYWVmNDg3Mjk1ODhiZTY4Yzg4NjRiNTIiLCJ1c2VyX2lkIjo1fQ.xE-WzEqXWfocXpEZy-L_Z9OsQ5WjmizlWopUA7PiOC8

    async componentDidMount(){
        
        try {
            const token = await AsyncStorage.getItem('token');
            if (token !== null) {
                this.setState({token:token})
                //  this.socket = new WebSocket(`ws://3.23.128.206/ws/chat/?token=${token}&user=1`);
                // console.log('socket=====',token)
            }

        } catch (error) {
            console.log(error);
            // Error retrieving data
        }
    }

    emit() {
        this.socket.send(JSON.stringify({
                "action":"MESSAGE_SEND",
                "text":"hello i'm here"
              }))
       console.log('send')      
      }
 
  render () {
      const {token}= this.state
    return (
      <View style={{flex: 1}}>
        {/* <WS
          ref={ref => {this.ws = ref}}
          url={`ws://3.23.128.206/ws/chat/?token=${token}&user=1`}
          onOpen={() => {
            console.log('Open!')
            this.ws.send('Hello')
          }}
          onMessage={console.log}
          onError={console.log}
          onClose={console.log}
          reconnect // Will try to reconnect onClose
        /> */}
        <TouchableOpacity onPress={()=>this.emit()} >
            <Text>click to send</Text>
        </TouchableOpacity>
      </View>
    )
  }
}