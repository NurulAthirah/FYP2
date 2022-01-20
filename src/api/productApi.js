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
  
    console.log("hey")
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

export function DeleteTrans(transaction, deleteComplete){

    console.log(transaction.transid)

    firestore()
    .collection('userId')
    .doc(auth.currentUser.uid)
    .collection('transaction')
    .doc(transaction.transid) //its not gonna work yet 
    .delete()
    .catch((error) => console.log(error));
  
}
