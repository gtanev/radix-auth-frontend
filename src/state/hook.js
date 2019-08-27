import React, { createContext, useContext, useEffect, useReducer } from "react";

export const StateContext = createContext(null);

export const ContextProvider = ({ children, reducer, initialState }) => (
  <StateContext.Provider value={useLocallyPersistedReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useGlobalState = () => useContext(StateContext);

const useLocallyPersistedReducer = (reducer, defaultState, storageKey) => {
  const hookVars = useReducer(reducer, defaultState, (defaultState) => {
    const persisted = JSON.parse(localStorage.getItem(storageKey));
    return persisted !== null ? persisted : defaultState
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(hookVars[0]))
  }, [storageKey, hookVars[0]]);

  return hookVars;
};
