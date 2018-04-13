import React from 'react'
import { 
  View,
  Text,
  StyleSheet,
  Platform,
  Alert,
  AsyncStorage
 } from 'react-native'
 import { List,Button } from 'antd-mobile'
 import ViewUtils from '../../utils/viewUtils'
 import ImagePicker from 'react-native-image-picker'
 import {uploadImage,modifyHeadPicture} from '../../reducers/user.redux'
 import { intialStateSuccess as intialStateSuccessLongRent } from '../../reducers/longRent.redux'
 import {initialStateSuccess as intialStateSuccessUser} from '../../reducers/user.redux'
 import { connect } from 'react-redux'


 @connect(
   null,
   {
    uploadImage,modifyHeadPicture,intialStateSuccessLongRent,intialStateSuccessUser
   }
 )
 class UserSettingPage extends React.Component {
   constructor() {
     super()
     this.state = {
       head:''
     }
     this.logout = this.logout.bind(this)
     this.showActionSheet = this.showActionSheet.bind(this)
     this.selectImage = this.selectImage.bind(this)
     this.goPage = this.goPage.bind(this)
   }
   logout() {
     Alert.alert(
      '确认退出账号吗',
      '',
      [
        {text: '取消'},
        {text: '确定', onPress: () => {
          this.props.intialStateSuccessLongRent()
          this.props.intialStateSuccessUser()
          this.props.navigation.navigate('Login'),AsyncStorage.clear()}
        },
      ],
      { cancelable: false }
    )
   }
   showActionSheet() {
      ActionSheetIOS.showActionSheetWithOptions({
        options: BUTTONS,
        cancelButtonIndex: CANCEL_INDEX,
      },
      (buttonIndex) => {
        if(buttonIndex===1) {
          this.selectImagefromLibrary()
        }
      })
    }
   selectImage() {
    var options = {
      title: '选择头像',
      cancelButtonTitle: '取消',
      takePhotoButtonTitle:'拍照',
      chooseFromLibraryButtonTitle:'选择相册',
      quality:0.75,
      allowsEditing: true,
      storageOptions: {
        skipBackup: true,
        path: 'images'
      },
      permissionDenied:{
        title:'修改头像',
        reTryTitle:'重试',
        okTitle:'使用'
      }
    };
    ImagePicker.showImagePicker(options,(response) => {
      if (response.didCancel) {
        return
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton)
      }
      else {
        let source
        if (Platform.OS === 'android') {
            source = {uri: response.uri, isStatic: true}
        } else {
            source = {uri: response.uri.replace('file://', ''), isStatic: true}
        }
        this.props.uploadImage(source.uri,response.fileName,this.props.modifyHeadPicture)
      }
    });
  }
   
  goPage(page) {
     this.props.navigation.navigate(page)
   }
   render() {
     return (
       <View style={{flex:1}}>
            <List>
              {ViewUtils.itemhasArr(require('../../assets/images/ic_qr.png'),'二维码','',20,20)}
            </List>
            
            <List style={{marginTop:10}}>
              {ViewUtils.itemhasArr(require('../../assets/images/ic_user.png'),'身份绑定',()=>this.goPage('Identify'),20,22)}
              {ViewUtils.itemhasArr(require('../../assets/images/ic_head.png'),'头像更换',this.selectImage,22,22)}
            </List>
            <List style={{marginTop:10}}>
              {ViewUtils.itemhasArr(require('../../assets/images/ic_tel.png'),'手机绑定',()=>this.goPage('BindPhone'),14,27)}
              {ViewUtils.itemhasArr(require('../../assets/images/ic_lock.png'),'修改密码',()=>this.goPage('ModifyPsw'),20,23)}
            </List>
            <Button type='primary' onClick={this.logout} style={styles.fixBotton}>退出当前账号</Button>
       </View>
     )
   }
 }
 const styles = StyleSheet.create({
  fixBotton:{
     position: 'absolute',
     bottom:0,
     left:0,
     right:0
   }
 })
 export default UserSettingPage