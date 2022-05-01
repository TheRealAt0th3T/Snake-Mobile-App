import React, { Component } from "react";
import { Stylesheet, View } from "react-native";

class Head extends Component{
    constructor(props){
        super(props);
    }

    render(){
        //setting the entity "heads"'s props (the objects that get shown on screen)
        const x = this.props.position[0];
        const y = this.props.position[1];
        
        return(
            <View style={{width: this.props.size, height: this.props.size, backgroundColor: 'green', position: 'absolute', left: x*this.props.size, top: y*this.props.size}}/>
        )
    }
}
export {Head};