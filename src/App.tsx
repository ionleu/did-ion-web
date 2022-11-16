import { useState } from "react";
import { ToastContainer } from "react-toastify";

import { Button, RadioButton, Highlight, TextInput } from "./components/ui";
import { ACTION_OPTIONS, ACTION_TYPES } from "./constants";
import {
  createDid,
  emitNotification,
  resolveDid,
  signDid,
  verifyDid,
} from "./services";

const App = () => {
  const [didUri, setDidUri] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [signIsValid, setSignIsValid] = useState(false);
  const [secretWord, setSecretWord] = useState<string>("");
  const [signature, setSignature] = useState<string>("");
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
    setHighlightBody("");

    if (!did.trim()) {
      emitNotification("error", "Please enter a DID token.");

      return;
    }

    setIsLoading(true);

    try {
      const resolvedDid = await resolveDid(did);
      setHighlightBody(JSON.stringify(resolvedDid, null, 4));
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
    if (!secretWord) {
      emitNotification("error", "Please enter a secret message.");

      return;
    }

    setIsLoading(true);

    try {
      const didSignature = await signDid(secretWord);
      setSignature(didSignature);

      emitNotification("success", "Signature was generated successfully.");
    } catch (e) {
      emitNotification("error", "Oops, somethig went wrong. Try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const onVerifyDid = async () => {
    if (!signature.trim()) {
      emitNotification(
        "error",
        "Signature is not generated, plase sign again."
      );

      return;
    }

    setIsLoading(true);

    const isValid = await verifyDid(signature);

    if (isValid) {
      setSignIsValid(true);
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
                        setSecretWord(value);
                        setSignIsValid(false);
                        setSignature("");
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

            {signIsValid && !isLoading && (
              <div className="mt-3 center">
                <strong style={{ color: "green" }}>
                  Payload was verified successfully!
                </strong>
              </div>
            )}

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
