import 'react-native-gesture-handler';
import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { MainStackNavigator, SubStackNavigator } from './navigation/StackNavigator';
import BottomTabNavigator from './navigation/TabNavigator';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/HomeScreen";
import ProductsScreen from "./src/screens/ProductsScreen";
import SignUpScreen from './src/screens/SignUpScreen';
import SignInScreen from './src/screens/SignInScreen';
import TransactionsScreen from './src/screens/TransactionsScreen';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem, drawerItemStyle } from '@react-navigation/drawer';
import {auth} from './src/config/db';


//import FormScreen from "./src/screens/FormScreen";

const Drawer = createDrawerNavigator();

export default class App extends Component {

  
  render() {
    return (
      <NavigationContainer>
       <Drawer.Navigator initialRouteName="SignIn"drawerContent={props => { //Nanti tukar initial route name to SIgnup balik
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
      <Drawer.Screen name="SignIn"  options={{drawerItemStyle: { height: 0 }, headerShown: false }} component={SignInScreen} />
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Products" component={ProductsScreen} />
        <Drawer.Screen name="Records" component={TransactionsScreen} />
        <Drawer.Screen name="Sign Up" options={{ drawerItemStyle: { height: 0 }, headerShown: false }} component={SignUpScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
    );
  }
}

/****/
