import Constants from '../constants';
import { Food } from './food';

const rand = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const GameLoop = (entities, { touches, events, dispatch }) => {
    let head = entities.head;
    let food = entities.food;
    let tail = entities.tail;

    let score = 0;

    if (events.length){
        for(let i = 0; i < events.length; i++){
            if(events[i].type === "button-up" && head.yspeed != 1){
                head.xspeed = 0;
                head.yspeed = -1;
            }else if(events[i].type === "button-down" && head.yspeed != -1){
                head.xspeed = 0;
                head.yspeed = 1;
            }else if(events[i].type === "button-left" && head.xspeed != 1){
                head.xspeed = -1;
                head.yspeed = 0;
            }else if(events[i].type === "button-right" && head.xspeed != -1){
                head.xspeed = 1;
                head.yspeed = 0;
            }
        }
    }

    /**
     * updating snake movement -- what timer and freq are set to control the speed
     */
    head.timer -= 1; //timer counting down until next move update
    if (head.timer === 0){ 
        head.timer = head.freq; //resetting timer

        //checking if snake is within bounds of grid array
        if (
            head.position[0] + head.xspeed < 0 || head.position[0] + head.xspeed >= Constants.GRID_SIZE ||
            head.position[1] + head.yspeed < 0 || head.position[1] + head.yspeed >= Constants.GRID_SIZE
        ) {
            // snake went out of bounds so GAME OVER
            dispatch({ type: "gameOver" })
        } else {
            //moving body -- essentially cutting off the very end by one and then moving the head and tail up incrementally
            let tempTail = [[head.position[0], head.position[1]]];
            tail.elements = tempTail.concat(tail.elements).slice(0, -1);

            head.position[0] += head.xspeed; //increasing speed in the x axis
            head.position[1] += head.yspeed;//increasing speed in the y axis

            //checking if player hit themselves
            for(let i=0; i < tail.elements.length; i++){
                if (tail.elements[i][0] === head.position[0] && tail.elements[i][1] === head.position[1]){
                    //GAMEOVER
                    dispatch({ type: "gameOver" })
                }
            }

            //checking if snake eats food, and if so spawns a new random position for food
            if (head.position[0] === food.position[0] && head.position[1] === food.position[1]){
                tail.elements = [[food.position[0], food.position[1]]].concat(tail.elements);
                food.position[0] = rand(0, Constants.GRID_SIZE - 1);
                food.position[1] = rand(0, Constants.GRID_SIZE - 1);
                dispatch({ type: "increaseScore" })
            }
        }
    }


    return entities;
};

export { GameLoop };