import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

class Food extends Component {
    constructor(props){
        super(props);
    }

    render() {
        const x = this.props.position[0];
        const y = this.props.position[1];
        return (
            <View style={{ backgroundColor: 'pink', position: 'absolute', width: this.props.size, height: this.props.size, left: x * this.props.size, top: y * this.props.size }} />
        );
    }
}
export { Food };