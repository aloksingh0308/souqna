import React, { Component } from 'react'
import { Text, LogBox, StatusBar } from 'react-native'
import { colors } from './App/Components/colors';
import Route from './App/Navigations/route'
import Test from './App/Screens/test'

LogBox.ignoreAllLogs();//Ignore all log notifications
class App extends Component {
  render() {
    return (
      <>
        <StatusBar backgroundColor={colors.TEXT_COLOR} />
        <Route />
      </>
      // <Test />
    )
  }
}
export default App