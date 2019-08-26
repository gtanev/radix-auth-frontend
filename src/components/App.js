import React from "react";
import { ContextProvider } from "../state/hook";
import { initialState, reducer } from "../state/store";
import AppRouter from "./AppRouter";
import "../styles/app.scss";

export default function App() {
  return (
    <ContextProvider initialState={initialState} reducer={reducer}>
      <AppRouter/>
    </ContextProvider>
  );
}
