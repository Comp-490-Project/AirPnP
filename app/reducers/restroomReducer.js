import {
  RESTROOM_MARKERS_LOADED,
  MAP_CENTER_CHANGE,
  MARKER_ATTRIBUTES_SET,
  MARKER_IMAGES_SET,
} from '../constants/restroomTypes';
import {
  RESTROOM_MARKER_FAVORITED,
  RESTROOM_MARKER_UNFAVORITED,
} from '../constants/userTypes';

export const mapReducer = (state = { restrooms: [] }, action) => {
  switch (action.type) {
    case RESTROOM_MARKERS_LOADED:
      return {
        ...state,
        restrooms: action.payload,
      };
    case MAP_CENTER_CHANGE:
      return {
        ...state,
        mapCenterLocation: action.payload,
      };
    default:
      return state;
  }
};

export const restroomMarkerReducer = (state = {}, action) => {
  switch (action.type) {
    case MARKER_ATTRIBUTES_SET:
      return {
        ...state,
        ...action.payload,
        images: [],
      };
    case MARKER_IMAGES_SET:
      return {
        ...state,
        images: action.payload,
      };
    case RESTROOM_MARKER_FAVORITED:
      return {
        ...state,
        isFavorited: true,
      };
    case RESTROOM_MARKER_UNFAVORITED:
      return {
        ...state,
        isFavorited: false,
      };
    default:
      return state;
  }
};
