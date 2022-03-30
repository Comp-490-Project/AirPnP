const {Dimensions} = require('react-native');

const {width, height} = Dimensions.get('screen');

export const CARD = {
    WIDTH: width * 0.95,
    HEIGHT: height * 0.75,
    BORDER_RADIUS: 20,
}; 

export const ACTION_OFFSET = 100;