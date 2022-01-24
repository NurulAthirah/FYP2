import React, { Component, useState } from "react";
import { View,
         Text,
         StyleSheet, 
         Button, 
         TouchableOpacity, 
         Alert, 
         FlatList, 
         ScrollView,
         Modal,
         RefreshControl,
         Image,
         TextInput } from "react-native";
import {addProduct, getProduct, DeleteProduct} from '../api/productApi';
import {ListItem, Divider} from 'react-native-elements'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {faPlusCircle, faTimesCircle, faTrash} from '@fortawesome/free-solid-svg-icons';
import {auth} from '../config/db'
import ProductImgPicker from "../components/ProductImgPicker";
import { KeyboardAvoidingView, NativeBaseProvider } from "native-base";
import { Avatar } from "react-native-elements/dist/avatar/Avatar";
import RNRestart from "react-native-restart";
import { useNavigation } from '@react-navigation/core'


class ProductsScreen extends Component {

  _onRefresh() {
    getProduct(this.onItemReceived);
    
  }

  
   uid = auth.currentUser.uid

    state = {
      productList: [],
      picture: null,
      refreshing: false,
      currentItem: null,
      desc: null,
      quantity: 0,
      price: null,
      productlink: null,
      ModalOpen: false
        }

      

    onItemAdded = (product) => { //Add product
     
      this.setState(prevState => ({
        productList: [...prevState.productList, product]
      }))
      console.log("Item Added");
      console.log(product)
 
    }

    onItemReceived = (productList) => { //updates added product
      console.log(productList);
      this.setState(prevState => ({
        productList: prevState.productList = productList
      }));
    }

    onItemDelete = (index) => {

      console.log(index)
      var newProductList = [...this.state.productList]; //copy array to new array
      
      newProductList.splice(index, 1); //gets rid of array with that index
  
      this.setState(prevState => ({
       productList: prevState.productList = newProductList //copy the new array back into old array
      }));
  

    }
  
    componentDidMount() {
   getProduct(this.onItemReceived); //calls the items from firestore
   this.setState({
      picture: {uri: 'https://www.spicevillage.eu/media/catalog/product/n/o/not-found_1024x1024_91cf4817-5921-46d4-b879-da02cdd86719.png'} });
   
    }

    setModalOpen = (visible) => {
      this.setState({ ModalOpen: visible });
     
    }
    
    setProductImage = (img) => {
      this.setState({ picture: img });
    }
  
    
   

    render() {
    const { ModalOpen } = this.state;
    const { picture} = this.state;
    return(
      
<View style={styles.container}>

{/*Opens Modal and receives product details from user*/}
<NativeBaseProvider>

<Modal 
visible={ModalOpen}
animationType={'slide'}
transparent={true}
style={{position: 'absolute'}}>

  <KeyboardAvoidingView  enabled behavior={Platform.OS === "android" ? undefined : "position"}>
  <ScrollView scrollEnabled={false} keyboardShouldPersistTaps="handled"  contentContainerStyle={styles.scrollView}
        
      >
  <View style={{ flex: 1 }}>
  
  <View style={styles.modalBg}>
    <View style={styles.modalContainer}>
      
    <View>
    <TouchableOpacity // close icon 
        onPress={(ModalOpen) => this.setModalOpen(false)}
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
        keyboardType='numeric'
        ref={input => { this.textInput = input }} 
        onChangeText={(text) => this.setState(prevState => ({
        quantity: prevState.quantity = text 
        }))
       
      } />
       
       <TextInput
        style={styles.input}
        placeholder="Price"
        value={this.state.price}
        keyboardType='numeric'
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
        productlink: prevState.productlink = text 
        }))
      
      } />
<View style={[{ width: "40%", alignSelf: 'center', position: 'absolute', bottom: -50, right: 15}]}>
      <Button
      title='Add Product'
      color='#FF367E'
      onPress={() => 
        
          addProduct({
            userId: this.uid,
            picture: this.state.picture,
            name: this.state.currentItem,
            desc: this.state.desc,
            quantity: this.state.quantity,
            price: this.state.price,
            productlink: this.state.productlink,
            ModalOpen : this.setModalOpen(false)
          },
          this.onItemAdded,
          this.textInput.clear()
          )
      }
      />
      </View>
      <View style={[{ width: "40%", alignSelf: 'center', position: 'absolute', bottom: -50, left: 15}]}>
       <Button
      title='Cancel'
      color='#FF367E'
      onPress={() => this.setModalOpen(false)
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
<TouchableOpacity // plus 
        onPress={() => this.setModalOpen(true) }
        style={styles.circle2}>
    <FontAwesomeIcon icon={faPlusCircle} margin={-5} size={60} color={'#FF367E'} ></FontAwesomeIcon>
    </TouchableOpacity>


      <FlatList 
     
       data={this.state.productList}
       extraData={this.state.quantity}
       ItemSeparatorComponent={() => <Divider style={{ backgroundColor: 'black' }} />}
       keyExtractor={(item, index) => index.toString()}
       refreshControl={
        <RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this._onRefresh.bind(this)}
        />
      }
       renderItem={({item, index}) => {
        
         
          return(
         <View>
         
        <ListItem key={item} bottomDivider>
          
          <TouchableOpacity style={styles.container}
               onLongPress={() => 
                {
                  Alert.alert(
                  "Delete product?", //alert title
                   'Are you sure you want to delete this product?', //alert desc
                  [ //buttons
                  {
                   text: "Ok",
                   onPress: () => {{
                   this.onItemDelete(index)
                   DeleteProduct(item)
                   }}
                  },
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  },
                  ],
                     {cancelable: true} //lets alert be closed from outward taps
                  );}} >

            <ListItem.Content>
            <Image
            style={styles.tinyLogo}
            source={item.picture}
             />
             <ListItem.Title>{item.name}  
              
            </ListItem.Title>
            <ListItem.Subtitle>{item.desc}</ListItem.Subtitle>
            <ListItem.Subtitle>{item.quantity}</ListItem.Subtitle>
            <ListItem.Subtitle>{item.price}</ListItem.Subtitle>
            <ListItem.Subtitle>{item.productlink}</ListItem.Subtitle>
            <ListItem.Subtitle>{item.userId}</ListItem.Subtitle>
            <ListItem.Subtitle>{auth.currentUser.uid}</ListItem.Subtitle>
            <ListItem.Subtitle>{item.productid}</ListItem.Subtitle>

            </ListItem.Content>

            </TouchableOpacity>
            
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
  tinyLogo: {
    width: '110%',
    height: 400,
    marginLeft: -16,
    marginTop:-20
  },
  input: {
    backgroundColor: '#DFDFDF',
    margin: 7
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
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.6)',
    height: 732,
  },
  modalContainer: {
    top: 20,
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
