import React from 'react';
import { StyleSheet, Text, View, ActivityIndicatior } from 'react-native';

export default class App extends React.Component {
  constructor(props){
    super();
    this.state = { isLoading: true, jsonResponse: '' }
  }

  componentDidMount(){
    setInterval(() => this.GetApiData(), 10000);
  }

  async GetApiData(){
    // prenesi podatke iz API-ja
    return fetch('http://oc.velenje.si/api/v1/organizations/mic')
    .then((response) => response.json())
    .then((data) => {
      this.setState({
        jsonResponse: data,
        isLoading: false
      });
    })
    .catch((error) => {
      console.error(error);
    });
  }

  render() {
    if(this.state.isLoading)
    {
      return (
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicatior />
        </View>
      );
    }
    else{
      return (
        <View style={{flex: 1, padding: 20}}>
          <Text>Podatki za { this.state.jsonResponse.name.attr_value }</Text>
          <Text>{ this.state.jsonResponse.temp_air.attr_value }°C</Text>
          <Text>{ this.state.jsonResponse.timestamp.attr_value }</Text>
          <Text>{ new Date().toLocaleString() }</Text>
        </View>
      );
    }
  }
}
