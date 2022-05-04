import React,{useState} from 'react';
import { StyleSheet, View,Text, SafeAreaView,Button, TextInput, Keyboard,TouchableWithoutFeedback, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation } from '@react-navigation/native';

var descriptionButtonText='Description'
var startButtonText = 'Start Game'
// The functions that deal with the async storage to store the username of the current game.
export const storeData = async (text) => {
  await AsyncStorage.setItem("@text",text )
  //console.log(text)
}

export const getData = async () => {
  let a = await AsyncStorage.getItem('@text');
  //console.log(a)
}

/**
 * Functionality: save the username to async storage
 *                game button will be disabled if theres no username input
 *                
 * @returns main page of the Menu/Intro
 */
export default function Intro() {
  const nav = useNavigation();
  const [text, setText] = useState("");
  const introTitle = "Snake";

  return ( 
    <TouchableWithoutFeedback onPress={ () => Keyboard.dismiss() }>
    <SafeAreaView style={styles.container}>
     
        <Text style={styles.text}>{introTitle}</Text>
      {/* <Text style={styles.text}>Current User:{text}</Text> */}
     
      <View style={styles.buttonContainer}>
        <TouchableOpacity  style={styles.button}
          onPress={()=>nav.navigate('Description')}>
        <Text style={{color:'white'}}>{descriptionButtonText}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity  style={styles.button}
          onPress={()=>nav.navigate('Snake')}>
        <Text style={{color:'white'}}>{startButtonText}</Text>
        </TouchableOpacity>

      </View>

      {/* <Button style={styles.Button}
        title='get name'
        onPress={()=>getData()}
      /> */}
   
    </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a3baff',
    alignItems: 'center',
    //justifyContent: 'space-around',
    alignContent:'flex-end',
  },
  text:{
    flex:2,
    fontSize:75,
    marginTop: '25%',
    fontWeight: 'bold',
    color:'white',
    textAlignVertical: 'center'
  },
  buttonContainer: {
    //flex:1,
    flexDirection:'row',
    marginBottom:'30%',
    justifyContent:'center'
    // borderRadius:40
  },
  button:{
    backgroundColor:'black',
    borderRadius:15,
    height:'30%',
    width:'30%',
    justifyContent:'center',
    alignItems:'center',
    
  }
  
  
});