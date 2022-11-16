import { useState } from "react";
import { ToastContainer } from "react-toastify";

import { Button, RadioButton, Highlight, TextInput } from "./components/ui";
import { ACTION_OPTIONS, ACTION_TYPES } from "./constants";
import { createDid } from "./services";

const App = () => {
  const [didUri, setDidUri] = useState<string>("");
  const [currentAction, setCurrentAction] = useState<ACTION_TYPES>(
    ACTION_TYPES.CREATE
  );

  const onCreateDidUri = async () => {
    const didUri = await createDid();
    setDidUri(didUri);
  };

  const onCopy = () => {
    navigator.clipboard.writeText(didUri);
  };

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
                onClick={onCreateDidUri}
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

            {!!didUri && <Highlight content={didUri} onCopy={onCopy} />}
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default App;
