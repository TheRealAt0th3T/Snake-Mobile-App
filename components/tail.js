import React, { Component } from "react";
import { View } from "react-native";
import Constants from "../constants";

class Tail extends Component{
    constructor(props){
        super(props);
    }

    render(){
        let body = this.props.elements.map((element, i) =>{
            return<View key={i} style={{width: this.props.size, height: this.props.size, backgroundColor: '#58b87d', position: 'absolute', left: element[0] * this.props.size, top: element[1] * this.props.size}}/>
        })

        return(
            <View style={{width: this.props.size * Constants.GRID_SIZE, height: this.props.size * Constants.GRID_SIZE}}>
                {body}
            </View>
        )
    }
}

export {Tail};