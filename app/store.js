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

/*The purpose of store.js is understood when you note that a store is a state container 
which essentially holds the app's state. Redux can have only a single store, it's 
linked with the reducer. Refer below.

https://www.tutorialspoint.com/redux/redux_store.htm#:~:text=A%20store%20is%20an%20immutable,need%20to%20specify%20the%20reducer.

*/
