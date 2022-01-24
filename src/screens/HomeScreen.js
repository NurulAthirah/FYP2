import React, { Component, useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  FlatList, 
  TouchableOpacity,
  SafeAreaView, 
  RefreshControl } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome,faShoppingBag,faUser, faFileInvoiceDollar, faPlusCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';
import {addProduct, getProduct, DeleteProduct} from '../api/productApi';
import {auth} from '../config/db'
import {ListItem, Divider} from 'react-native-elements'
import ProductsScreen from "./ProductsScreen";
import SignUpScreen from "./SignUpScreen";
import RNRestart from "react-native-restart";

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

_onRefresh() {
  RNRestart.Restart()
}

onItemReceived = (productList) => {
  productList.sort((a, b) => (a.quantity > b.quantity))

  this.setState(prevState => ({
    productList: prevState.productList = productList
  }));
  

}

componentDidMount() {

 getProduct(this.onItemReceived); //calls the items from firestore
   }

render() {


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
        onPress={() =>  this.props.navigation.navigate('Profile')}
        style={styles.circle}>
    <FontAwesomeIcon icon={faUser} size={32} style={styles.icon1}></FontAwesomeIcon>
    <Text style={styles.icontext}>Profile</Text>
    </TouchableOpacity>
    </View>
  </View>
<View style={{flex:1}}>
<FlatList 
     
     data={this.state.productList}
     extraData={this.state.quantity}
     ItemSeparatorComponent={() => <Divider style={{ backgroundColor: 'black' }} />}
     keyExtractor={(item, index) => index.toString()}
     refreshControl={
      <RefreshControl
        refreshing={this.state.refreshing}
        onRefresh={this._onRefresh.bind(this)}
      />}
     renderItem={({item, index}) => {
      
       
        return(

          <View style={styles.rect4}>

          <Image source={item.picture}  style={styles.avatar} />
          
          <View style={styles.listItem}>
            <Text style={{fontWeight:"bold", fontSize: 30}}>{item.name}</Text>
            <Text style={{fontWeight:"bold",  fontSize: 40, color: '#969696'}}>{item.quantity} IN STOCK</Text>
        
            </View>
        </View>
        )
        
      }
    }
    />
</View>

</View>





   
   

</SafeAreaView>


    );
  
}}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  avatar: {
    width: 100,
    height: 100,
    overflow:'hidden',
    justifyContent: 'flex-end',
  },

  listItem: {
    margin: 10,
 
  },
  
  rect: {
   flex: 1,
    backgroundColor: '#F4F4F4'
  },
  rect2: {
   height: 240,
    backgroundColor: "#311D52"
  },
  rect3: {
    height: 120,
    backgroundColor: "white",
    flexDirection: "row",
    paddingBottom: 20
  },
  rect4: {
    height: 100,
    flexDirection: "row",
    margin: 10,
    backgroundColor: '#F4F4F4'
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
