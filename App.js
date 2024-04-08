import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Intro from './app/screens/intro';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import NoteScreen from './app/screens/NoteScreen';
import NoteDetail from './app/components/NoteDetail';
import NoteProvider from './app/contexts/NoteProvider';

import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import CameraClass from './app/screens/CameraClass';
import Phone from './app/screens/Phone';

// Initializing the stack navigator
const Stack = createStackNavigator();

// start of App
export default function App() {

  // useState hooks are used to initialze user as empty and 
  // isAppFirstTimeOpen as false
  const [user, setUser] = useState({ });
  const [isAppFirstTimeOpen, setIsAppFirstTimeOpen] = useState(false);

  // user data is retrieved by using AsyncStorage
  const findUser = async () => {
    const result = await AsyncStorage.getItem('user')

    if (result === null) return setIsAppFirstTimeOpen(true);

    setUser(JSON.parse(result));
    setIsAppFirstTimeOpen(false);
  };

  // useEffect hook calls findUser function
  useEffect(() => {
    findUser()
  }, []);

  // The function to render NoteScreen component
  const RenderNoteScreen = props => <NoteScreen {...props} user={user} />;

  // If statement
  if (isAppFirstTimeOpen) return <Intro onFinish={findUser} />;

  return (
    <NavigationContainer>
      <NoteProvider>
        <Stack.Navigator initialRouteName='NoteScreen'
        screenOptions={{ headerTitle: '', headerTransparent: true }}
        >
          <Stack.Screen component={RenderNoteScreen} name='NoteScreen' />
          <Stack.Screen component={NoteDetail} name='NoteDetail' />
          <Stack.Screen component={CameraClass} name='Camera' />
          <Stack.Screen component={Phone} name='Phone' />
          <Stack.Screen component={Intro} name='intro' />
        </Stack.Navigator>
      </NoteProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
