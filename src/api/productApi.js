import firestore from '@react-native-firebase/firestore';
import { auth } from '../config/db';
import firebase from 'firebase';


export function addProduct(product, addComplete){

    var newDocRef = firestore().collection('userId').doc(auth.currentUser.uid).collection('product').doc();

    newDocRef.set({
    
        picture: product.picture,
        productid: newDocRef.id,
        userId: auth.currentUser.uid,
        name: product.name,
        desc: product.desc,
        quantity: product.quantity,
        price: product.price,
        productlink: product.productlink,
        createdAt: firestore.FieldValue.serverTimestamp()
        
    })
    
    newDocRef.get()
    .then ((productData) => addComplete (productData.data()))
    .catch((error) => console.log(error));

}



export function DeleteProduct(product, deleteComplete){

    console.log(product.productid)

    firestore()
    .collection('userId')
    .doc(auth.currentUser.uid)
    .collection('product')
    .doc(product.productid)
    .delete()
    .catch((error) => console.log(error));
  
}

export function addTransaction(transaction, addComplete){
  

    var newDocRef = firestore().collection('userId').doc(auth.currentUser.uid).collection('transaction').doc();

    newDocRef.set({
    
        userId: auth.currentUser.uid,
        transid: newDocRef.id, //this is transactionid
        name: transaction.name,
        id: transaction.id, //this is product id
        quantity: transaction.quantity,
        sales: transaction.sales,
        transactionDate: transaction.transactionDate,
        datetime: transaction.datetime,
        createdAt: firestore.FieldValue.serverTimestamp()
 
        
    })
    
    newDocRef.get()
    .then ((transactionData) => addComplete (transactionData.data()))
    .catch((error) => console.log(error));



   const productid = transaction.id;
   const qty = parseInt(transaction.quantity);


   const increment = firestore.FieldValue.increment(qty);


   firestore()
   .collection('userId')
   .doc(auth.currentUser.uid)
   .collection('product')
   .doc(productid)
   .update({
    quantity: increment,
  }).catch((error) => console.log(error));;
  console.log('Quantity Updated');
}


export async function getProduct(productsRetrieved){
  
    const uid = auth.currentUser.uid
    var productList =[];

    var snapshot = await firestore()
    .collection('userId')
    .doc(uid)
    .collection('product')
    .orderBy('createdAt')
    .get()

    snapshot.forEach((doc) => {
        productList.push(doc.data());
    }),
 
 
    console.log(productList);
    productsRetrieved(productList);
}


export async function getTransaction(transactionsRetrieved){
  
    var transactionList =[];
    const uid = auth.currentUser.uid
    var snapshot = await firestore()
    .collection('userId')
    .doc(uid)
    .collection('transaction')
    .orderBy('createdAt')
    .get()

    snapshot.forEach((doc) => {
        transactionList.push(doc.data());
    }),
 
    console.log(transactionList);
    transactionsRetrieved(transactionList);
}


export async function getQuantity(graphRetrieved, date1, date2, date3, date4, date5, date6, date7){
  

    const uid = auth.currentUser.uid

    var graph1=[], graph2=[], graph3=[], graph4=[], graph5=[], graph6=[], graph7=[] // array will store transaction object according to date
    var snapshot = await firestore() // get transaction object and push into new graph array
    .collection('userId')
    .doc(uid)
    .collection('transaction')
    .where("datetime", '==', date1 )
    .get()

    snapshot.forEach((doc) => {
        graph1.push(doc.data());
    }),

    snapshot = await firestore()
    .collection('userId')
    .doc(uid)
    .collection('transaction')
    .where("datetime", '==', date2 )
    .get()

    snapshot.forEach((doc) => {
        graph2.push(doc.data());
    }),
    snapshot = await firestore()
    .collection('userId')
    .doc(uid)
    .collection('transaction')
    .where("datetime", '==', date3 )
    .get()

    snapshot.forEach((doc) => {
        graph3.push(doc.data());
    }),
    snapshot = await firestore()
    .collection('userId')
    .doc(uid)
    .collection('transaction')
    .where("datetime", '==', date4 )
    .get()

    snapshot.forEach((doc) => {
        graph4.push(doc.data());
    }),
    snapshot = await firestore()
    .collection('userId')
    .doc(uid)
    .collection('transaction')
    .where("datetime", '==', date5 )
    .get()

    snapshot.forEach((doc) => {
        graph5.push(doc.data());
    }),
    snapshot = await firestore()
    .collection('userId')
    .doc(uid)
    .collection('transaction')
    .where("datetime", '==', date6 )
    .get()

    snapshot.forEach((doc) => {
        graph6.push(doc.data());
    }),
    snapshot = await firestore()
    .collection('userId')
    .doc(uid)
    .collection('transaction')
    .where("datetime", '==', date7 )
    .get()

    snapshot.forEach((doc) => {
        graph7.push(doc.data());
    }),


    graphRetrieved(graph1, graph2, graph3, graph4, graph5, graph6, graph7);
    console.log("graph quantity retrieved")
    console.log(graph1)
}

export function DeleteTrans(transaction, deleteComplete){

    console.log(transaction.transid)

    firestore()
    .collection('userId')
    .doc(auth.currentUser.uid)
    .collection('transaction')
    .doc(transaction.transid) 
    .delete()
    .catch((error) => console.log(error));
  
}
