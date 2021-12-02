import React, { Component } from "react";
import { View,
         Text,
         StyleSheet, 
         Button, 
         TouchableOpacity, 
         SafeAreaView, 
         FlatList, 
         ScrollView,
         TextInput } from "react-native";
import {addProduct, getProduct} from '../api/productApi';
import PlusIcon from "../components/PlusIcon";
import { useNavigation } from '@react-navigation/core'
import {ListItem, Divider} from 'react-native-elements'
import {auth}  from '../config/db'
import { color } from "react-native-reanimated";
import { style } from "dom-helpers";

  class ProductsScreen extends Component {

 colors = [
      'red', 'black', 'blue'
    ]

    state = {
      productList: [],
      currentItem: null,
    }
  
    onItemAdded = (product) => {
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
    getProduct(this.onItemReceived);
    }
  

    render() {
    return(
      
      <SafeAreaView>

      <View style={styles.row}>
        <TextInput
        style={styles.input}
        placeholder="Add Product"
        value={this.state.currentItem}
        onChangeText={(text) => this.setState(prevState => ({
         currentItem: prevState.currentItem = text 
        }))
      } />

      <Button
      title='Submit'
      style={styles.button}
      onPress={() => 
      
          addProduct({
            name: this.state.currentItem,
            color: this.colors[Math.floor(Math.random() * this.colors.length)]
          },
          this.onItemAdded
          )
      }
      />
      </View>


      <FlatList
      style={styles.listItem}
       data={this.state.productList}
       ItemSeparatorComponent={() => <Divider style={{ backgroundColor: 'black' }} />}
       keyExtractor={(item, index) => index.toString()}
       renderItem={({item}) => {
          
          return(
    
          <ListItem key={item} bottomDivider  onPress={() => {}} >
          
            <ListItem.Content>
              <ListItem.Title>{item.name}</ListItem.Title>
              <ListItem.Subtitle>{item.color}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        
          )
        }}
      />
    
      </SafeAreaView>
      
      
    )

    }
}




const styles = StyleSheet.create({

  container: {
    flex: 1
  },
  a: {
    backgroundColor: 'blue',
    height: 50
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
  }
});

export default ProductsScreen