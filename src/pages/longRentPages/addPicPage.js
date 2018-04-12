import React from 'react'
import { 
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Platform,
  Dimensions
 } from 'react-native'
 import { Button } from 'antd-mobile'
 import ImagePicker from 'react-native-image-picker'
 import { connect } from 'react-redux'
 import { imgUpload,delPic,dataSuccess } from '../../reducers/longRent.redux'
 

 const {width} = Dimensions.get('window')

 @connect(
  state=>({longRent: state.longRent}),
  {
    delPic,imgUpload,dataSuccess
  }
)
 class AddPicPage extends React.Component {
  static navigationOptions = ({navigation,screenProps}) => ({  
    headerTitle:'添加照片',
   })
   constructor(props) {
     super(props)
    
     this.selectImage = this.selectImage.bind(this)
     this.del = this.del.bind(this)
   }
   
   selectImage(fileName) {
   
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
        this.props.imgUpload(source.uri,fileName,'rentHouseInfo')
      }
    });
   }
   del(pic) {
     this.props.delPic(pic)
   }
   render() {
     const pictures = this.props.longRent.rentHouseInfo.pictures.split(',').filter(v=>v!=='')
     return (
       <View style={{flex:1}} >
           {pictures.length>0?
            <ScrollView style={{flex:1,padding:15}}>
                   <View>
                     <Image source={{uri:pictures[0],width:width-30,height:150}}></Image>
                     <TouchableOpacity onPress={()=>this.del(pictures[0])} style={{position:'absolute',right:-10,top:-10}}>
                      <Image  source={require('../../assets/images/x_icon.png')}></Image>
                     </TouchableOpacity>
                   </View> 
                   <View style={{flexDirection:'row',justifyContent:'space-between',flexWrap:'wrap'}}>
                    {pictures.map((pic,index) => {
                        if(index===0) {
                          return
                        }
                      return <View key={pic} style={{marginTop:10}}>
                        <Image  source={{uri:pic,width:(width-40)/2,height:100}}></Image>
                        <TouchableOpacity onPress={()=>this.del(pic)} style={{position:'absolute',right:-10,top:-10}}>
                          <Image  source={require('../../assets/images/x_icon.png')}></Image>
                        </TouchableOpacity>
                      </View> 
                      }
                      )}
                   </View>
            </ScrollView>:
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Image source={require('../../assets/images/pic.png')}></Image>
                <Text style={{marginTop:40,fontSize:15,color:'#2496d8'}}>快去上传你的房源吧</Text>
            </View>
          }
           <View style={{padding:10,backgroundColor:'#fff'}}>
             <Button type='primary' onClick={this.selectImage.bind(this,'picture')}>添加照片</Button>
           </View>
       </View>
     )
   }
 }
 
 export default AddPicPage