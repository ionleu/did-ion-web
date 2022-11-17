import { useReducer, useState } from "react";
import { ToastContainer } from "react-toastify";

import { Button, RadioButton, Highlight, TextInput } from "./components/ui";
import { ACTION_OPTIONS, ACTION_TYPES } from "./constants";
import { ReducerActionType } from "./models";
import {
  appReducer,
  createDid,
  emitNotification,
  resolveDid,
  signDid,
  verifyDid,
} from "./services";

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [state, dispatch] = useReducer(appReducer, {
    didUri: null,
    signIsValid: false,
    secretWord: null,
    signature: null,
    highlightBody: null,
    currentAction: ACTION_TYPES.CREATE,
  });

  const onCreateDidUri = async () => {
    setIsLoading(true);

    const createdDidUri = await createDid();
    dispatch({
      type: ReducerActionType.SET_HIGH_BODY,
      payload: createdDidUri,
    });

    setIsLoading(false);
  };

  const onResolveDidUri = async (did: string | null) => {
    dispatch({
      type: ReducerActionType.SET_HIGH_BODY,
      payload: null,
    });

    if (!did?.trim()) {
      emitNotification("error", "Please enter a DID token.");

      return;
    }

    setIsLoading(true);

    try {
      const resolvedDid = await resolveDid(did);
      dispatch({
        type: ReducerActionType.SET_HIGH_BODY,
        payload: JSON.stringify(resolvedDid, null, 4),
      });
    } catch (e) {
      emitNotification(
        "error",
        "This DID couldn't be resolved, try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const onSignDid = async () => {
    if (!state.secretWord) {
      emitNotification("error", "Please enter a secret message.");

      return;
    }

    setIsLoading(true);

    try {
      const didSignature = await signDid(state.secretWord);
      dispatch({
        type: ReducerActionType.SET_SIGNATURE,
        payload: didSignature,
      });

      emitNotification("success", "Signature was generated successfully.");
    } catch (e) {
      emitNotification("error", "Oops, somethig went wrong. Try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const onVerifyDid = async () => {
    if (!state.signature) {
      emitNotification(
        "error",
        "Signature is not generated, plase sign again."
      );

      return;
    }

    setIsLoading(true);

    const isValid = await verifyDid(state.signature);

    if (isValid) {
      dispatch({
        type: ReducerActionType.SET_SIGN_IS_VALID,
        payload: true,
      });
    } else {
      emitNotification("error", "Signature is not valid.");
    }
    setIsLoading(false);
  };

  return (
    <div className="container">
      <div className="columns">
        <div className="column is-three-fifths is-offset-one-fifth main">
          <RadioButton
            options={ACTION_OPTIONS}
            onClick={(action) => {
              dispatch({
                type: ReducerActionType.DEFAULT,
                payload: {
                  highlightBody: null,
                  currentAction: action,
                },
              });
            }}
          />

          <div className="content mt-5">
            {state.currentAction === ACTION_TYPES.CREATE && (
              <Button
                title="Create New Dids"
                isPrimary={true}
                onClick={onCreateDidUri}
              />
            )}

            {state.currentAction === ACTION_TYPES.RESOLVE && (
              <div className="actions">
                <div className="action">
                  <TextInput
                    placeholder="Enter your did"
                    onChange={(value: string) => {
                      dispatch({
                        type: ReducerActionType.SET_DID_URI,
                        payload: value,
                      });
                    }}
                  />
                </div>

                <div className="action">
                  <Button
                    title="Resolve"
                    style={{ width: "100%" }}
                    onClick={() => {
                      onResolveDidUri(state.didUri);
                    }}
                  />
                </div>
              </div>
            )}

            {state.currentAction === ACTION_TYPES.SIGN && (
              <>
                <div className="actions mb-4">
                  <div className="action">
                    <TextInput
                      placeholder="Enter a secret message here"
                      onChange={(value: string) => {
                        dispatch({
                          type: ReducerActionType.DEFAULT,
                          payload: {
                            signIsValid: false,
                            secretWord: value,
                            signature: null,
                          },
                        });
                      }}
                    />
                  </div>

                  <div className="action">
                    <Button
                      title="Sign"
                      style={{ width: "100%" }}
                      onClick={onSignDid}
                    />
                  </div>
                </div>
                <Button
                  title="Verify"
                  style={{ width: "100%" }}
                  onClick={onVerifyDid}
                />
              </>
            )}

            {isLoading && <div className="mt-3 center">Is loading...</div>}

            {state.signIsValid && !isLoading && (
              <div className="mt-3 center">
                <strong style={{ color: "green" }}>
                  Payload was verified successfully!
                </strong>
              </div>
            )}

            {!!state.highlightBody && !isLoading && (
              <Highlight content={state.highlightBody} />
            )}
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default App;
