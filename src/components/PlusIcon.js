import * as React from "react";
import {StyleSheet, TouchableOpacity, Modal } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from "react-native-safe-area-context";





const PlusIcon = () => {

    const navigation = useNavigation();
    return (
<    SafeAreaView>
        <TouchableOpacity
        onPress={() => navigation.navigate('Details')}
        style={styles.circle2}>

    <FontAwesomeIcon icon={faPlusCircle} size={61} color={'#FF367E'}></FontAwesomeIcon>
    </TouchableOpacity>


    <Modal 
visible={ModalOpen}
animationType={'slide'}
transparent visible={ModalOpen}>
  <TouchableOpacity style={styles.modalBg} onPress={() => setModalOpen(false)}>
    <View style={styles.modalContainer}>
   
      <TouchableOpacity 
      onPress={() =>  navigation.navigate('Products')}>
      <Text style={styles.text2}>Add Products</Text>
      </TouchableOpacity>
      <TouchableOpacity 
      onPress={() =>  navigation.navigate('Home')}>
      <Text style={styles.text2}>Add Transactions</Text>
      </TouchableOpacity>
      
    </View>
    </TouchableOpacity>
</Modal>


    </SafeAreaView>

    )

    


}


const styles = StyleSheet.create ({

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
})

export default PlusIcon;

