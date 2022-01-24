import React, { Component, useState } from "react";
import { View,
         Text,
         StyleSheet, 
         Button, 
         TouchableOpacity, 
         FlatList, 
         ScrollView,
         Modal,
         RefreshControl,
         TextInput} from "react-native";
import {addTransaction, getTransaction, getProduct, DeleteTrans} from '../api/productApi';
import { onItemReceived } from '../screens/ProductsScreen'
import PlusIcon from "../components/PlusIcon";
import { useNavigation } from '@react-navigation/core'
import {ListItem, Divider, SectionList} from 'react-native-elements'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {faTrash, faTimesCircle} from '@fortawesome/free-solid-svg-icons';
import {auth} from '../config/db'
import { KeyboardAvoidingView, NativeBaseProvider } from "native-base";
import {Picker} from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';
import moment from "moment";
import RNRestart from 'react-native-restart';


class TransactionsScreen extends Component {
 
   uid = auth.currentUser.uid

    state = {
      ModalOpen2: false,
      ModalOpen3: false,
      productList: [],
      transactionList: [],
      currentItem: null,
      quantity: null,
      sales: null,
      expenses: null,
      name: null,
      transactionDate: new Date(),
      date: new Date(),
      open: null,
      open2: null,
      datetime: null,
      selectedValue: null,
    }
     
  onTransDelete = (index) => {

    alert(
      'Hey There!',
      'Two button alert dialog',
      [
        {text: 'Yes', onPress: () => console.log('Yes button clicked')},
        {text: 'No', onPress: () => console.log('No button clicked'), style: 'cancel'},
      ],
      { 
        cancelable: true 
      }
    );
    console.log("Deleted Transaction")

    var newTransactionList = [...this.state.transactionList];
    
    newTransactionList.splice(index, 1);

    this.setState(prevState => ({
      transactionList: prevState.transactionList = newTransactionList
    }));


  };
    

    onTransactionAdded = (transaction) => {
      this.setState(prevState => ({
        transactionList: [...prevState.transactionList, transaction]
      }))
      console.log("Transaction Added");
      console.log(transaction);
    }
  
    onTransactionReceived = (transactionList) => {
      console.log(transactionList);
      this.setState(prevState => ({
        transactionList: prevState.transactionList = transactionList
      }));
    }

    onItemReceived = (productList) => {
      console.log(productList);
      
      this.setState(prevState => ({
        productList: prevState.productList = productList
      }));
    }

    componentDidMount() {

      getProduct(this.onItemReceived); //calls the items from firestore
    
    getTransaction(this.onTransactionReceived); //calls the items from firestore
    }

    setModalOpen2 = (visible) => {
      this.setState({ ModalOpen2: visible })
    }

    setModalOpen3 = (visible) => {
      this.setState({ ModalOpen3: visible })
    }



    setDate = (date) => {
      this.setState({ 
        transactionDate: date,
        datetime:  moment(date).format("MMM Do YY")})
    }
    
    setSelectedValue = (selectedValue) => {
      this.setState({
        selectedValue : selectedValue,
        currentItem: selectedValue,
      })
    }

    render() { 
    const { ModalOpen2 } = this.state;
    const { ModalOpen3 } = this.state;
    const { date } = this.state;
    const { selectedValue } = this.state;
    
  
  
    return(
     
<View style={styles.container}>
<View 
width={'40%'} 
alignSelf={'center'} 
justifyContent={'space-evenly'} 
flex={1} 
margin={30}
top={10} >

<Button color='#FF367E' title={"Restock Item"} 
onPress={() => this.setModalOpen2(true) }/>

<Button color='#FF367E' title={"Items Sold"}
onPress={() => this.setModalOpen3(true) }/>


</View>


<Text style={styles.text}>Monthly Transactions</Text>
<View style={styles.container2}>

{/*Opens Modal and receives product details from user*/}
<NativeBaseProvider>

<Modal 
visible={ModalOpen2}
animationType={'slide'}
transparent={true}
style={{position: 'absolute'}}>

  <View style={styles.modalBg}>
  <KeyboardAvoidingView  enabled behavior={Platform.OS === "android" ? undefined : "position"}>
  <ScrollView scrollEnabled={false} keyboardShouldPersistTaps="handled">
  <View>
  
    <View style={styles.modalContainer}>
      
    <View>
    <TouchableOpacity // close icon 
        onPress={() => this.setModalOpen2(false) }
        style={styles.circle3}>

    <FontAwesomeIcon icon={faTimesCircle} margin={-5} size={40} color={'#FF367E'} ></FontAwesomeIcon>
    </TouchableOpacity>

    <Picker

        selectedValue={selectedValue}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => this.setSelectedValue(itemValue)}
      >
        {this.state.productList.map((item, index) => {
   return (< Picker.Item label={item.name} value={item} key={item} />);

})}  
      </Picker>
      
      <TextInput
        style={styles.input}
        keyboardType='numeric'
        placeholder="Quantity"
        value={this.state.quantity}
        ref={input => { this.textInput = input }} 
        onChangeText={(text) => this.setState(prevState => ({
        quantity: prevState.quantity = text 
        }))} />

        <TextInput
        style={styles.input}
        keyboardType='numeric'
        placeholder="Expenses"
        value={this.state.sales}
        ref={input => { this.textInput = input }} 
        onChangeText={(text) => this.setState(prevState => ({
        sales: prevState.sales = text 
        }))} />

        <Text>Transaction Date</Text>

        <DatePicker
        date={date}
        mode="date"
        onConfirm={(date) => {
          this.setOpen(false)
          this.setDate(date)
        }}
        onCancel={() => {
          this.setOpen(false)
        }}
      />


<View style={[{ width: "40%", alignSelf: 'center'}]}>
      <Button
      title='Submit'
      color='#FF367E'
      onPress={() => 
        
          addTransaction({
            userId: this.uid,
            name: this.state.currentItem.name,
            id: this.state.currentItem.productid,
            quantity: this.state.quantity,
            sales: this.state.sales,
            transactionDate: this.state.transactionDate,
            datetime: this.state.datetime,
            ModalOpen2 : this.setModalOpen2(false)
          },
          this.onTransactionAdded,
          this.textInput.clear()
          )
      }
      />
       </View>
      </View>
    </View>
    </View> 
        </ScrollView>
    </KeyboardAvoidingView>
    </View>
   
</Modal>

<Modal 
visible={ModalOpen3}
animationType={'slide'}
transparent={true}
style={{position: 'absolute'}}>

  <View style={styles.modalBg}>
  <KeyboardAvoidingView  enabled behavior={Platform.OS === "android" ? undefined : "position"}>
  <ScrollView scrollEnabled={false} keyboardShouldPersistTaps="handled">
  <View>
  
    <View style={styles.modalContainer}>
      
    <View>
    <TouchableOpacity // close icon 
        onPress={() => this.setModalOpen3(false) }
        style={styles.circle3}>

    <FontAwesomeIcon icon={faTimesCircle} margin={-5} size={40} color={'#FF367E'} ></FontAwesomeIcon>
    </TouchableOpacity>

    <Picker

        selectedValue={selectedValue}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => this.setSelectedValue(itemValue)}
      >
        {this.state.productList.map((item, index) => {
   return (< Picker.Item label={item.name} value={item} key={item} />);
})}  
      </Picker>
      
