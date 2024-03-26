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
import Camera from './app/screens/CameraClass';
import CameraClass from './app/screens/CameraClass';
import Phone from './app/screens/Phone';

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState({ });
  const [isAppFirstTimeOpen, setIsAppFirstTimeOpen] = useState(false);

  const findUser = async () => {
    const result = await AsyncStorage.getItem('user')

    if (result === null) return setIsAppFirstTimeOpen(true);

    setUser(JSON.parse(result));
    setIsAppFirstTimeOpen(false);
//    console.log(result)
  };

  useEffect(() => {
    findUser()
  }, []);

  const RenderNoteScreen = props => <NoteScreen {...props} user={user} />;

  if (isAppFirstTimeOpen) return <Intro onFinish={findUser} />;

  return (
    <NavigationContainer>
      <NoteProvider>
        <Stack.Navigator
        screenOptions={{ headerTitle: '', headerTransparent: true }}
        >
          <Stack.Screen component={RenderNoteScreen} name='NoteScreen' />
          <Stack.Screen component={NoteDetail} name='NoteDetail' />
          <Stack.Screen component={CameraClass} name='Camera' />
          <Stack.Screen component={Phone} name='Phone' />
          
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
