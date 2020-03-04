export const toggleDrawer = toggle_drawer => ({
  type: 'TOGGLE_DRAWER',
  toggle_drawer
});

export const accessToken = access_token => ({
  type: 'ACCESS_TOKEN',
  access_token
});

export const toggleTheme = () => ({
  type: 'TOGGLE_THEME'
});

export const logoutAction = () => ({
  type: 'LOGOUT'
});

export const loginAction = (access_token, user_id, user_name, user_email) => ({
  type: 'LOGIN',
  access_token,
  user_id,
  user_name,
  user_email
});
