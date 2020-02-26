import { applyMiddleware, createStore, compose } from 'redux'
import rootReducer from './reducers'
import thunkMiddleware from 'redux-thunk'
import loggerMiddleware from './middleware/logger'
import monitorReducerEnhancer from './enhancers/monitorReducer'

const middlewareEnhancer = applyMiddleware(loggerMiddleware, thunkMiddleware);

// 正式环境不记录 https://github.com/reduxjs/redux/issues/2359
let composedEnhancers = undefined;
if (process.env.NODE_ENV === 'development') {
  composedEnhancers = compose(
    middlewareEnhancer,
    monitorReducerEnhancer,
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
  );
}

const store = createStore(rootReducer, undefined, composedEnhancers);

export default store;
