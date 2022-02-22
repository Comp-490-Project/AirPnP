import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import {
  userFavoritesReducer,
  userLocationReducer,
  userAuthReducer,
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
  map: mapReducer,
  restroomMarker: restroomMarkerReducer,
  restroomReview: restroomReviewReducer,
});

const initialState = {
  userLocation: {
    location: null,
    loading: true,
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
};

const store = createStore(reducer, initialState, applyMiddleware(thunk));

export default store;
