import { Dimensions } from 'react-native';

export const WIDTH = Dimensions.get('screen').width;
export const HEIGHT = Dimensions.get('screen').height;

export const WINDOW = {
  WIDTH,
  HEIGHT,
};

export const CARD = {
  WIDTH: WIDTH * 0.95,
  HEIGHT: HEIGHT * 0.75,
  BORDER_RADIUS: 20,
};

export const ACTION_OFFSET = 100;
