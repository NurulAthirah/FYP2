import React, { Component, useState } from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity,SafeAreaView, ScrollView, Modal } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome,faShoppingBag,faUser, faFileInvoiceDollar, faPlusCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated'
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen ({}) {

const [ModalOpen, setModalOpen] = useState(true)

const navigation = useNavigation();
    return (
<SafeAreaView style={styles.container}>
<View style={styles.rect}>
  <View style={styles.rect2}></View>
  <View style={styles.rect3}>
    <View style={styles.iconRow}>


    <TouchableOpacity
        onPress={() => navigation.navigate('Home')}
        style={styles.circle}>
    <FontAwesomeIcon icon={faHome} size={40} style={styles.icon}></FontAwesomeIcon>
    <Text style={styles.icontext}>Home</Text>
    </TouchableOpacity>

    <TouchableOpacity
        onPress={() =>  navigation.navigate('Details')}
        style={styles.circle}>
    <FontAwesomeIcon icon={faShoppingBag} size={32} style={styles.icon1}></FontAwesomeIcon>
    <Text style={styles.icontext}>Products</Text>
    </TouchableOpacity>
    
    <TouchableOpacity
        onPress={() =>  navigation.navigate('Home')}
        style={styles.circle}>
    <FontAwesomeIcon icon={faFileInvoiceDollar} size={32} style={styles.icon1}></FontAwesomeIcon>
    <Text style={styles.icontext}>Records</Text>
    </TouchableOpacity>
    
    <TouchableOpacity
        onPress={() =>  navigation.navigate('Home')}
        style={styles.circle}>
    <FontAwesomeIcon icon={faUser} size={32} style={styles.icon1}></FontAwesomeIcon>
    <Text style={styles.icontext}>Profile</Text>
    </TouchableOpacity>
    </View>
  </View>
</View>

<Modal 
visible={ModalOpen}
animationType={'slide'}
transparent visible={ModalOpen}>
  <TouchableOpacity style={styles.modalBg} onPress={() => setModalOpen(false)}>
    <View style={styles.modalContainer}>
   
      <TouchableOpacity 
      onPress={() =>  navigation.navigate('Details')}>
      <Text style={styles.text2}>Add Products</Text>
      </TouchableOpacity>
      <TouchableOpacity 
      onPress={() =>  navigation.navigate('Home')}>
      <Text style={styles.text2}>Add Transactions</Text>
      </TouchableOpacity>
      
    </View>
    </TouchableOpacity>
</Modal>

        <TouchableOpacity
        onPress={() => setModalOpen(true)}
        style={styles.circle2}>
    <FontAwesomeIcon icon={faPlusCircle} size={60} color={'#FF367E'} ></FontAwesomeIcon>
    </TouchableOpacity>


    <ScrollView style={styles.scrollView}>
        <Text style={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Text>
      </ScrollView>
   
</SafeAreaView>


    );
  
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
    width: 60,  
    height: 60,   
    borderRadius: 30,                                                
    position: 'absolute',    
    backgroundColor: "white",                                     
    bottom: 10,                                                    
    right: 5, 
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
