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

  await _publishDidToIon(did);

  return await did.getURI();
};

export const resolveDid = async (didUri: string) => {
  return await window.ION.resolve(didUri);
};

const _publishDidToIon = async (did: any) => {
  const requestBody = await did.generateRequest();
  const anchorRequest = new window.ION.AnchorRequest(requestBody);

  await anchorRequest.submit();
};
