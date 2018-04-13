import React from 'react'
import { View,Linking } from 'react-native'
import ActionSheet from 'react-native-actionsheet'

const CANCEL_INDEX = 0
const title = '选择地图类型'

const NavigateToMapHoc = (WrappedCom) => {
  return class newCom extends React.Component {
    constructor() {
      super()
      this.state = {
        actionSheetHandle:'',
        options:['取消']
      }
      this.mapNavigation = this.mapNavigation.bind(this)
    }
    componentDidMount() {
      this.setState({
        actionSheetHandle: this.ActionSheet
      })
      Linking.canOpenURL('iosamap://')
      .then(res=>{
        if(res) {
          this.setState({options:[...this.state.options,'高德地图']})
        }
      })
      Linking.canOpenURL('baidumap://')
      .then(res=>{
         if(res) {
          this.setState({options:[...this.state.options,'百度地图']})
         }
        })
      Linking.canOpenURL('maps.apple')
      .then(res=>{
        if(res) {
         this.setState({options:[...this.state.options,'苹果地图']})
        }
       })
    }
    mapNavigation(e,name) {
      console.log(e)
    }
    render() {
     
      return (
        <View style={{flex:1}}>
          <WrappedCom actionSheetHandle={this.state.actionSheetHandle} {...this.props}></WrappedCom>
          <ActionSheet
            ref={o => this.ActionSheet = o}
            title={title}
            options={this.state.options}
            cancelButtonIndex={CANCEL_INDEX}  
            onPress={this.mapNavigation}
          />
        </View>
      )
    }
  }
}

export default NavigateToMapHoc