import React from 'react';
import { StyleSheet, Text, SafeAreaView,Button,TouchableOpacity,View } from 'react-native';
import {useNavigation } from '@react-navigation/native';

//PLACEHOLDER CODE
var descHead = "Welcome to Snake!";
var descText = "For those not in The Know, snake is a game about eating food and never stopping the grind! \n\nTo control the snake, use the square-shaped buttons in the gamepad to direct it up, down, left, or right. When the snake encounters a piece of food, it eats it and grows in length. If the snake runs into a wall or its own tail, game over. \n\nHave fun!";
var creditText = "Credits: Amara Tariq, Jerry Liu, Hannah Jacobson";
var buttonText = 'Back';
export default function Description(){
  const nav = useNavigation();
  
  return(
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>{descHead}</Text>
      <Text style={styles.midText}>{descText}</Text>
      <Text style={styles.credits}>{creditText}</Text>    
      <TouchableOpacity  style={styles.button}
          onPress={()=>nav.navigate('Intro')}>
        <Text style={{color:'white'}}>{buttonText}</Text>
        </TouchableOpacity>

    </SafeAreaView> 
  )
}

//export default Description;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flex:2,
    textAlignVertical: 'center',
    fontSize: 36,
    marginTop:35,
    fontWeight: 'bold'
  },
  midText: {
    flex:3,
    fontSize: 18,
    padding: 20,
    textAlign: 'justify'
  },
  credits:{
    flex:1
  },
  button:{
    backgroundColor:'black',
    borderRadius:15,
    height:'5%',
    width:'30%',
    justifyContent:'center',
    alignItems:'center',
    marginBottom:'10%'
  }
  
});