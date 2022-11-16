import { IButton } from "../../models";

export const Button = ({ title, isPrimary, style, onClick }: IButton) => {
  return (
    <button
      className={`button button-action ${
        isPrimary ? "is-primary" : "is-outline"
      }`}
      style={style}
      onClick={onClick}
    >
      {title}
    </button>
  );
};
