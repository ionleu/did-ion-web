import { useState } from "react";

import { ACTION_TYPES } from "../../constants";
import { IRadioButton } from "../../models";

export const RadioButton = ({ options, onClick }: IRadioButton) => {
  const [active, setActive] = useState<ACTION_TYPES>(ACTION_TYPES.CREATE);

  return (
    <div className="buttons has-addons">
      {options.map((o) => (
        <button
          key={o.action}
          className={`button ${
            active === o.action && "is-primary is-selected"
          }`}
          onClick={() => {
            setActive(o.action);
            onClick(o.action);
          }}
        >
          <span className="icon is-small">
            <i className={`fa fa-${o.icon}`}></i>
          </span>
          <span>{o.title}</span>
        </button>
      ))}
    </div>
  );
};
