import {
  RESTROOM_MARKERS_LOADED,
  MAP_CENTER_CHANGE,
  MARKER_ATTRIBUTES_SET,
  MARKER_IMAGES_SET,
  RESTROOM_REVIEW_STARS_CHANGED,
  RESTROOM_REVIEW_IMAGE_UPLOADED,
  RESTROOM_REVIEW_IMAGE_REMOVED,
  RESTROOM_REVIEW_CLEAR,
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

export const restroomReviewReducer = (
  state = { rating: 2, image: null },
  action
) => {
  switch (action.type) {
    case RESTROOM_REVIEW_STARS_CHANGED:
      return {
        ...state,
        rating: action.payload,
      };
    case RESTROOM_REVIEW_IMAGE_UPLOADED:
      return {
        ...state,
        image: action.payload,
      };
    case RESTROOM_REVIEW_IMAGE_REMOVED:
      return {
        ...state,
        image: null,
      };
    case RESTROOM_REVIEW_CLEAR: {
      return {
        ...state,
        rating: 2,
        image: null,
      };
    }
    default:
      return state;
  }
};
