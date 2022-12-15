import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import authReducer from "./auth/authSlice";
// import voteReducer from "./vote/cartSlice";

const combinedReducer = combineReducers({
  auth: authReducer,
  // vote: voteReducer,
});

const masterReducer = (state, action) => {
  if (action.type === HYDRATE) {
    // console.log("action payload")
    // console.log(action.payload)
    // console.log("check this")
    // console.log(state)
    const nextState = {
      ...state, // use previous state
      // users:action.payload
      
      auth: {
        ...state.auth,
        users: action.payload.auth.users,
      }
    };
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

export const makeStore = () =>
  configureStore({
    reducer: masterReducer,
  });

export const wrapper = createWrapper(makeStore, { debug: true });
