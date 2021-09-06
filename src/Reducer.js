export const initialState = {
  user: null,
};

export const actionTypes = {
  SET_USER: "SET__USER",
  REMOVE_USER: "REMOVE_USER",
};

const reducer = (state, action) => {
  // console.log(action);

  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case actionTypes.REMOVE_USER:
      // console.log(action);
      return {
        user: null,
      };

    default:
      return state;
  }
};

export default reducer;
