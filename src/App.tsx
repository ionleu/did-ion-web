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
            <div className="create-did">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
