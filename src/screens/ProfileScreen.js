
import React, { Component, useState } from "react";
import { View,
         Text,
         StyleSheet, 
         Button, 
         TouchableOpacity, 
         NativeModule, 
         FlatList, 
         ScrollView,
         Modal,
         RefreshControl,
         TextInput } from "react-native";
import {addProduct, getProduct} from '../api/productApi';
import PlusIcon from "../components/PlusIcon";
import { useNavigation } from '@react-navigation/core'
import {ListItem, Divider} from 'react-native-elements'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {faPlusCircle, faTimesCircle} from '@fortawesome/free-solid-svg-icons';
import {auth} from '../config/db'
import { KeyboardAvoidingView, NativeBaseProvider } from "native-base";

const ProfileScreen = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [bod, setBod] =useState('')
    const [businessname, setBusinessName] = useState('')
    const [numberphone, setNumberPhone] = useState('')

    return (
<View style={styles.container}
 behavior="padding">      
<View style={styles.rect}>
  <View style={styles.rect2}></View>
  <View style={styles.rect3}></View>

<View style={styles.inputContainer}>
<TextInput
fontSize={16}
  placeholder="Name"
  placeholderTextColor="#000000"
  value={name}
  onChangeText={text => setName(text)}
  style={styles.input}
  secureTextEntry
/>
<TextInput
fontSize={16}
  placeholder="Birth of Date"
  placeholderTextColor="#000000"
  value={bod}
  onChangeText={text => setBod(text)}
  style={styles.input}
  secureTextEntry
/>
<TextInput
fontSize={16}
  placeholder="Business Name"
  placeholderTextColor="#000000"
  value={businessname}
  onChangeText={text => setBusinessName(text)}
  style={styles.input}
  secureTextEntry
/>
<TextInput
fontSize={16}
  placeholder="Number Phone"
  placeholderTextColor="#000000"
  value={numberphone}
  onChangeText={text => setNumberPhone(text)}
  style={styles.input}
  secureTextEntry
/>
<TextInput
fontSize={16}
  placeholder="Email"
  placeholderTextColor="#000000"
  value={email}
  onChangeText={text => setEmail(text)}
  style={styles.input}
  secureTextEntry
/>
</View>
</View>
</View>
    );

};


export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
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
    inputContainer: {
        width: '80%',
      },
    input: {
        backgroundColor: '#C5C6D0',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 10,
      },
    
});
