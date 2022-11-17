import { Reducer } from "react";

import { ReducerAction, ReducerActionType, ReducerState } from "../models";

export const appReducer: Reducer<ReducerState, ReducerAction> = (
  state = {} as ReducerState,
  action
) => {
  switch (action.type) {
    case ReducerActionType.SET_DID_URI:
      return { ...state, didUri: action.payload };

    case ReducerActionType.SET_SIGN_IS_VALID:
      return { ...state, signIsValid: action.payload };

    case ReducerActionType.SET_SECRET_WORD:
      return { ...state, secretWord: action.payload };

    case ReducerActionType.SET_SIGNATURE:
      return { ...state, signature: action.payload };

    case ReducerActionType.SET_HIGH_BODY:
      return { ...state, highlightBody: action.payload };

    case ReducerActionType.SET_CURRENT_BODY:
      return { ...state, currentAction: action.payload };

    case ReducerActionType.DEFAULT:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};
