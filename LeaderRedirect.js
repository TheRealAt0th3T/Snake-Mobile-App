import React, { useState, useEffect } from 'react';
import { Text, SafeAreaView, StyleSheet,Button, TouchableOpacity, View} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LeaderBoard from './Leaderboard.js'
import AsyncStorage from '@react-native-async-storage/async-storage';

var buttonText = 'Main Menu'
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
  <SafeAreaView style={styles.container}>
      <LeaderBoard score={playScore}/>
      
      <View style = {styles.buttonContainer}>
      <TouchableOpacity  style={styles.button} 
        onPress={()=>nav.navigate('Intro')}
        >
      
        <Text style={{color:'white'}}>{buttonText}</Text>
      </TouchableOpacity>
      </View> 
    </SafeAreaView>
  
   return(returnThis)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    
  },
  buttonContainer:{
    alignItems:'center',
    bottom:-75
  },
  button:{
    backgroundColor:'black',
    borderRadius:15,
    height:'25%',
    width:'30%',
    justifyContent:'center',
    alignItems:'center',
  }
});

export default LeaderRedirect;
