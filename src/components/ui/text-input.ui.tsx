import { ITextInput } from "../../models";

export const TextInput = ({ placeholder, onChange }: ITextInput) => {
  return (
    <input
      className="input"
      type="text"
      placeholder={placeholder}
      onChange={($event) => onChange($event.target.value)}
    />
  );
};
