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
      console.log(this.state.obj)
      return (
        <View style={styles.container}>
            <TouchableOpacity onPress={this.handleClick.bind(this)}>
              <Text>buttom</Text>
            </TouchableOpacity>
           
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
