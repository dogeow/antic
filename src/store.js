import { applyMiddleware, createStore, compose } from 'redux'
import rootReducer from './reducers'
import thunkMiddleware from 'redux-thunk'
import loggerMiddleware from './middleware/logger'
import monitorReducerEnhancer from './enhancers/monitorReducer'

const middlewareEnhancer = applyMiddleware(loggerMiddleware, thunkMiddleware);

// 正式环境不记录 https://github.com/reduxjs/redux/issues/2359
let composedEnhancers;
const devTools = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : null;
if (devTools) {
  composedEnhancers = compose(
    middlewareEnhancer,
    monitorReducerEnhancer,
    devTools
  );
} else {
  composedEnhancers = compose(
    middlewareEnhancer,
    monitorReducerEnhancer,
  );
}

const store = createStore(rootReducer, undefined, composedEnhancers);

export default store;
