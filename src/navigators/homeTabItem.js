import React from 'react'
import { 
  View,
  Text,
  Image
 } from 'react-native'

 class HomeTabItem extends React.Component {
   state = {  }
   render() {

     return (
       <View> 
         {
           this.props.focused?<Image source={require('../assets/images/home-select.png')} />
           :
           <Image source={require('../assets/images/home.png')} />
         }

       </View>
     )
   }
 }
 
 export default HomeTabItem