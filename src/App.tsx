const App = () => {
  return (
    <div className="container">
      <div className="columns">
        <div className="column is-three-fifths is-offset-one-fifth main">
          <div className="buttons has-addons">
            <button className="button">
              <span className="icon is-small">
                <i className="fa fa-tag"></i>
              </span>
              <span>Create</span>
            </button>

            <button className="button is-primary is-selected">
              <span className="icon is-small">
                <i className="fa fa-wand-magic-sparkles"></i>
              </span>
              <span>Resolve</span>
            </button>

            <button className="button">
              <span className="icon is-small">
                <i className="fas fa-signature"></i>
              </span>
              <span>Sign and Verify Data</span>
            </button>
          </div>

          <div className="content mt-5">
            {/* UI: Create New Did */}
            {/* <div className="create-did">
              <button className="button is-primary button-action">
                Create New Did
              </button>

              <div className="highlight mt-4">
                <i className="fa fa-copy copy-icon"></i>
                <div
                  style={{
                    overflowX: "auto",
                  }}
                >
                  did:ion:EiDqtYampb2uthrAz_7H5AsqlboL3okP3y4G8M40fY4ASAEiDqtYampb2uthrAz_7H5AsqlboL3okP3y4G8M40fY4ASA
                </div>
              </div>
            </div> */}

            {/* UI: Resolve Did */}

            {/* <div className="resolve-did">
              <div className="actions">
                <div className="action">
                  <input
                    className="input"
                    type="text"
                    placeholder="Enter your did"
                  />
                </div>

                <div className="action">
                  <button
                    className="button button-action is-outline"
                    style={{ width: "100%" }}
                  >
                    Resolve
                  </button>
                </div>
              </div>

              <div className="highlight mt-4">
                <i className="fa fa-copy copy-icon"></i>
                <div
                  style={{
                    overflowX: "auto",
                  }}
                >
                  <pre>
                    {JSON.stringify(
                      {
                        "@context": "https://w3id.org/did-resolution/v1",
                        didDocument: {
                          id: "did:ion:EiDqtYampb2uthrAz_7H5AsqlboL3okP3y4G8M40fY4ASA",
                          "@context": [
                            "https://www.w3.org/ns/did/v1",
                            {
                              "@base":
                                "did:ion:EiDqtYampb2uthrAz_7H5AsqlboL3okP3y4G8M40fY4ASA",
                            },
                          ],
                          service: [
                            {
                              id: "#domain-1",
                              type: "LinkedDomains",
                              serviceEndpoint: "https://foo.example.com",
                            },
                          ],
                          verificationMethod: [
                            {
                              id: "#key-1",
                              controller: "",
                              type: "EcdsaSecp256k1VerificationKey2019",
                              publicKeyJwk: {
                                crv: "secp256k1",
                                kty: "EC",
                                x: "IQoF6bqUDvBhGWUglcM7uq8BwqsEw3zAKMjPPIs_uW8",
                                y: "szWeFJDgOVJ2vWm9u6tZoRugeAQQNQ6YR7ZbgiUfnio",
                              },
                            },
                          ],
                          authentication: ["#key-1"],
                        },
                        didDocumentMetadata: {
                          method: {
                            published: false,
                            recoveryCommitment:
                              "EiBPyOePlnmJ122lDhQJWJ0grIExBwjreUfOe36boqm-jg",
                            updateCommitment:
                              "EiCfGApgMBs653vH-JAxgqBNqkY_7XjAMInCR5o04bXRFw",
                          },
                          equivalentId: [
                            "did:ion:EiDqtYampb2uthrAz_7H5AsqlboL3okP3y4G8M40fY4ASA",
                          ],
                        },
                      },
                      null,
                      4
                    )}
                  </pre>
                </div>
              </div>
            </div> */}

            <div className="resolve-did">
              <div className="actions">
                <div className="action">
                  <input
                    className="input"
                    type="text"
                    placeholder="Enter your did"
                  />
                </div>

                <div className="action">
                  <button
                    className="button button-action is-outline"
                    style={{ width: "100%" }}
                  >
                    Sign
                  </button>
                </div>
              </div>
              <button
                className="button button-action is-outline mt-4"
                style={{ width: "100%" }}
              >
                Verify
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
