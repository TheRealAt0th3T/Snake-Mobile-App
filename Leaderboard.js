import React, { useState, useEffect } from 'react';
import {
  TextInput,
  VirtualizedList,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Constants from 'expo-constants';

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
    backgroundColor: '#b5addb',
    color: 'white',
    fontSize: 36,
  }
  });

  var testscore = 100;

/*
  ************************************************************************************************
                                        WORK IN PROGRESS 
  Welcome to the LeaderBoard component and UI!
  Currently being developed by Hannah Jacobson
  The LeaderBoard makes use of a virtualized list to display the high scores of Snake players.
  Testing:
    The 'Add' button is visible at this moment, demonstrating how the list adds people to
        the leaderboard. The number of people visible on the board is adjustable with the
        numScoresLoaded variable.
    The 'Clear' button is visible at this moment, allowing us to clear the list for testing
        purposes. 
    One of these buttons can be repurposed into a 'Return to Menu' button once testing is
        at that stage
        
  ToDo List:
    Add properties taken from the playable SnakeGame component so accurate scores/names can
        be recorded.
    Randomize testing scores input with plusButton().
    playerHighscore, playerName from props
    Create 'Return to Menu' button.
    Styling!
  ************************************************************************************************
*/
const LeaderBoard = () => {

  /*
    **********************************************************************************************
    ADJUSTMENT VARIABLES
    **********************************************************************************************
  */
  const numScoresLoaded = 5;
  const titleText = "LEADERBOARD";

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

  const Item = ({ item, onPress, backgroundColor, textColor }) => (
      <Text style={[styles.title, textColor]}>{item.key}.{item.name}       {item.score}</Text>
  );

  //Inital load when page is opened
  useEffect(() => {
    if(list.length == 0){
      var response = loadList(address, list);
    }
  }, []);

  //Save the list each time it is updated
  useEffect(() => {
      var response = saveList();
  }, [list]);

 
  function loadButton() {
    const response = loadList(address, list);
    //alert('Loaded!');
  }

  async function loadList(myUrl, myList) {
    const response = await fetch(myUrl);
    const fetchedItems = await response.json();

    var newList = [];
    uniqueKey = 0;

    fetchedItems.forEach((obj) => {
      uniqueKey++;
      obj.key = uniqueKey;
      newList.push(obj);
    });
    setlist(newList);
  }

  async function saveList(){
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(list),
    };

    const response = await fetch(saveAddress, requestOptions);
  }

  function clearList(){
    var newList = [];
    uniqueKey = 0;

    setlist(newList);

    alert("Cleared");
  }

  //For testing purposes. Can be converted once we have actual scores to enter
  function plusButton() {
    uniqueKey = 0;
    const newList = [];
    var newscore = { key: uniqueKey, name: "Hannah", score: testscore };
    var inserted = false;

    if(list.length == 0){
      uniqueKey++;
      newscore.key = uniqueKey;
      newList.push(newscore);
      inserted = true;
      alert("Length 0");
    }
    else{
      list.forEach((obj) => {
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
    testscore--;

    //alert("Saved");
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

      <View style={styles.buttonContainer}>
        <View style={styles.btn}>
         <Button color="#4a3480" title="Add" onPress={() => plusButton()} />
        </View>
        <View style={styles.btn}>
         <Button color="#4a3480" title="Clear" onPress={() => clearList()} />
        </View>
      </View>
    </View>

    return (alist); 
};

export default LeaderBoard;

