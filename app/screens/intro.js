import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TextInput, StatusBar, Dimensions } from 'react-native';
import colors from "../misc/colors";
import RoundIconBtn from "../components/RoundIconBtn";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Intro = ({ onFinish }) => {
    // new
    const navigation = useNavigation();

    const [name, setName] = useState('')
    const handleOnChangeText = (text) => setName(text);
   
   
    const handleSubmit = async () => {
        const user = { name: name}
        await AsyncStorage.setItem('user', JSON.stringify(user));
        if (onFinish) onFinish();
    };

    // new
    const handleCameraPress = () => {
        navigation.navigate('Camera')
    }

    //console.log(user);

    return (
        <>
        <StatusBar hidden />
        <View style={styles.container}>
            <Text style={styles.inputTitle}>Enter your name to continue:</Text>
            <TextInput 
            value={name} 
            onChangeText={handleOnChangeText}
            placeholder="Enter your Name" 
            style={styles.textInput} 
            />
           {name.trim().length >= 3 ? ( 
            <>
           <RoundIconBtn antIconName='arrowright' onPress={handleSubmit} />
           <RoundIconBtn antIconName='camerao' onPress={handleCameraPress} />
           </>
           ) : null}
        </View>
        </>
    )
}

const width = Dimensions.get('window').width - 50;
//console.log(width)

    const styles = StyleSheet.create({
        container:{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        textInput : {
            borderWidth: 2,
            borderColor: colors.PRIMARY,
            color: colors.PRIMARY,
            width,
            height: 50,
            borderRadius: 10,
            paddingLeft: 15,
            fontSize: 25,
            marginBottom: 15,
        },
        inputTitle: {
            alignSelf: 'flex-start',
            paddingLeft: 25,
            marginBottom: 5,
            opacity: 0.5,
        },
    });

    export default Intro;
