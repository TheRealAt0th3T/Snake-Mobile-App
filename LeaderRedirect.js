import React, { useState, useEffect } from 'react';
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet,Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LeaderBoard from './Leaderboard.js'
import AsyncStorage from '@react-native-async-storage/async-storage';

const LeaderRedirect =()=> {
   const nav =useNavigation();
   var value;

  const[playScore, setPlayScore] = useState(0);

  async function setScore(){
    await AsyncStorage.getItem('@score').then((userToken)=>{
      value = userToken;
      //console.log("This" + userToken);
      setPlayScore(userToken);
    });
  } 

  const playerScore = setScore();

  var returnThis =
  <View style={styles.container}>
      <LeaderBoard score={playScore}/>
      <Button
        title='Main Menu'
        onPress={()=>nav.navigate('Intro')}
      /> 
    </View>
  
   return(returnThis)
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default LeaderRedirect;