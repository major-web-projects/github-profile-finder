const alertReducer = (state, action) => {
  switch (action.type) {
    case "SET_ALERT":
      return { ...state, ...action.payload };
    case "REMOVE_ALERT":
      return { ...state, msg: null, type: null };
    default:
      return state;
  }
};
export default alertReducer;
