import 'react-native-gesture-handler';
import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { MainStackNavigator, SubStackNavigator } from './navigation/StackNavigator';
import BottomTabNavigator from './navigation/TabNavigator';
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screens/HomeScreen";
import ProductsScreen from "./src/screens/ProductsScreen";
import SignUpScreen from './src/screens/SignUpScreen';
import SignInScreen from './src/screens/SignInScreen';
import TransactionsScreen from './src/screens/TransactionsScreen';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem, drawerItemStyle } from '@react-navigation/drawer';
import {auth} from './src/config/db';


//import FormScreen from "./src/screens/FormScreen";

const Drawer = createDrawerNavigator();

const Stack = createStackNavigator();

export default class App extends Component {

  
  render() {
    return (
      <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="SignIn" options={{headerShown: false}} component={SignInScreen} />
      <Stack.Screen name="SignUp" options={{headerShown: false}} component={SignUpScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Products" component={ProductsScreen} />
      <Stack.Screen name="Records" component={TransactionsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    );
  }
}

/****/
