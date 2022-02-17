import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { mapLocationReducer, mapMarkerReducer, } from './reducers/mapReducer';
import {
  userFavoritesReducer,
  userLocationReducer,
  userStatusReducer,
} from './reducers/userReducer';

const reducer = combineReducers({
  userLocation: userLocationReducer,
  userStatus: userStatusReducer,
  userFavorites: userFavoritesReducer,
  mapLocation: mapLocationReducer,
  mapMarker: mapMarkerReducer,
});

const initialState = {
  userLocation: {
    location: null,
    loading: true,
  },
  mapMarker: {
    description: '',
    geohash: '',
    latitude: null,
    longitude: null,
    meanRating: 0,
    name: '',
    images: [],
    isFavorited: false,
  },

};

const store = createStore(reducer, initialState, applyMiddleware(thunk));

export default store;

/*The purpose of store.js is understood when you note that a store is a state container 
which essentially holds the app's state. Redux can have only a single store, it's 
linked with the reducer. Refer below.

https://www.tutorialspoint.com/redux/redux_store.htm#:~:text=A%20store%20is%20an%20immutable,need%20to%20specify%20the%20reducer.

*/
