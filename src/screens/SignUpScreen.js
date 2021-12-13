import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState, useContext } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native'
import RNRestart from 'react-native-restart';
import LinearGradient from 'react-native-linear-gradient';
import {auth}  from '../config/db';
import { color } from 'react-native-reanimated';




const SignUpScreen = () => {
 const [email, setEmail] = useState('')
 const [password, setPassword] =useState('')
 const navigation = useNavigation()

 useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.navigate("Home")
      }
    })

    return unsubscribe
  }, [])

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        RNRestart.Restart(),
        navigation.navigate("SignUp"),
        console.log('Logged out');
       
      })
      .catch(error => alert(error.message))
  }

 const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Registered with:', user.email);
      })
      .catch(error => alert(error.message))
  }

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        navigation.navigate("Home"),
        RNRestart.Restart(),
        console.log('Logged in with:', user.email);
      })
      .catch(error => alert(error.message))
  }


  return (  
    <View
    style={styles.container}
    behavior="padding">
      <LinearGradient
        // Background Linear Gradient
        colors={['#311D52', '#311D52','#FFFFFF','transparent']}
        style={styles.background}
      />
      
      <Text style={{color: '#FFFFFF',fontSize: 40 }}>Log Help</Text>
      <Text style={{color: '#FFFFFF',fontSize: 20}}>Inventory System Management</Text>

    <View style={styles.inputContainer}>
      <TextInput
      fontSize={16}
        placeholder="Email"
        placeholderTextColor="#000000" 
        value={email}
        onChangeText={text => setEmail(text)}
        style={styles.input}
      />
      <TextInput
      fontSize={16}
        placeholder="Password"
        placeholderTextColor="#000000"
        value={password}
        onChangeText={text => setPassword(text)}
        style={styles.input}
        secureTextEntry
      />
    </View>

    <View style={styles.buttonContainer}>
      <TouchableOpacity
        onPress={handleLogin}
        style={styles.button}
      >
        <Text style={styles.buttonText}>SIGN IN</Text>
      </TouchableOpacity>
    </View>


    <TouchableOpacity
        onPress={handleSignUp}>
        <Text style={{color:'#000000',fontSize:16,paddingTop:10}}>Do not have any account yet?</Text>
        <Text style={{color:'#FF367E',fontSize:16}}>Sign Up</Text>
      </TouchableOpacity>
  </View>
)
}

export default SignUpScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#FFFFFF",
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 1000,
  },
  inputContainer: {
    width: '80%',
    paddingTop: 90,
  },

  input: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 15,
    marginBottom: 10,
  },

  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  button: {
    backgroundColor: '#FF367E',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    paddingTop:20,
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2, 

  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },

})
