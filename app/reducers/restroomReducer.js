import {
  RESTROOM_MARKERS_LOADED,
  RESTROOM_DIRECTIONS_CHANGED,
  MAP_CENTER_CHANGE,
  MARKER_ATTRIBUTES_SET,
  MARKER_IMAGES_SET,
  RESTROOM_CREATE_LOCATION_CHANGED,
  RESTROOM_REVIEW_STARS_CHANGED,
  RESTROOM_REVIEW_IMAGE_UPLOADED,
  RESTROOM_REVIEW_IMAGE_REMOVED,
  RESTROOM_REVIEW_CLEAR,
  RESTROOM_MARKER_ADDED,
  RESTROOM_REVIEW_ADDED,
  RESTROOM_REVIEW_EDITED,
  RESTROOM_REVIEW_DATA_EDITED,
  RESTROOM_REVIEW_DATA_ADDED,
} from '../constants/restroomTypes';
import {
  RESTROOM_MARKER_FAVORITED,
  RESTROOM_MARKER_UNFAVORITED,
  RESTROOM_MARKER_UNVISITED,
  RESTROOM_MARKER_VISITED,
} from '../constants/userTypes';

export const mapReducer = (state = { restrooms: [] }, action) => {
  switch (action.type) {
    case RESTROOM_MARKERS_LOADED:
      return {
        ...state,
        restrooms: action.payload,
      };
    case RESTROOM_DIRECTIONS_CHANGED:
      return {
        ...state,
        restroomWithDirections: action.payload,
      };
    case MAP_CENTER_CHANGE:
      return {
        ...state,
        mapCenterLocation: action.payload,
      };
    case RESTROOM_MARKER_ADDED:
      return {
        ...state,
        restrooms: [...state.restrooms, action.payload],
      };
    case RESTROOM_REVIEW_DATA_EDITED:
      return {
        ...state,
        restrooms: state.restrooms.map((restroom) => {
          if (restroom.geohash === action.payload.geohash) {
            return {
              ...restroom,
              meanRating: action.payload.newRating,
              reviews: restroom.reviews.map((review) =>
                review.user === action.payload.user
                  ? {
                      comment: action.payload.comment,
                      rating: action.payload.rating,
                      createdAt: action.payload.createdAt,
                      user: action.payload.user,
                    }
                  : review
              ),
            };
          } else {
            return restroom;
          }
        }),
      };
    case RESTROOM_REVIEW_DATA_ADDED:
      return {
        ...state,
        restrooms: state.restrooms.map((restroom) => {
          if (restroom.geohash === action.payload.geohash) {
            return {
              ...restroom,
              meanRating: action.payload.newRating,
              reviews: [
                ...restroom.reviews,
                {
                  comment: action.payload.comment,
                  rating: action.payload.rating,
                  createdAt: action.payload.createdAt,
                  user: action.payload.user,
                },
              ],
            };
          } else {
            return restroom;
          }
        }),
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
    case RESTROOM_MARKER_VISITED:
      return {
        ...state,
        isVisited: true,
      };
    case RESTROOM_MARKER_UNVISITED:
      return {
        ...state,
        isVisited: false,
      };
    case RESTROOM_REVIEW_EDITED:
      return {
        ...state,
        reviews: state.reviews.map((review) =>
          review.user === action.payload.user ? action.payload : review
        ),
        meanRating: action.payload.newRating,
        images: action.payload?.image
          ? state.images.map((image) =>
              image.includes(action.payload.user) ? action.payload.image : image
            )
          : state.images,
      };
    case RESTROOM_REVIEW_ADDED:
      return {
        ...state,
        reviews: [...state.reviews, action.payload],
        meanRating: action.payload.newRating,
        images: action.payload?.image
          ? [...state.images, action.payload.image]
          : state.images,
      };
    default:
      return state;
  }
};

export const restroomReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case RESTROOM_CREATE_LOCATION_CHANGED:
      return {
        ...state,
        region: action.payload,
      };
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
    case RESTROOM_REVIEW_CLEAR:
      return {
        ...state,
        region: {},
        rating: 2,
        image: null,
      };
    default:
      return state;
  }
};
