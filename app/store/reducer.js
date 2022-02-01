import {createStore} from 'redux'
import {reducer} from './reducer'

const store = createStore(reducer);

export {store};

/*The purpose of Reducer.js is to simply take in an action and the previous state
of the application and returns the new state. The reducers is updating a state when 
obtaining the action object. Refer below.

https://www.tutorialspoint.com/redux/redux_reducers.htm

*/ 