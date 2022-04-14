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
   flex:1
  },
  title: {
    fontSize: 22,
    padding: 10,
  },
  scroll: {
    flex: 8,
  },
  btn: {
    width: '25%',
  }
  });

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

  ToDo List:
    Add properties taken from the playable SnakeGame component so accurate scores/names can
        be recorded.
    Save and load the list from a functioning URL.
    Write function for clearing the saved list.
    Randomize testing scores input with plusButton().
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

  useEffect(() => {
    if (list.length == 0) {
      var response = loadList(address, list);
    }
  }, []);

  function loadButton() {
    const response = loadList(address, list);
    alert('Loaded!');
  }

  function saveButton() {
    const response = saveList(saveAddress, list);
    alert('Saved!');
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

  async function saveList(myUrl, list) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(list),
    };

    const response = await fetch(myUrl, requestOptions);
  }

  //For testing purposes. Can be converted once we have actual scores to enter
  function plusButton() {
    uniqueKey = 0;
    const newList = [];
    var newscore = { key: uniqueKey, name: "Hannah", selected: false, score: 100 };
    var inserted = false;

    if(list == firstList){
      uniqueKey++;
      newscore.key = uniqueKey;
      newList.push(newscore);
      inserted = true;
    }
    else{
      list.forEach((obj) => {
      uniqueKey++;
      if(obj.score < newscore.score && !inserted){
        newscore.key = uniqueKey;
        newList.push(newscore);

        uniqueKey++;
        obj.key = uniqueKey;
        newList.push(obj);
        inserted = true;
      }
      else{
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

    //const response = saveList(saveAddress, list);
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
      </View>
    </View>

    return (alist); 
};

export default LeaderBoard;
