import { v4 as uuidv4 } from "uuid";

import { DID_PRIVATE_KEY, DID_PUBLIC_KEY } from "../constants";
import { IEncryptType } from "../models";

export const createDid = async () => {
  const authnKeys = await window.ION.generateKeyPair(IEncryptType.SECP256K1);

  sessionStorage.setItem(DID_PRIVATE_KEY, JSON.stringify(authnKeys.privateJwk));
  sessionStorage.setItem(DID_PUBLIC_KEY, JSON.stringify(authnKeys.publicJwk));

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

export const signDid = async (payload: any): Promise<string> => {
  const privateJwk = JSON.parse(sessionStorage.getItem(DID_PRIVATE_KEY)!);

  return await window.ION.signJws({
    payload,
    privateJwk,
  });
};

export const verifyDid = async (jws: any): Promise<boolean> => {
  const publicJwk = JSON.parse(sessionStorage.getItem(DID_PUBLIC_KEY)!);

  return await window.ION.verifyJws({
    jws,
    publicJwk,
  });
};

const _publishDidToIon = async (did: any) => {
  const requestBody = await did.generateRequest();
  const anchorRequest = new window.ION.AnchorRequest(requestBody);

  await anchorRequest.submit();
};
