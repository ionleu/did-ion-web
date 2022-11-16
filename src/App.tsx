import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

import { Button, RadioButton, Highlight, TextInput } from "./components/ui";
import { ACTION_OPTIONS, ACTION_TYPES } from "./constants";
import { createDid, resolveDid } from "./services";

const App = () => {
  const [didUri, setDidUri] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [highlightBody, setHighlightBody] = useState<string>("");
  const [currentAction, setCurrentAction] = useState<ACTION_TYPES>(
    ACTION_TYPES.CREATE
  );

  const onCreateDidUri = async () => {
    setIsLoading(true);

    const createdDidUri = await createDid();

    setHighlightBody(createdDidUri);
    setIsLoading(false);
  };

  const onResolveDidUri = async (did: string) => {
    setIsLoading(true);

    try {
      const resolvedDid = await resolveDid(did);
      setHighlightBody(JSON.stringify(resolvedDid, null, 4));
    } catch (e) {
      toast.error("ION: This DID couldn't be resolved, try again later.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="columns">
        <div className="column is-three-fifths is-offset-one-fifth main">
          <RadioButton
            options={ACTION_OPTIONS}
            onClick={(action) => {
              setHighlightBody("");
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
                      setDidUri(value);
                    }}
                  />
                </div>

                <div className="action">
                  <Button
                    title="Resolve"
                    style={{ width: "100%" }}
                    onClick={() => {
                      onResolveDidUri(didUri);
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
                        setDidUri(value);
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
            {isLoading && <div className="mt-3 center">Is loading...</div>}

            {!!highlightBody && !isLoading && (
              <Highlight content={highlightBody} />
            )}
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default App;
