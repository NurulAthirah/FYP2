import React, { Component, useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  FlatList, 
  TouchableOpacity,
  SafeAreaView, 
  RefreshControl,
  Dimensions,
  Alert,
  Linking } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome,faShoppingBag, faSignOutAlt, faFileInvoiceDollar, faPlusCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';
import {getQuantity, getProduct} from '../api/productApi';
import {auth} from '../config/db'
import {ListItem, Divider} from 'react-native-elements'
import ProductsScreen from "./ProductsScreen";
import SignInScreen from "./SignInScreen";
import RNRestart from "react-native-restart";
import moment from "moment";
import firestore from '@react-native-firebase/firestore';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

class HomeScreen extends Component {


state = {
  productList: [],
  picture: null,
  refreshing: false,
  currentItem: null,
  desc: null,
  quantity: null,
  price: null,
  productlink: null,
  ModalOpen: false,
  totals: [0,0,0,0,0,0,0]
}

_onRefresh() {
  getProduct(this.onItemReceived);
  getQuantity(this.onGraphReceived,

    moment(new Date()).subtract(6,'days').format("DD/MM/YY"),
    moment(new Date()).subtract(5,'days').format("DD/MM/YY"),
    moment(new Date()).subtract(4,'days').format("DD/MM/YY"),
    moment(new Date()).subtract(3,'days').format("DD/MM/YY"),
    moment(new Date()).subtract(2,'days').format("DD/MM/YY"),
    moment(new Date()).subtract(1,'days').format("DD/MM/YY"),
    moment(new Date()).format("DD/MM/YY")
           )
}



onGraphReceived = (graph1, graph2, graph3, graph4, graph5, graph6, graph7) => { //updates graph

  var total1=0, total2=0, total3=0, total4=0, total5=0, total6=0, total7=0;
  var totals=[];

  this.setState(prevState => ({
    graph1: prevState.graph1 = graph1
  }));


  for (let i=0; i <graph1.length ; i++ ){
  total1 =  total1 + graph1[i].sales 
  console.log(graph1[i].sales)
  }
  for (let i=0; i <graph2.length ; i++ ){
  total2 =  total2 + graph2[i].sales 
  console.log(graph2[i].sales)
  }
  for (let i=0; i <graph3.length ; i++ ){
  total3 =  total3 + graph3[i].sales 
  console.log(graph3[i].sales)
  }
  for (let i=0; i <graph4.length ; i++ ){
  total4 =  total4 + graph4[i].sales 
  console.log(graph4[i].sales)
  }
  for (let i=0; i <graph5.length ; i++ ){
  total5 =  total5 + graph5[i].sales 
  console.log(graph5[i].sales)
  }
  for (let i=0; i <graph6.length ; i++ ){
  total6 =  total6 + graph6[i].sales 
  console.log(graph6[i].sales)
  }
  for (let i=0; i <graph7.length ; i++ ){
  total7 =  total7 + graph7[i].sales 
  console.log(graph7[i].sales)
  }

totals[0] = total1;
totals[1] = total2;
totals[2] = total3;
totals[3] = total4;
totals[4] = total5;
totals[5] = total6;
totals[6] = total7;

this.setState(prevState => ({
  totals: prevState.totals = totals
}));

  console.log("sales for 5 days")
  console.log(totals)

}

onItemReceived = (productList) => {
  productList.sort((a, b) => (a.quantity > b.quantity))

  this.setState(prevState => ({
    productList: prevState.productList = productList
  }));
  

}

componentDidMount() {
 getQuantity(this.onGraphReceived,

      moment(new Date()).subtract(6,'days').format("DD/MM/YY"),
      moment(new Date()).subtract(5,'days').format("DD/MM/YY"),
      moment(new Date()).subtract(4,'days').format("DD/MM/YY"),
      moment(new Date()).subtract(3,'days').format("DD/MM/YY"),
      moment(new Date()).subtract(2,'days').format("DD/MM/YY"),
      moment(new Date()).subtract(1,'days').format("DD/MM/YY"),
      moment(new Date()).format("DD/MM/YY")
             )
 getProduct(this.onItemReceived); //calls the items from firestore
   }

render() {
const {totals} = this.state;

  return(
<SafeAreaView style={styles.container}>
<View style={styles.rect}>
  <View style={styles.rect2}>
  <LineChart
    data={{
      
      labels: [
      moment(new Date()).subtract(6,'days').format("DD/MM"),
      moment(new Date()).subtract(5,'days').format("DD/MM"),
      moment(new Date()).subtract(4,'days').format("DD/MM"),
      moment(new Date()).subtract(3,'days').format("DD/MM"),
      moment(new Date()).subtract(2,'days').format("DD/MM"),
      moment(new Date()).subtract(1,'days').format("DD/MM"),
      moment(new Date()).format("DD/MM")
       ],
      datasets: [
        {
          data: totals
     
        }
      ],
      legend: ["Daily Sales"]
    }}
    
    width={Dimensions.get("window").width} // from react-native
    height={210}
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
     
      backgroundGradientFrom: "#311D52",
      backgroundGradientTo: "#602a70",
      decimalPlaces: 0, 
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
     
      propsForDots: {
        r: "6",
        strokeWidth: "2",
       
      },
      propsForLabels: {
        
      }
    }}
    
