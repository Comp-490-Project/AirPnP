import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import {
  userFavoritesReducer,
  userLocationReducer,
  userAuthReducer,
  userFeedReducer,
  userVisitedReducer,
} from './reducers/userReducer';
import {
  mapReducer,
  restroomMarkerReducer,
  restroomReviewReducer,
} from './reducers/restroomReducer';

const reducer = combineReducers({
  userLocation: userLocationReducer,
  userAuth: userAuthReducer,
  userFavorites: userFavoritesReducer,
  userVisited: userVisitedReducer,
  map: mapReducer,
  restroomMarker: restroomMarkerReducer,
  restroomReview: restroomReviewReducer,
  feed: userFeedReducer,
});

const initialState = {
  userLocation: {
    location: null,
  },
  restroomMarker: {
    description: '',
    geohash: '',
    latitude: null,
    longitude: null,
    meanRating: 0,
    name: '',
    images: [],
    isFavorited: false,
  },
  restroomReview: {
    region: {},
    rating: 0,
    image: null,
  },
  feed: {
    userPosts: [],
  },
};

const store = createStore(reducer, initialState, applyMiddleware(thunk));

export default store;
