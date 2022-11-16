import { ACTION_TYPES } from "../constants";

export interface IRadioButton {
  options: IOption[];
  onClick: (action: ACTION_TYPES) => void;
}

interface IOption {
  title: string;
  action: ACTION_TYPES;
  icon: string;
}
