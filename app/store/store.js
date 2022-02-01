import {createStore} from 'redux'
import {reducer} from './reducer'

const store = createStore(reducer);

export {store}

/*The purpose of store.js is understood when you note that a store is a state container 
which essentially holds the app's state. Redux can have only a single store, it's 
linked with the reducer. Refer below.

https://www.tutorialspoint.com/redux/redux_store.htm#:~:text=A%20store%20is%20an%20immutable,need%20to%20specify%20the%20reducer.

*/ 