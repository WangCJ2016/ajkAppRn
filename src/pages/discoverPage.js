import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import Calendar from 'react-native-whc-calendar'

 class DiscoverPage extends React.Component {
   state = {
    numbers: [1,2,4],
    obj:{a:1}
   }
   handleClick() {
     const obj = this.state.obj
     obj.b=2
     this.setState({
      obj: obj
     })
   }
    render() {
      return (
        <View style={styles.container}>
            <Calendar
             months={6}
             selectedColor='#ffb354'
             highlightColor='#ffb354'
            
              />
        </View>
      );
      }
 }
 const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
  
});
 export default DiscoverPage
