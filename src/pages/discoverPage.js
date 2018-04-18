import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import ImagePicker from 'react-native-image-crop-picker'
 class DiscoverPage extends React.Component {
 
  constructor(props) {
    super(props);

    this.state = {
      num: 0,
      selected: [],
    };
  }
 componentDidMount() {
  ImagePicker.openPicker({
    multiple: true
  }).then(images => {
    console.log(images);
  });
 }
  getSelectedImages(images, current) {
    var num = images.length;

    this.setState({
      num: num,
      selected: images,
    });

    console.log(current);
    console.log(this.state.selected);
  }

render() {
  return (
    <View style={styles.container}>
    <View style={styles.content}>
      <Text style={styles.text}>
        <Text style={styles.bold}> {this.state.num} </Text> images has been selected
      </Text>
    </View>
    
  </View>
  );
  }
 }
 const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6AE2D',
  },
  content: {
    marginTop: 15,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  text: {
    fontSize: 16,
    alignItems: 'center',
    color: '#fff',
  },
  bold: {
    fontWeight: 'bold',
  },
  info: {
    fontSize: 12,
  },
});
 export default DiscoverPage
