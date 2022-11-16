import { v4 as uuidv4 } from "uuid";

export const createDid = async () => {
  const authnKeys = await window.ION.generateKeyPair();

  const did = new window.ION.DID({
    content: {
      publicKeys: [
        {
          id: uuidv4(),
          type: "EcdsaSecp256k1VerificationKey2019",
          publicKeyJwk: authnKeys.publicJwk,
          purposes: ["authentication"],
        },
      ],
      services: [
        {
          id: "domain-1",
          type: "LinkedDomains",
          serviceEndpoint: "https://getportabl.com",
        },
      ],
    },
  });

  return await did.getURI("short");
};
