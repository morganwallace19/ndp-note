import { StyleSheet, View, Text, Image } from "react-native"
import { Camera, CameraType, Constants } from "expo-camera"
import React, { useState, useEffect, useRef } from "react"
import * as MediaLibrary from 'expo-media-library'
import Button from "../components/Button"
import { MaterialIcons } from '@expo/vector-icons'


const CameraClass = () => {
const [hasCameraPermission, setHasCameraPermission] = useState(null);
const [image, setImage] = useState(null);
const [type, setType] = useState(Camera.Constants.Type.back);
const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
const cameraRef = useRef(null);

useEffect(() => {
    (async () => {
        MediaLibrary.requestPermissionsAsync();
        const cameraStatus = await Camera.requestCameraPermissionsAsync();
        setHasCameraPermission(cameraStatus.status === 'granted');
    })();
}, [])

const takePicture = async () => {
    if(cameraRef) {
        try {
            const data = await cameraRef.current.takePictureAsync();
            console.log(data);
            setImage(data.uri);
        } catch(e) {
            console.log(e);
        }
    }
}
const saveImage = async() => {
    if(image) {
        try {
            await MediaLibrary.createAssetAsync(image);
            alert('Picture saved!')
            setImage(null);
        } catch(e) {
            console.log(e)
        }
    }
}

if(hasCameraPermission === false) {
    return <Text>No access to camera</Text>
}


return (
    <View style={styles.container}>
        {!image ? (
        <Camera
        style={styles.camera}
        type={type}
        flashMode={flash}
        ref={cameraRef}
        >
            <View style={{ 
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 30,
             }}
             >
                <Button icon={'retweet'} color='#fff' onPress={() => {
                    setType(type === CameraType.back ? CameraType.front : CameraType.back)
                }}/>
                <Button icon={'flash'} 
                color={flash === Camera.Constants.FlashMode.off ? 'gray' : '#fff'}
                onPress={() => {
                    setFlash(flash === Camera.Constants.FlashMode.off 
                        ? Camera.Constants.FlashMode.on
                        : Camera.Constants.FlashMode.off
                        )
                }} />
            </View>
        </Camera>
         ) : ( 
        <Image source={{ uri: image }} style={styles.camera}/>
        )}
        <View>
            {image ? 
            <View style={{ 
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 50
             }}>
                <Button title={"Re-take"} icon="retweet" onPress={() => setImage(null)} />
                <Button title={"Save"} icon="check" onPress={saveImage} />
            </View>
            :
            <Button title={'Take a picture'} icon="camera" onPress={takePicture}/>
            }
        </View>
    </View>
);
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        padding: 8,
        backgroundColor: 'black',
      },
      controls: {
        flex: 0.5,
      },
      button: {
        height: 40,
        borderRadius: 6,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },
      text: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#E9730F',
        marginLeft: 10,
      },
      camera: {
        borderRadius: 20,
        flex: 5,
      },
      topControls: {
        flex: 1,
      },
});

export default CameraClass;