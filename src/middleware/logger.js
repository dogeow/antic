const logger = (store) => (next) => (action) => {
  window.console.group(action.type);
  window.console.info("dispatching", action);
  const result = next(action);
  window.console.log("next state", store.getState());
  window.console.groupEnd();

  return result;
};

export default logger;
