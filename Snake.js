import React, { Component } from "react";
import { StyleSheet, StatusBar, SafeAreaView, View, Alert, Text, Button, TouchableOpacity } from "react-native";
import { GameEngine, dispatch } from "react-native-game-engine";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Constants from './constants';
import { Head }  from './components/head.js';
import { Food } from './components/food.js';
import { GameLoop } from './components/gameLoop.js';
import { Tail } from './components/tail.js';

var newGameText = 'New Game'

 export default class Snake extends Component{
  constructor(props){
    super(props);
    this.boardSize = Constants.GRID_SIZE * Constants.CELL_SIZE; //setting game board size
    this.engine = null;
    this.state = {
      running: true 
    }
    this.score = 0;

  }

  functionHandler = (data) => {

    this.props.func(data);

  }

  buttonHandler = (data) => {

    this.props.button(data);

  }


  onEvent = (event, score) => {
    if(event.type === "gameOver"){
      Alert.alert("Game Over. Your score was "+ this.score);
      this.setState({ running: false })
      this.functionHandler(this.score);
      this.buttonHandler(false);
    }

    if(event.type === "increaseScore"){
      this.score += 10;
    }
  }

  reset = () => {
    this.engine.swap({
      head: {position:[0,0], size: Constants.CELL_SIZE, xspeed: 1, yspeed: 0,timer: Constants.timer, freq: Constants.freq, renderer: <Head /> }, 
      food: {position:[this.rand(0, Constants.GRID_SIZE -1),this.rand(0, Constants.GRID_SIZE -1)], size: Constants.CELL_SIZE, renderer: <Food />},
      tail: {size: Constants.CELL_SIZE, elements: [], renderer: <Tail />}
    });
    this.score = 0; 
    this.setState({
      running: true
    })
    this.buttonHandler(true);
  }

  //function for random number between a range
  rand = (min,max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  render(){
    return(
      <View style={styles.container}>
        
        <GameEngine ref = {(ref) => {this.engine = ref}} 
                    style={{width: this.boardSize, height: this.boardSize, flex: null, backgroundColor: "#ffffff"}}
                    entities={{ head: {position:[0,0], size: Constants.CELL_SIZE, xspeed: 1, yspeed: 0,timer: Constants.timer, freq: Constants.freq, //timer for when to update move
                                        renderer: <Head /> }, //the objects that will be shown on screen, inside each component is the props that its made out of 
                            food: {position:[this.rand(0, Constants.GRID_SIZE -1),this.rand(0, Constants.GRID_SIZE -1)], size: Constants.CELL_SIZE, renderer: <Food />},
                            tail: {size: Constants.CELL_SIZE, elements: [], renderer: <Tail />} //array of cells
                            }}
                    systems={[ GameLoop ]}     
                    onEvent={this.onEvent}
                    running = {this.state.running}      
        />
        
        <View style={styles.controls}> 
          <View style={styles.controlRow}>
            <TouchableOpacity onPress= {()=> {this.engine.dispatch({ type: "button-up"})}}>
              <View style = {styles.controlButton}/>
            </TouchableOpacity>
          </View>
          <View style={styles.controlRow}>
            <TouchableOpacity onPress= {()=> {this.engine.dispatch({ type: "button-left"})}}>
              <View style = {styles.controlButton}/>
            </TouchableOpacity>
            <View style = {[styles.controlButton, 
                          {backgroundColor: null}] // creating the center gap between all buttons
                          }/> 
            <TouchableOpacity onPress= {()=> {this.engine.dispatch({ type: "button-right"})}}>
              <View style = {styles.controlButton}/>
            </TouchableOpacity>
          </View>
          <View style={styles.controlRow}>
            <TouchableOpacity onPress= {()=> {this.engine.dispatch({ type: "button-down"})}}>
              <View style = {styles.controlButton}/>
            </TouchableOpacity>
          </View>
        </View>
        
        <TouchableOpacity  style={styles.button} onPress={this.reset}>
        <Text style={{color:'white'}}>{newGameText}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#a3baff',
      alignItems: 'center',
      justifyContent: 'center'
  },
  controls: {
      width: 300,
      height: 300,
      flexDirection: 'column',
  },
  controlRow: {
      height: 100,
      width: 300,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row'
  },
  controlButton: {
      width: 100,
      height: 100,
      backgroundColor: 'black',
      borderRadius:20
  },
  button:{
    bottom:'-1%',
    left: '30%',
    height:'5%',
    width: 90,
    backgroundColor:'black',
    borderRadius:15,
    justifyContent:'center',
    alignItems:'center',

  }
});