    style={{
    
    }}
  />

  </View>
  <View style={styles.rect3}>
    <View style={styles.iconRow}>


    <TouchableOpacity
        onPress={() => this.props.navigation.navigate('Home')}
        style={styles.circle}>
    <FontAwesomeIcon icon={faHome} size={40} style={styles.icon}></FontAwesomeIcon>
    <Text style={styles.icontext}>Home</Text>
    </TouchableOpacity>

    <TouchableOpacity
        onPress={() =>  this.props.navigation.navigate('Products')}
        style={styles.circle}>
    <FontAwesomeIcon icon={faShoppingBag} size={32} style={styles.icon1}></FontAwesomeIcon>
    <Text style={styles.icontext}>Products</Text>
    </TouchableOpacity>
    
    <TouchableOpacity
        onPress={() =>  this.props.navigation.navigate('Records')}
        style={styles.circle}>
    <FontAwesomeIcon icon={faFileInvoiceDollar} size={32} style={styles.icon1}></FontAwesomeIcon>
    <Text style={styles.icontext}>Records</Text>
    </TouchableOpacity>

    <TouchableOpacity
        onPress={() => {auth.signOut().then(() => 
        this.props.navigation.navigate("SignIn"))
        console.log('Logged out');
        RNRestart.Restart();}}
        style={styles.circle}>

    <FontAwesomeIcon icon={faSignOutAlt} size={32} style={styles.icon1}></FontAwesomeIcon>
    <Text style={styles.icontext}>Log Out</Text>
    </TouchableOpacity>
   
    </View>
  </View>
<View style={{flex:1}}>
<FlatList 
     
     data={this.state.productList}
     extraData={this.state.quantity}
     ItemSeparatorComponent={() => <Divider style={{ backgroundColor: 'black' }} />}
     keyExtractor={(item, index) => index.toString()}
     refreshControl={
      <RefreshControl
        refreshing={this.state.refreshing}
        onRefresh={this._onRefresh.bind(this)}
      />}
     renderItem={({item, index}) => {
      
       
        return(

          <TouchableOpacity 
          style={styles.rect4}
          onLongPress={() => 
            {
              Alert.alert(
              "Place an order?", //alert title
               'This will bring you to an external webpage', //alert desc
              [ //buttons
              {
               text: "Ok",
               onPress: () => {{
                Linking.openURL(item.productlink);
               }}
              },
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              ],
                 {cancelable: true} //lets alert be closed from outward taps
              );}}>

          <Image source={item.picture}  style={styles.avatar} />
          
          <View style={styles.listItem}>
            <Text style={{fontWeight:"bold", fontSize: 30}}>{item.name}</Text>
            <Text style={{fontWeight:"bold",  fontSize: 40, color: '#969696'}}>{item.quantity} IN STOCK</Text>
        
            </View>
        </TouchableOpacity>
        )
        
      }
    }
    />
</View>

</View>
   

</SafeAreaView>


    );
  
}}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  avatar: {
    width: 100,
    height: 100,
    overflow:'hidden',
    justifyContent: 'flex-end',
  },

  listItem: {
    margin: 10,
 
  },
  
  rect: {
   flex: 1,
    backgroundColor: '#F4F4F4'
  },
  rect2: {
   height: 240,
    backgroundColor: "black",
    backgroundColor: "#311D52",
  },
  rect3: {
    height: 120,
    backgroundColor: "white",
    flexDirection: "row",
    paddingBottom: 20
  },
  rect4: {
    height: 100,
    flexDirection: "row",
    margin: 10,
    backgroundColor: '#F4F4F4'
  },
  icon: {
    color: "white",
    margin: 9
  },
  icon1: {
    color: "white",
    margin: 14,
  },
  iconRow: {
    flexDirection: "row",
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 60/ 2,
    backgroundColor: "#FEA82F",
    zIndex: -1,
    margin: 25
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
  icontext: {
    textAlign: 'center', // <-- the magic
    marginTop: 5
  },
  text: {
  fontSize: 42
  },
  text2: {
    color: "white",
    fontSize: 15,
    margin: 5
    },
  scrollView: {
    backgroundColor: 'pink',
    marginTop: 350
  },
  modalBg: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    
  },
  
  modalContainer: {
    width: '60%',
    backgroundColor: '#FF367E',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 10,
    marginBottom: 20,
    marginRight: 20

  },

});
export default HomeScreen
