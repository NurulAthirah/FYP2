import 'react-native-gesture-handler';
import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/HomeScreen";
import ProductsScreen from "./src/screens/ProductsScreen";
import SignUpScreen from './src/screens/SignUpScreen';
import TransactionsScreen from './src/screens/TransactionsScreen';
import ProfileScreen from './src/screens/ProfileScreen';

import { db } from './src/config/db';
import firebase from 'firebase';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import {auth} from './src/config/db'


//import FormScreen from "./src/screens/FormScreen";

const Drawer = createDrawerNavigator();


export default class App extends Component {

  
  render() {
    return (
      <NavigationContainer>
      <Drawer.Navigator initialRouteName="SignUp"drawerContent={props => { //Nanti tukar initial route name to SIgnup balik
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem label="Logout" onPress={() => {

      auth.signOut().then(() => props.navigation.navigate("SignUp"))
      console.log('Logged out');
      }} />
      </DrawerContentScrollView>
    )
  }}>
      <Drawer.Screen name="SignUp"  options={{ headerShown: false }} component={SignUpScreen} />
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Products" component={ProductsScreen} />
        <Drawer.Screen name="Transactions" component={TransactionsScreen} />
        <Drawer.Screen name="Profile" component={ProfileScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
    );
  }
}
