import React, { Component, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity,SafeAreaView, ListItem, Modal } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome,faShoppingBag,faUser, faFileInvoiceDollar, faPlusCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';
import { getProduct } from "../api/productApi";

import ProductsScreen from "./ProductsScreen";
import SignUpScreen from "./SignUpScreen";

class HomeScreen extends Component {


state = {
  productList: [],
  picture: null,
  refreshing: false,
  currentItem: null,
  desc: null,
  quantity: null,
  price: null,
  productlink: null,
  ModalOpen: false
}

onItemReceived = (productList) => {
  console.log(productList);
  this.setState(prevState => ({
    productList: prevState.productList = productList
  }));
}

componentDidMount() {
 getProduct(this.onItemReceived); //calls the items from firestore
   }

render() {
  const { ModalOpen } = this.state;
 // const {navigation} = useNavigation()

  return(
<SafeAreaView style={styles.container}>
<View style={styles.rect}>
  <View style={styles.rect2}></View>
  <View style={styles.rect3}>
    <View style={styles.iconRow}>


    <TouchableOpacity
        onPress={() => this.props.navigation.navigate('Home')}
        style={styles.circle}>
    <FontAwesomeIcon icon={faHome} size={40} style={styles.icon}></FontAwesomeIcon>
    <Text style={styles.icontext}>Home</Text>
    </TouchableOpacity>

    <TouchableOpacity
        onPress={() =>  this.props.navigation.navigate('Products')}
        style={styles.circle}>
    <FontAwesomeIcon icon={faShoppingBag} size={32} style={styles.icon1}></FontAwesomeIcon>
    <Text style={styles.icontext}>Products</Text>
    </TouchableOpacity>
    
    <TouchableOpacity
        onPress={() =>  this.props.navigation.navigate('Transactions')}
        style={styles.circle}>
    <FontAwesomeIcon icon={faFileInvoiceDollar} size={32} style={styles.icon1}></FontAwesomeIcon>
    <Text style={styles.icontext}>Records</Text>
    </TouchableOpacity>
    
    <TouchableOpacity
        onPress={() =>  this.props.navigation.navigate('Home')}
        style={styles.circle}>
    <FontAwesomeIcon icon={faUser} size={32} style={styles.icon1}></FontAwesomeIcon>
    <Text style={styles.icontext}>Profile</Text>
    </TouchableOpacity>
    </View>
  </View>
</View>




   
   

</SafeAreaView>


    );
  
}}
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
    height: 130,
    backgroundColor: "white",
    flexDirection: "row",
    paddingBottom: 40
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
  circle2: {
    width: 50,  
    height: 50,   
    borderRadius: 30,                                                
    position: 'absolute',    
    backgroundColor: "white",                                     
    bottom: 15,                                                    
    right: 10, 
    zIndex:99

  },
  icontext: {
    textAlign: 'center', // <-- the magic
    marginTop: 5
  },
  text: {
  fontSize: 42
  },
  text2: {
    color: "white",
    fontSize: 15,
    margin: 5
    },
  scrollView: {
    backgroundColor: 'pink',
    marginTop: 350
  },
  modalBg: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    
  },
  
  modalContainer: {
    width: '60%',
    backgroundColor: '#FF367E',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 10,
    marginBottom: 20,
    marginRight: 20

  },

});
export default HomeScreen
