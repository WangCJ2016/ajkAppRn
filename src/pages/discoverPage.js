import React from 'react'
import { 
  View,
  Text,
  Image,
  TouchableOpacity,
  LayoutAnimation,
  StyleSheet,
  Linking
 } from 'react-native'
 import { connect }  from 'react-redux'
 import { Popover, NavBar,Icon } from 'antd-mobile'
 import ActionButton from 'react-native-action-button'
 const Item = Popover.Item
 class DiscoverPage extends React.Component {
 
constructor(props) {
   super(props);
   this.state = {//设置初值
    visible: true,
    selected: '',
   };
 }
_textUp(){
  LayoutAnimation.spring();
  this.setState({marginBottom:this.state.marginBottom + 100})
  
}
componentDidMount() {
  Linking.canOpenURL('maps.apple')
  .then(res=>alert(res))
}
render() {
  return (
    <View style={{flex:1,justifyContent:'center'}}>
      <ActionButton buttonColor="rgba(231,76,60,1)">
        <ActionButton.Item buttonColor='#9b59b6' title="New Task" onPress={() =>{
          Linking.openURL('maps.apple/')
          .catch(e => console.log(e))
        }}>
          <Text>fd</Text>
        </ActionButton.Item>
        <ActionButton.Item buttonColor='#3498db' title="Notifications" onPress={() => {}}>
        <Text>fd</Text>
        </ActionButton.Item>
        <ActionButton.Item buttonColor='#1abc9c' title="All Tasks" onPress={() => {}}>
        <Text>fd</Text>
        </ActionButton.Item>
      </ActionButton>
    </View>
  );
}
 }
 const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});
 export default DiscoverPage
