import React, { useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import { Text, View, StyleSheet,Button,LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import LeaderBoard from './Leaderboard';
import SnakeRedirect from './SnakeRedirect.js'
import LeaderRedirect from './LeaderRedirect.js'
import Snake from './Snake';
import Intro from './Intro';
import Description from './components/Description';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {YellowBox} from 'react-native';

LogBox.ignoreLogs(['']);
/*
  ************************************************************************************************
                                        Welcome to Snake!
  Currently being developed by Amara Tariq, Jerry Liu, and Hannah Jacobson
  App.js acts as the controlling code behind which view is displayed: The Main Menu, How to Play,
  Snake, or The Leaderboard. 

  ************************************************************************************************
*/

const Stack = createStackNavigator();

export const AppNavigator = () => (
  <Stack.Navigator screenOptions={{gestureEnabled: false}}>
    <Stack.Screen options={{headerShown: false}} 
    name="Intro" component={Intro} 
    />
    <Stack.Screen name="Description" component={Description} />
    <Stack.Screen options={{ headerShown: false}}
    name="Snake" component={SnakeRedirect}/>
    <Stack.Screen options={{ headerShown: false}}
    name="LeaderBoard" component={LeaderRedirect} />
  </Stack.Navigator>
);


const App = ()=>(
  <NavigationContainer>
  <AppNavigator />
  </NavigationContainer>
)

export default App;


const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});