      <TextInput
        style={styles.input}
        keyboardType='numeric'
        placeholder="Quantity"
        value={this.state.quantity}
        ref={input => { this.textInput = input }} 
        onChangeText={(text) => this.setState(prevState => ({
        quantity: prevState.quantity = text 
        }))} />

        <TextInput
        style={styles.input}
        keyboardType='numeric'
        placeholder="Expenses"
        value={this.state.sales}
        ref={input => { this.textInput = input }} 
        onChangeText={(text) => this.setState(prevState => ({
        sales: prevState.sales = text 
        }))} />

        <Text>Transaction Date</Text>

        <DatePicker
        date={date}
        mode="date"
        onConfirm={(date) => {
          this.setOpen2(false)
          this.setDate(date)
        }}
        onCancel={() => {
          this.setOpen2(false)
        }}
      />


<View style={[{ width: "40%", alignSelf: 'center'}]}>
      <Button
      title='Submit'
      color='#FF367E'
      onPress={() => 
        
          addTransaction({
            userId: this.uid,
            name: this.state.currentItem.name,
            id: this.state.currentItem.productid,
            quantity: this.state.quantity*-1,
            sales: this.state.sales,
            transactionDate: this.state.transactionDate,
            datetime: this.state.datetime,
            ModalOpen3 : this.setModalOpen3(false)
          },
          this.onTransactionAdded,
          this.textInput.clear()
          )
      }
      />
       </View>
      </View>
    </View>
    </View> 
        </ScrollView>
    </KeyboardAvoidingView>
    </View>
   
</Modal>

</NativeBaseProvider>

<View style={styles.heading}>
  <Text style={{fontSize:16}}>Date Type  Product                                        Qty  Expenses</Text>
</View>

 <FlatList 
       style={styles.container3}
       data={this.state.transactionList}
       ItemSeparatorComponent={() => <Divider style={{ backgroundColor: 'black' }} />}
       keyExtractor={(item, index) => index.toString()}
       renderItem={({item, index}) => {
        
         
          return(

       <View containerStyle={{backgroundColor:"black"}}>
  <TouchableOpacity 
              onLongPress={() => 
                {
                 this.onTransDelete(index)
                 DeleteTrans(item)
                 }} >

          <ListItem  key={item} bottomDivider   >

            <Text>{item.datetime}</Text>
            <Text>{item.name}</Text>
            <Text>{item.quantity}</Text>
            <Text>{item.sales}</Text>
              
          </ListItem>
          </TouchableOpacity>
           
          </View>
         
          )
          
        }
      }
      />
      
      </View>
    </View>
      
    )

    }
}




const styles = StyleSheet.create({
  container: {
    backgroundColor: '#311D52' ,
    flex: 1,
  },
  container2: {
    height: '65%',
    justifyContent: 'flex-start',
  },
  container3: {
    width: '100%',
    marginTop: 40,
    
    },
  input: {
    backgroundColor: '#DFDFDF',
    margin: 7
  },
  heading: {
  backgroundColor: '#FEA82F',
  padding: 10,
  fontSize:16,
  position: 'absolute',
  width: '100%'
  },
  text: {
  color: 'white',
  margin: 10,
  fontSize: 20,
  fontWeight: 'bold'
  },
  listItem: { 
    marginTop: 8,
    marginBottom: 8,
    backgroundColor: 'pink',

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
    marginTop: 30,
    paddingTop: 20
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
    marginTop: 8,
    width: '90%',
    alignSelf: 'center'
  },

});

export default TransactionsScreen
