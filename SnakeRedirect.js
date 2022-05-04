import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet,Button, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Snake from './Snake.js'
import AsyncStorage from '@react-native-async-storage/async-storage';

var buttonText='Leaderboard'
const SnakeRedirect =()=> {
   const nav =useNavigation();

  const [childData, setChildData] = useState(0);
  const [showButton, setShowButton] = useState(true);

  async function storeScore(){
    await AsyncStorage.setItem("@score",childData.toString());
    //console.log(childData + " stored!");
  }

   return(
    <View style={styles.container}>
      <Snake func={setChildData} button={setShowButton}/>

       <TouchableOpacity  style={styles.button} disabled={showButton}
        onPress={()=>{nav.navigate('LeaderBoard'); storeScore();}}>

        <Text style={{color:'white'}}>{buttonText}</Text>
        </TouchableOpacity>
    </View>
   )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom:10,
    backgroundColor:'#a3baff',
    alignItems:'center',
    
  },
  button:{
    height:'5%',
     left: '30%',
    width: 90,
    backgroundColor:'black',
    borderRadius:15,
    justifyContent:'center',
    alignItems:'center',

  },
});

export default SnakeRedirect;