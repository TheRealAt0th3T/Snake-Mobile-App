import React, { useState, useEffect } from 'react';
import {
  TextInput,
  VirtualizedList,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Text,
  Pressable,
  Modal,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import {getName} from './App.js';

const styles = StyleSheet.create({
  container: {
   flex:1,
   paddingTop: '3%',
  },
  title: {
    fontSize: 22,
    padding: 10,
    
  },
  scroll: {
    flex: 8,
  },
  btn: {
    width: '40%',
    padding: '2%'
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  overhead: {
    flex:1,
    textAlign: 'center',
    justifyContent: 'center',
    backgroundColor: '#545454',
    textAlignVertical: 'center',
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold',
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 65,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  inputbox: {
    borderWidth: 2,
    height: 50,
    width: 200,
    fontSize: 22,
    padding:4
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    borderRadius: 10,
    padding: 8,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0, 0, 0, 0.9)'
  },
  });

/*
  ************************************************************************************************
                          Welcome to the LeaderBoard component and UI!
  Currently being developed by Hannah Jacobson
  The LeaderBoard makes use of a virtualized list to display the high scores of Snake players.
  Data is stored on the boisestate remote server.
  The Leaderboard updates and saves once a player submits their name, and not a moment before!

  ************************************************************************************************
*/
var showBoard = false;


const LeaderBoard = (props) => {
  const nav = useNavigation();
  /*
    **********************************************************************************************
    ADJUSTMENT VARIABLES
    **********************************************************************************************
  */
  const numScoresLoaded = 20;
  const titleText = "LEADERBOARD";
  const modalTitle = "Enter Name Here";
 
  var playerScore = props.score;
  //console.log("Got " + playerScore);
  //console.log("Got " + props.score);

  var address =
    'https://cs.boisestate.edu/~scutchin/cs402/codesnips/loadjson.php?user=hannahjakes';
  var saveAddress =
    'https://cs.boisestate.edu/~scutchin/cs402/codesnips/savejson.php?user=hannahjakes';

  var uniqueKey = 0;
  var emptyData = [];
  var firstList = [];
  var emptyList = [];

  const [list, setlist] = useState(firstList);
  const getItemCount = (data) => list.length;
  const getItem = (data, index) => list[index];
  const [modalVisible, setModalVisible] = useState(true);
  const [newdata, setNewData] = useState("BabySn4ke");
  const [saved, setSave] = useState(false);

  const Item = ({ item, onPress, backgroundColor, textColor }) => (
      <Text style={[styles.title, textColor]}>{item.key}.{item.name}       {item.score}</Text>
  );

  // const DEF_DELAY = 1000;

  // function sleep(ms) {
  //   return new Promise(resolve => setTimeout(resolve, ms || DEF_DELAY));
  // }

 useEffect(() => {
   //console.log("Save Check");
    if(saved){
      //console.log("Call Save");
      saveList();
    }
  }, [saved]);

  async function loadAdd(){
    const response = await fetch(address);
    const fetchedItems = await response.json();
    //playerScore = props.func();

    var getList = [];
    uniqueKey = 0;

    fetchedItems.forEach((obj) => {
      uniqueKey++;
      obj.key = uniqueKey;
      getList.push(obj);
    });

    //console.log(getList.length);

    //await sleep(1000);

    uniqueKey = 0;
    const newList = [];
    var newscore = { key: uniqueKey, name: newdata, score: playerScore };
    var inserted = false;

    if(getList.length == 0){
      uniqueKey++;
      newscore.key = uniqueKey;
      newList.push(newscore);
      inserted = true;
    //console.log("Plus1")
    }
    else{
      //console.log("Plus2")
      getList.forEach((obj) => {
        //console.log("Plus3")
        uniqueKey++;
        if(obj.score <= newscore.score && !inserted){

          if(uniqueKey <= numScoresLoaded){
            newscore.key = uniqueKey;
            newList.push(newscore);

            uniqueKey++;
          }
          if(uniqueKey <= numScoresLoaded){
            obj.key = uniqueKey;
            newList.push(obj);
          }
          inserted = true;
        }
        else if (uniqueKey <= numScoresLoaded){
          obj.key = uniqueKey;
          newList.push(obj);
        }
      });
    }
    if(!inserted && uniqueKey < numScoresLoaded){
      uniqueKey++;
      newscore.key = uniqueKey;
      newList.push(newscore);
    }

    setlist(newList);
    setSave(true);

  }

  async function saveList(){
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(list),
    };

    const response = await fetch(saveAddress, requestOptions);
    setSave(false);
  }

  function clearList(){
    var newList = [];
    uniqueKey = 0;

    setlist(newList);

    alert("Cleared");
  }

  const renderItem = ({ item }) => {
    const backgroundColor = item.selected ? '#7960b5' : 'white';
    const color = item.selected ? 'white' : 'black';
    return (
      <Item
        item={item}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };


    var alist = 
    <View style={styles.container}>
    
    <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{modalTitle}</Text>
            <TextInput style={styles.inputbox} value={newdata} onChangeText={setNewData}/>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {setModalVisible(!modalVisible), loadAdd()}}
            >
              <Text style={styles.textStyle}>Submit</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <View style={styles.container}>
        <Text style={styles.overhead}>{titleText}</Text>
      </View>
      <View style={styles.scroll}>
        <VirtualizedList
          data={emptyData}
          renderItem={renderItem}
          initialNumToRender={4}
          keyExtractor={(item, index) => index}
          getItemCount={getItemCount}
          getItem={getItem}
        />
      </View>


      
      
    </View>

  

    return (alist); 
};

export default LeaderBoard;