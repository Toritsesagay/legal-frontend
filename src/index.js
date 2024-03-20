import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//configuring react router
import { BrowserRouter } from 'react-router-dom'
//configuring redux store
import ReduxThunk from "redux-thunk"
import { combineReducers, createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux"
import { userAuthReducer } from "./store/reducer/userAppStorage"

//import ErrorBoundary from "./screens/Error/Error"
//configuring the redux store
const rootReducer = combineReducers({
  userAuth: userAuthReducer,
})
//creating store
const store = createStore(rootReducer, applyMiddleware(ReduxThunk))


ReactDOM.render(
  <BrowserRouter>

    <Provider store={store}>
        <App />

    </Provider>

  </BrowserRouter>

  ,
  document.getElementById('root'));