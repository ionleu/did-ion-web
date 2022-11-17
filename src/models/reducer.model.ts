import { ACTION_TYPES } from "../constants";

export enum ReducerActionType {
  SET_DID_URI,
  SET_SIGN_IS_VALID,
  SET_SECRET_WORD,
  SET_SIGNATURE,
  SET_HIGH_BODY,
  SET_CURRENT_BODY,
  DEFAULT,
}

export interface ReducerAction {
  type: ReducerActionType;
  payload?: any;
}

export interface ReducerState {
  didUri: null | string;
  signIsValid: boolean;
  secretWord: null | string;
  signature: null | string;
  highlightBody: null | string;
  currentAction: ACTION_TYPES;
}
