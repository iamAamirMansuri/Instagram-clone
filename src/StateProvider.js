import React, { createContext, useContext, useReducer } from "react";

export const StateContext = createContext();
//prepares the datalayer

export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);
//to wrap our app and provide data layer to every component inside our app

export const useStateValue = () => useContext(StateContext);
// to pull information from the data layer
