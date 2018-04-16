import React from 'react'
import { 
  View,
  Text,
  AsyncStorage
 } from 'react-native'
 import Calendar from '../../components/rn-date-picker/Calendar'
 import { connect } from 'react-redux'
 import { roomCalendar,selectDays } from '../../reducers/hotel.redux'
 import InphoneXHoc from '../../hoc/inphoneXhoc'

 @InphoneXHoc
 @connect(
   state => ({hotel: state.hotel}),
   {
    roomCalendar,selectDays
   }
 )
 class RoomDateSelectPage extends React.PureComponent {
   constructor(props) {
     super(props)
     this.state = {
       obj: null
     }
   }
   componentDidMount() {
     let a = new Date()
     let dayArr = []
     a.setDate(15)
     for(let i=0;i<3;i++) {
        a.setMonth(a.getMonth() + 1) 
        dayArr = [...dayArr,a.getFullYear()+ '-' + (a.getMonth()>=10?a.getMonth():'0'+a.getMonth())]
     }
     this.props.roomCalendar({houseId:this.props.navigation.state.params.houseId,month:dayArr.join(',')})
     
    
   }
   onSelectionChange(value, prevValue, selectedRange) {
       const propsSelectDaysObj = this.props.hotel.selectDaysObj
       if(!selectedRange.selectTo) return
       if(!propsSelectDaysObj||selectedRange.selectTo !== propsSelectDaysObj.selectTo||selectedRange.selectFrom !== propsSelectDaysObj.selectFrom) {
         this.props.selectDays({selectDaysObj:selectedRange})
         this.props.navigation.goBack()
       }
     
   }
   calendarRender() {
      if(!this.props.hotel.roomCalendar) {
        return
      }
      if(this.props.hotel.selectDaysObj&&this.props.hotel.selectDaysObj.selectFrom&&this.props.hotel.selectDaysObj.selectTo) {
        return (<Calendar 
       startFromMonday={false} 
       startDate={new Date()}
       monthsCount={3} 
       beSaleArr={this.props.hotel.roomCalendar}
       onSelectionChange = {this.onSelectionChange.bind(this)}
       selectFrom={this.props.hotel.selectDaysObj.selectFrom}
       selectTo={this.props.hotel.selectDaysObj.selectTo}
       defaultPrice={this.props.navigation.state.params.defaultPrice-0}
       houseCalendar={this.props.hotel.roomCalendar}
       />)
      }else{
      return  (<Calendar 
       startFromMonday={false} 
       monthsCount={3} 
       startDate={new Date()}
       beSaleArr={this.props.hotel.roomCalendar}
       onSelectionChange = {this.onSelectionChange.bind(this)}
       defaultPrice={this.props.navigation.state.params.defaultPrice-0}
       houseCalendar={this.props.hotel.roomCalendar}
       />)
      }
   
     
   }
   render() {
     return (
       <View style={{flex:1}}>
       {
        this.calendarRender()
       }
       </View>
     )
   }
 }
 
 export default RoomDateSelectPage