import React, { Component } from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import PlusIcon from "../components/PlusIcon";
import { useNavigation } from '@react-navigation/core'
import {auth}  from '../config/db'

const DetailsScreen = () => {

  const navigation = useNavigation()

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate("SignUp")
        console.log('Logged out');
      })
      .catch(error => alert(error.message))
  }

  
    return (
      <View style={styles.container}>
        <View>
        <Text>Details Screen</Text>
        </View>
        <View style={styles.button}>
        <Button onPress={() => navigation.navigate('Home')} title="Home" />
        <Button onPress={() => navigation.navigate('Form')} title="Form" />
        </View>
        <Text>Email: {auth.currentUser?.email}</Text>
      <TouchableOpacity
        onPress={handleSignOut}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>
        <PlusIcon/>
      </View>
     
    );
  
}

export default DetailsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    textAlignVertical: 'top',
  },
  button: {
    flexDirection: 'row'  
  }
});
