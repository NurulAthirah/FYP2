import React, {useState, useEffect} from 'react';
import {
    View,
    Button,
    Image,
    StyleSheet,
    ImageStore
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const ProductImgPicker = ({image, onImagePicked}) =>{
    
    const [selectedImage, setSelectedImage] = useState();

    useEffect(() => {
        if (image) {
            console.log("useEffect: " + image );
            setSelectedImage({uri: image});
        }
    }, [image])



pickImageHandler = () => {
    launchImageLibrary({ title: 'Pick an Image', maxWidth: 800, maxHeight: 600 })
    response => {
        if (response.errorCode) {
            console.log("image error", response.errorMessage);
        } else {
            setSelectedImage({ uri: response.uri });
            onImagePicked({ uri: response.uri });
            console.log("Image: " + response.uri) 
        }
    }
}

return (
    <View style={styles.container}>
        <View style={styles.imageContainer}>
            <Image source={selectedImage} style={styles.previewImage}/>
        </View>
        <View>


           <Button title="Pick Image"  onPress={this.pickImageHandler} color='#FF367E'/> 
        </View>
    </View>
)
}

const styles = StyleSheet.create({
    container: {
      width: '100%',
      alignItems: 'center'
    },
    imageContainer: {
      borderWidth: 1,
      borderColor: 'black',
      backgroundColor: '#eee',
      width: '80%',
      height: 150,
      margin: 10
    },
    button: {
      margin: 8
    },
    previewImage: {
      width: '100%',
      height: '100%'
    }
  })
  
  export default ProductImgPicker;