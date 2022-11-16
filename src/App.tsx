import { useState } from "react";

import { Button, RadioButton, Highlight, TextInput } from "./components/ui";
import { ACTION_OPTIONS, ACTION_TYPES } from "./constants";

const App = () => {
  const [currentAction, setCurrentAction] = useState<ACTION_TYPES>(
    ACTION_TYPES.CREATE
  );

  return (
    <div className="container">
      <div className="columns">
        <div className="column is-three-fifths is-offset-one-fifth main">
          <RadioButton
            options={ACTION_OPTIONS}
            onClick={(action) => {
              setCurrentAction(action);
            }}
          />

          <div className="content mt-5">
            {currentAction === ACTION_TYPES.CREATE && (
              <Button
                title="Create New Dids"
                isPrimary={true}
                onClick={() => {
                  console.log("cee");
                }}
              />
            )}

            {currentAction === ACTION_TYPES.RESOLVE && (
              <div className="actions">
                <div className="action">
                  <TextInput
                    placeholder="Enter your did"
                    onChange={(value: string) => {
                      console.log("event", value);
                    }}
                  />
                </div>

                <div className="action">
                  <Button
                    title="Resolve"
                    style={{ width: "100%" }}
                    onClick={() => {
                      console.log("Resolve");
                    }}
                  />
                </div>
              </div>
            )}

            {currentAction === ACTION_TYPES.SIGN && (
              <>
                <div className="actions mb-4">
                  <div className="action">
                    <TextInput
                      placeholder="Enter a secret message here"
                      onChange={(value: string) => {
                        console.log("event sign", value);
                      }}
                    />
                  </div>

                  <div className="action">
                    <Button
                      title="Sign"
                      style={{ width: "100%" }}
                      onClick={() => {
                        console.log("Sign");
                      }}
                    />
                  </div>
                </div>
                <Button
                  title="Verify"
                  style={{ width: "100%" }}
                  onClick={() => {
                    console.log("Verify");
                  }}
                />
              </>
            )}

            <Highlight content="did:ion:EiDqtYampb2uthrAz_7H5AsqlboL3okP3y4G8M40fY4ASAEiDqtYampb2uthrAz_7H5AsqlboL3okP3y4G8M40fY4ASA" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
