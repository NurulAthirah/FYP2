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



class ProductsScreen extends Component {

  _onRefresh() {
    this.setState({refreshing: true});
  this.onItemAdded,
      this.setState({refreshing: false});
    
  }
  
   uid = auth.currentUser.uid

 colors = [
      'red', 'black', 'blue'
    ]

    state = {
      productList: [],
      currentItem: null,
      desc: null,
      quantity: null,
      price: null,
      productlink: null,
      picture: null,
      ModalOpen: false
        }
     
    onItemAdded = (product) => {
      this.setState(prevState => ({
        productList: [...prevState.productList, product]
      }))
      console.log("Item Added");
      console.log(product)
    }

    onItemReceived = (productList) => {
      console.log(productList);
      this.setState(prevState => ({
        productList: prevState.productList = productList
      }));
    }

    componentDidMount() {

   getProduct(this.onItemReceived); //calls the items from firestore
    }

    setModalOpen = (visible) => {
      this.setState({ ModalOpen: visible });
    }
    setProductImage = (image) => {
      props.setFieldValue('imageUri', image.uri);
    }
    render() {
    const { ModalOpen } = this.state;
    return(
      
<View style={styles.container}>

{/*Opens Modal and receives product details from user*/}
<NativeBaseProvider>

<Modal 
visible={ModalOpen}
animationType={'slide'}
transparent={false}
style={{position: 'absolute'}}>

  <KeyboardAvoidingView  enabled behavior={Platform.OS === "android" ? undefined : "position"}>
  <ScrollView scrollEnabled={false} keyboardShouldPersistTaps="handled">
  <View style={{ flex: 1 }}>
  
  <View style={styles.modalBg}>
    <View style={styles.modalContainer}>
      
    <View>
    <TouchableOpacity // close icon 
        onPress={(ModalOpen) => this.setModalOpen(false) }
        style={styles.circle3}>

    <FontAwesomeIcon icon={faTimesCircle} margin={-5} size={40} color={'#FF367E'} ></FontAwesomeIcon>
    </TouchableOpacity>

      <Text>Add Product</Text>
      
      <ProductImgPicker image={this.state.picture} onImagePicked={this.setProductImage}/>

        <TextInput
        style={styles.input}
        placeholder="Product Name"
        value={this.state.currentItem}
        ref={input => { this.textInput = input }} 
        onChangeText={(text) => this.setState(prevState => ({
         currentItem: prevState.currentItem = text 
        }))
      } />

        <TextInput
        style={styles.input}
        placeholder="Description"
        value={this.state.desc}
        ref={input => { this.textInput = input }} 
        onChangeText={(text) => this.setState(prevState => ({
        desc: prevState.desc = text 
        }))
      
      } />


        <TextInput
        style={styles.input}
        placeholder="Quantity"
        value={this.state.quantity}
        ref={input => { this.textInput = input }} 
        onChangeText={(text) => this.setState(prevState => ({
        quantity: prevState.quantity = text 
        }))
       
      } />
       
       <TextInput
        style={styles.input}
        placeholder="Price"
        value={this.state.price}
        ref={input => { this.textInput = input }} 
        onChangeText={(text) => this.setState(prevState => ({
        price: prevState.price = text 
        }))
      
      } />
       <TextInput
        style={styles.input}
        placeholder="Product Link"
        value={this.state.productlink}
        ref={input => { this.textInput = input }}
        onChangeText={(text) => this.setState(prevState => ({
        price: prevState.productlink = text 
        }))
      
      } />
<View style={[{ width: "40%", alignSelf: 'center'}]}>
      <Button
      title='Add Product'
      color='#FF367E'
      onPress={() => 
        

        
          addProduct({
            userId: this.uid,
            name: this.state.currentItem,
            desc: this.state.desc,
            quantity: this.state.quantity,
            price: this.state.price,
            productlink: this.state.productlink,
            color: this.colors[Math.floor(Math.random() * this.colors.length)],
            ModalOpen : this.setModalOpen(false)
          },
          this.onItemAdded,
          this.textInput.clear()
          )
      }
      />
       </View>
      </View>
    </View>
    </View>
    </View>
        </ScrollView>
    </KeyboardAvoidingView>
</Modal>

</NativeBaseProvider>
<TouchableOpacity // plus icon 
        onPress={() => this.setModalOpen(true) }
        style={styles.circle2}>
    <FontAwesomeIcon icon={faPlusCircle} margin={-5} size={60} color={'#FF367E'} ></FontAwesomeIcon>
    </TouchableOpacity>

     

      
      <FlatList 
     
       data={this.state.productList}
       ItemSeparatorComponent={() => <Divider style={{ backgroundColor: 'black' }} />}
       keyExtractor={(item, index) => index.toString()}
       renderItem={({item, index}) => {
        
         
          return(
         <View containerStyle={{backgroundColor:"black"}}>
          <ListItem key={item} bottomDivider  onPress={() => {}} >
          
            <ListItem.Content>
              <ListItem.Title>{item.name}</ListItem.Title>
              <ListItem.Subtitle>{item.desc}</ListItem.Subtitle>
              <ListItem.Subtitle>{item.quantity}</ListItem.Subtitle>
              <ListItem.Subtitle>{item.price}</ListItem.Subtitle>
              <ListItem.Subtitle>{item.productlink}</ListItem.Subtitle>
              <ListItem.Subtitle>{item.color}</ListItem.Subtitle>
              <ListItem.Subtitle>{item.userId}</ListItem.Subtitle>
              <ListItem.Subtitle>{auth.currentUser.uid}</ListItem.Subtitle>
              <ListItem.Subtitle>{item.docid}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
          </View>
          
          )
          
        }
      }
      />
      
    </View>
      
      
    )

    }
}




const styles = StyleSheet.create({

  container: {
    flex: 1
  },
  input: {
    backgroundColor: '#DFDFDF',
    margin: 7
  },
  listItem: { 
    marginTop: 8,
    marginBottom: 8,
    backgroundColor: 'pink'
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleStyle: {
    fontSize: 30
  },
  subtitleStyle: {
    fontSize: 18
  },
  emptyTitle: {
    fontSize: 32,
    marginBottom: 16
  },
  emptySubtitle: {
    fontSize: 18,
    fontStyle: 'italic'
  },
  modalBg: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.6)',
  },
  modalContainer: {
    flex: 1,
    width: 370,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 10,
    marginBottom: 50,
  },
  circle2: {
    width: 50,  
    height: 50,   
    borderRadius: 30,                                                
    position: 'absolute',    
    backgroundColor: "white",                                     
    bottom: 15,                                                    
    right: 10, 
    zIndex:99
  },
  circle3: {
    width: 30,  
    height: 30,   
    borderRadius: 30,                                                
    position: 'absolute',    
    backgroundColor: 'white',                                     
    top: -5,                                                    
    right: -5, 
    zIndex: 99
  },
  input: {
    borderColor: '#B5B4BC',
    borderWidth: 0.2,
    padding: 8,
    height: 45,
    backgroundColor: '#EEEEEE',
    marginBottom: 16,
    marginTop: 8
  },

});

export default ProductsScreen
