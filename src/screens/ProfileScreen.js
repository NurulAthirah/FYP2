
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
import ProductImgPicker from "../components/ProductImgPicker";
import { KeyboardAvoidingView, NativeBaseProvider } from "native-base";

const ProfileScreen = () => {
    return (
        <View>
        <Text>Test</Text>
        </View>
    );

};

export default ProfileScreen;