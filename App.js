import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import LeaderBoard from './Leaderboard.js';

/*
  ************************************************************************************************
                                        WORK IN PROGRESS 
  Welcome to Snake!
  Currently being developed by Amara Tariq, Jerry Liu, and Hannah Jacobson

  App.js acts as the controlling code behind which view is displayed: The Main Menu, How to Play,
  Snake, or The Leaderboard. 

  Currently, the Leaderboard is being displayed for demonstration purposes.

  Testing:

  ToDo List:
    Add boolean values and button controls for displaying the various components and screens.
    Styling!

  ************************************************************************************************
*/
export default function App() {

  //Change to false hide Leaderboard
  const [leaderView, setLeaderView] = useState(true);

  var snakeui = <Text> Major Failure </Text>

  if(leaderView){
    snakeui = <View style={styles.container}>
                <LeaderBoard/>
              </View>
  }
  else{
    snakeui = <View style={styles.container}>
                "Default Screen."
              </View>
  }



  return (snakeui)
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

