import React, { useState, useEffect } from 'react';
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet,Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Snake from './Snake.js'
import AsyncStorage from '@react-native-async-storage/async-storage';

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
      <Button
        title='Leaderboard'
        disabled={showButton}
        onPress={()=>{nav.navigate('LeaderBoard'); storeScore();}}
      /> 
    </View>
   )
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default SnakeRedirect;