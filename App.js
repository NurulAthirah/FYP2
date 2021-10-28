import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./Screens/HomeScreen";
import DetailsScreen from "./Screens/DetailsScreen";
import FormScreen from "./Screens/FormScreen";

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
        name="Details" 
        component={DetailsScreen} 
        options={{ title: 'Details' }}
      />
      <Stack.Screen 
       name="Form" 
       component={FormScreen} 
       options={{ title: 'Form' }}
      />
    </Stack.Navigator>
  );
}

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
      <NavStack />
      </NavigationContainer>
    );
  }
}