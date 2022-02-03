import { RESTROOMS_LOADED } from '../constants/types';

export const restroomReducer = (state = { restrooms: [] }, action) => {
  switch (action.type) {
    case RESTROOMS_LOADED:
      return {
        ...state,
        restrooms: action.payload,
        markerLoaded: true,
      };
    default:
      return state;
  }
};
