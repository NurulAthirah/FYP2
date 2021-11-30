import React, { Component } from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome,faShoppingBag,faUser, faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons';


export default class HomeScreen extends Component {
  render() {
    return (
 
<View style={styles.container}>
<View style={styles.rect}>
  <View style={styles.rect2}></View>
  <View style={styles.rect3}>
    <View style={styles.iconRow}>


    <TouchableOpacity
        onPress={() => this.props.navigation.navigate('Home')}
        style={styles.circle}>
    <FontAwesomeIcon icon={faHome} size={40} style={styles.icon}></FontAwesomeIcon>
    </TouchableOpacity>


    <TouchableOpacity
        onPress={() => this.props.navigation.navigate('Home')}
        style={styles.circle}>
    <FontAwesomeIcon icon={faShoppingBag} size={32} style={styles.icon1}></FontAwesomeIcon>
    </TouchableOpacity>
    
    <TouchableOpacity
        onPress={() => this.props.navigation.navigate('Home')}
        style={styles.circle}>
    <FontAwesomeIcon icon={faFileInvoiceDollar} size={32} style={styles.icon1}></FontAwesomeIcon>
    </TouchableOpacity>
    
    <TouchableOpacity
        onPress={() => this.props.navigation.navigate('Home')}
        style={styles.circle}>
    <FontAwesomeIcon icon={faUser} size={32} style={styles.icon1}></FontAwesomeIcon>
    </TouchableOpacity>
    </View>
  </View>
</View>
<View style={styles.button}>
        <Button onPress={() => this.props.navigation.navigate('Details')} title="Details" />
        <Button onPress={() => this.props.navigation.navigate('Form')} title="Form" />
        </View>
</View>


    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  rect: {
   flex: 1,
    backgroundColor: "white"
  },
  rect2: {
   height: 240,
    backgroundColor: "#311D52"
  },
  rect3: {
    height: 100,
    backgroundColor: "white",
    flexDirection: "row"
  },
  icon: {
    color: "white",
    margin: 9
  },
  icon1: {
    color: "white",
    margin: 14,
  },
  iconRow: {
    flexDirection: "row",
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 60/ 2,
    backgroundColor: "#FEA82F",
    zIndex: -1,
    margin: 25
  },
});
