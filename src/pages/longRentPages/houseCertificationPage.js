import React from 'react'
import { 
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Platform,
  ScrollView
 } from 'react-native'
 import { List} from 'antd-mobile'
 import ImagePicker from 'react-native-image-picker'
 import { connect } from 'react-redux'
 import { imgUpload } from '../../reducers/longRent.redux'

 const Item = List.Item
 const directionStyles = [
  [
    {
      label: '是',
      value: '1',
    },
    {
      label: '否',
      value: '2',
    }
  ]
]

@connect(
  state=>({longRent: state.longRent}),
  {
    imgUpload
  }
)
 class HouseCertificationPage extends React.Component {
  static navigationOptions = ({navigation,screenProps}) => ({   
    title :'资质证明',
    headerRight: (  
        <TouchableOpacity onPress={()=>navigation.state.params.submit()}>
          <View style={{flexDirection:'row',alignItems:'center',marginRight:10}}>
            <Image style={{tintColor:'#ffb354'}} source={require('../../assets/images/next_icon.png')}></Image>
            <Text style={{color:'#ffb354'}}>下一步</Text>
          </View>
        </TouchableOpacity>
    ),  
   })
   constructor(props) {
     super(props)
     this.state = {
      certificateX: props.longRent.houseCertificationInfo.certificateX,
      rentalAptitudeX: props.longRent.houseCertificationInfo.rentalAptitudeX,
      fireAptitudeX: props.longRent.houseCertificationInfo.fireAptitudeX,
      recordAptitudeX: props.longRent.houseCertificationInfo.recordAptitudeX,
     }
     this.selectImage = this.selectImage.bind(this)
     this.onSubmit = this.onSubmit.bind(this)
   }
   componentDidMount() {
     this.props.navigation.setParams({submit:this.onSubmit})
   }
   componentWillReceiveProps(nextProps) {
     this.setState({
       certificateX: nextProps.longRent.houseCertificationInfo.certificateX,
       rentalAptitudeX: nextProps.longRent.houseCertificationInfo.rentalAptitudeX,
       fireAptitudeX: nextProps.longRent.houseCertificationInfo.fireAptitudeX,
       recordAptitudeX: nextProps.longRent.houseCertificationInfo.recordAptitudeX,
     })
   }
   onSubmit() {
    this.props.navigation.navigate('JoinHouseMes')
   }
   selectImage(fileName,parentTag) {
    var options = {
      title: '添加图片',
      cancelButtonTitle: '取消',
      takePhotoButtonTitle:'拍照',
      chooseFromLibraryButtonTitle:'选择相册',
      quality:0.75,
      allowsEditing: true,
      storageOptions: {
        skipBackup: true,
        path: 'images'
      },
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
        this.props.imgUpload(source.uri,fileName,parentTag)
      }
    });
   }
   render() {
     console.log(this.props.longRent)
     return (
       <ScrollView>
          <List>
          <Item>
            <Text>房产证</Text>
            <Text style={[styles.brefText,{marginTop:6}]}>房产证要看到产权人的姓名</Text>
            <TouchableOpacity style={{width:'50%'}} onPress={()=>this.selectImage('certificateX','houseCertificationInfo')}>
              {
                this.state.certificateX?
                <Image source={{uri: this.state.certificateX,width:50,height:50}} style={{marginTop:10}}></Image>
                :
                <View style={[styles.rect,{marginTop:13,width:50,height:50}]}>
                  <Image source={require('../../assets/images/plus_s_icon.png')}></Image>
                  <Text style={{marginTop:2,color:'#b3b3b3'}}>添加</Text>
                </View>
              }           
            </TouchableOpacity>
          </Item>

          <Item>
            <Text>出租资质</Text>
            <Text style={[styles.brefText,{marginTop:6}]}>需要上传出租的资质</Text>
            <TouchableOpacity style={{width:'50%'}}  onPress={()=>this.selectImage('rentalAptitudeX','houseCertificationInfo')}>
              {
                this.state.rentalAptitudeX?
                <Image source={{uri: this.state.rentalAptitudeX,width:50,height:50}} style={{marginTop:10}}></Image>
                :
                <View style={[styles.rect,{marginTop:13,width:50,height:50}]}>
                  <Image source={require('../../assets/images/plus_s_icon.png')}></Image>
                  <Text style={{marginTop:2,color:'#b3b3b3'}}>添加</Text>
                </View>
              }
            </TouchableOpacity>
          </Item>

          <Item>
            <Text>消防资质</Text>
            <Text style={[styles.brefText,{marginTop:6}]}>需要上传房源的消防资质</Text>
            <TouchableOpacity style={{width:'50%'}}  onPress={()=>this.selectImage('fireAptitudeX','houseCertificationInfo')}>
              {
                this.state.fireAptitudeX?
                <Image source={{uri: this.state.fireAptitudeX,width:50,height:50}} style={{marginTop:10}}></Image>
                :
                <View style={[styles.rect,{marginTop:13,width:50,height:50}]}>
                  <Image source={require('../../assets/images/plus_s_icon.png')}></Image>
                  <Text style={{marginTop:2,color:'#b3b3b3'}}>添加</Text>
                </View>
              }
            </TouchableOpacity>
          </Item>

          <Item>
            <Text>备案资质</Text>
            <Text style={[styles.brefText,{marginTop:6}]}>需要上传房源在公安局的备案资质</Text>
            <TouchableOpacity style={{width:'50%'}}  onPress={()=>this.selectImage('recordAptitudeX','houseCertificationInfo')}>
              {
                this.state.recordAptitudeX?
                <Image source={{uri: this.state.recordAptitudeX,width:50,height:50}} style={{marginTop:10}}></Image>
                :
                <View style={[styles.rect,{marginTop:13,width:50,height:50}]}>
                  <Image source={require('../../assets/images/plus_s_icon.png')}></Image>
                  <Text style={{marginTop:2,color:'#b3b3b3'}}>添加</Text>
                </View>
              }
            </TouchableOpacity>
          </Item>
          </List>

       </ScrollView>
     )
   }
 }
 const styles = StyleSheet.create({
   flex_row_between:{
     flexDirection:'row',
     justifyContent: 'space-between',
     alignItems:'center'
   },
   rect:{
    width: 40,
    height:40,
    borderWidth:1,
    borderColor:'#d8d8d8',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: '#f6f6f6'
  },
   brefText:{
     fontSize:10,
     color:'#808080'
   }
 })

 export default HouseCertificationPage