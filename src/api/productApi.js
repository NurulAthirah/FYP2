import firestore from '@react-native-firebase/firestore';
import { auth } from '../config/db';
import firebase from 'firebase';


export function addProduct(product, addComplete){

     firestore()
    .collection('userId')
    .doc(auth.currentUser.uid)
    .collection('product')
    .add({ //add in doc id
        userId: auth.currentUser.uid,
        name: product.name,
        desc: product.desc,
        quantity: product.quantity,
        price: product.price,
        productlink: product.productlink,
        color: product.color,
        createdAt: firestore.FieldValue.serverTimestamp()
        
    }).then((snapshot) => snapshot.get())
    .then ((productData) => addComplete (productData.data()))
    .catch((error) => console.log(error));
}

export function addTransaction(transaction, addComplete){

    firestore()
   .collection('userId')
   .doc(auth.currentUser.uid)
   .collection('product')
   .doc() //docid products
   .collection('transaction')
   .add({
       userId: auth.currentUser.uid,
       name: transaction.name,
       quantity: transaction.quantity,
       sales: transaction.sales,
       transactionDate: transaction.transactionDate,
       datetime: transaction.datetime,
       createdAt: firestore.FieldValue.serverTimestamp()
       
   }).then((snapshot) => snapshot.get())
   .then ((transactionData) => addComplete (transactionData.data()))
   .catch((error) => console.log(error));
}

export async function updateQuantity(){
    //update quantity of products based on transaction



}


export async function getProduct(productsRetrieved){
  
    
    const uid = auth.currentUser.uid
  //  const increaseBy = firebase.firestore.FieldValue.increment(1)
    var productList =[];

    firestore()
    .collection('userId')
    .doc(uid)
    .collection('product')
    .doc('6Dp2WTao1SaQVdVjy3P8')
    .update(
        {
            quantity: 15 //idk how to actually increment. using firestore.FieldValue.increment will give object error. I can change but not increment
        }
    ) .catch((error) => console.log(error));



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
