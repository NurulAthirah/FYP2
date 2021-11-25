import 'react-native-gesture-handler';
import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/HomeScreen";
import DetailsScreen from "./src/screens/DetailsScreen";
import { db } from './src/config/db';
import firebase from 'firebase';
import { createDrawerNavigator } from '@react-navigation/drawer';

//import FormScreen from "./src/screens/FormScreen";

const Stack = createNativeStackNavigator();


function NavStack()
{
  return (
     <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: 'Home' }}
      />
      <Stack.Screen 
        name="Details" a
        component={DetailsScreen} 
        options={{ title: 'Details' }}
      />
    
    </Stack.Navigator>
  );
}

const Drawer = createDrawerNavigator();

export default class App extends Component {

  componentWillMount() {

    firebase.database().ref('users/004').set(
    {
      name: 'aimi',
      age: 21
    }
   ).then(() => {
    console.log('INSERTED');
  }).catch((error) => {
    console.log(error);
  });

     firebase.database().ref('users/001').set(
    {
      name: 'tirah',
      age: 21
    }
  ).then(() => {
    console.log('INSERTED');
  }).catch((error) => {
    console.log(error);
  });
      firebase.database().ref('users/').on('value', function (snapshot) {
      console.log(snapshot.val()) //display data taht's changed from firebase on console only 
});
}


  
  render() {
    return (
      <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="DetailsScreen" component={DetailsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
    );
  }
}
