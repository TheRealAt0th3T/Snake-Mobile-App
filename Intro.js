import React,{useState} from 'react';
import { StyleSheet, View,Text, SafeAreaView,Button, TextInput, Keyboard,TouchableWithoutFeedback} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation } from '@react-navigation/native';


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
        <Button style={styles.Button}
          title='Description'
          onPress={()=>nav.navigate('Description')}
        />
        
        <Button style={styles.Button}
          title='Start Game'
          onPress={()=>{nav.navigate('Snake')}}
        />

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
    backgroundColor: 'grey',
    alignItems: 'center',
    //justifyContent: 'space-around',
    alignContent:'flex-end',
  },

  text:{
    fontSize:75,
    fontFamily: 'Helvetica',
    marginTop: '25%',
  },

  input:{
    width: '50%',
    height:'5%',
    borderColor:'black',
    borderWidth:1,
    marginTop: '65%',
  },
  ButtonContainer: {
    
  }
});