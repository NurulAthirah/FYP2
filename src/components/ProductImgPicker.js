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

    const options = {
        maxWidth: 2000,
        maxHeight: 2000,
        storageOptions: {
          skipBackup: true,
          path: 'images'
        }
      };

pickImageHandler = () => {
    launchImageLibrary(options, response => {
            
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          const source = { uri: response.assets[0].uri };
          const source2 = response.assets[0].uri;
          console.log(source);
          setSelectedImage(source);
          onImagePicked(source);
        }
      });
    };

return (
    <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={image} style={styles.previewImage}/>
        </View>
        <View>
           <Button title="Pick Image" onPress={pickImageHandler} color='#FF367E'/> 
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
