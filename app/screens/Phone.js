// new code
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import * as SMS from 'expo-sms'
import { useState } from 'react';

const Phone = () => {
    // new code
    const [number, setNumber] = useState('');
    const [message, setMessage] = useState('');

    const checkSMS = async () => {
        const isAvailable = await SMS.isAvailableAsync();

        if (isAvailable) {
            alert('SMS is available on this device');
        } else {
            alert('SMS is not available on this device');
        }
    };

    const sendSMS = async () => {
        const { result } = await SMS.sendSMSAsync(number, message);
        if (result === 'sent') {
            alert('Message sent successfully');
        }
    };

    return (
        <>
        {/* New code */}
        <Text style={styles.title}>Expo SMS Demo</Text>
            <Button
            title='Check SMS Availability'
            onPress={checkSMS} 
            />
            <TextInput
            style={styles.input}
            placeholder='Enter Phone Number'
            value={number}
            onChangeText={setNumber}
            keyboardType='phone-pad'
            />
            <TextInput
            style={styles.input}
            placeholder='Enter Message'
            value={message}
            onChangeText={setMessage}
            multiline
            />
            <Button
            title='Send Message' onPress={sendSMS} />
            </>
            
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        margin: 10,
    },
    input: {
        width: 300,
        height: 90,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10,
        padding: 10
    }
});

export default Phone