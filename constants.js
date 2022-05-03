import { Dimensions } from 'react-native';

//constants for gameplay screen
export default Constants = {
    MAX_WIDTH: Dimensions.get("screen").width,
    MAX_HEIGHT: Dimensions.get("screen").height,
    GRID_SIZE: 20,
    CELL_SIZE: 15,
    timer: 10, //for speed of snake
    freq: 10   //for speed of snake
}