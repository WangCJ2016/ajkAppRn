import React from 'react'
import { 
  View,
  Text,
  Image,
  TouchableOpacity,
  LayoutAnimation
 } from 'react-native'
 import { connect }  from 'react-redux'
 import { Popover, NavBar,Icon } from 'antd-mobile'
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

render() {
  return (
    <View style={{flex:1,justifyContent:'center'}}>
 
      <Popover mask
       
        overlay={[
          (<Item key="4" value="scan"  data-seed="logId"><Text>扫一扫</Text></Item>),
          (<Item key="5" value="special"><Text>我的二维码</Text></Item>),

        ]}
        popupAlign={{
          overflow: { adjustY: 0, adjustX: 0 },
          offset: [-26, 15],
        }}
      >
        <View style={{
          height: 10,
          marginTop:100,
          alignItems: 'center',
        }}
        >
         <Text>dfsdfs</Text>
        </View>
      </Popover>
   
      
  
    </View>
  );
}
 }
 
 export default DiscoverPage
