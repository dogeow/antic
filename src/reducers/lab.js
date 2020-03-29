import {isExpired} from '../helpers';

let today = new Date();
let now = today.getHours();
let themePaletteType = ((now >= 18 && now <= 24) || (now >= 0 && now <= 6))
  ? 'dark'
  : 'light';

const defaultState = {
  toggle_drawer: false,
  themePaletteType: themePaletteType,
  is_expired: isExpired(),
  access_token: localStorage.getItem('access_token') || null,
  user_id: localStorage.getItem('user_id') || null,
  user_name: localStorage.getItem('user_name') || null,
  user_email: localStorage.getItem('user_email') || null,
};

const lab = (state = defaultState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return Object.assign({}, state, {
        is_expired: isExpired(),
        access_token: action.access_token,
        user_id: action.user_id,
        user_name: action.user_name,
        user_email: action.user_email,
      });
    case 'TOGGLE_DRAWER':
      return Object.assign({}, state, {
        toggle_drawer: !state.toggle_drawer,
      });
    case 'ACCESS_TOKEN':
      return Object.assign({}, state, {
        access_token: action.access_token,
      });
    case 'TOGGLE_THEME':
      return Object.assign({}, state, {
        themePaletteType: state.themePaletteType === 'dark' ? 'light' : 'dark',
      });
    case 'LOGOUT':
      return Object.assign({}, state, {
        access_token: null,
        is_expired: true,
        user_id: null,
        user_name: null,
        user_email: null,
      });
    default:
      return state;
  }
};

export default lab;
