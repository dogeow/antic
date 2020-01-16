import { combineReducers } from 'redux'
import lab from './lab'
import emoji from './emoji'
import todo from './todo'

export default combineReducers({
  lab,
  emoji,
  todo
})
