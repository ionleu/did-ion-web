import { v4 as uuidv4 } from "uuid";

import { DID_PRIVATE_KEY, DID_PUBLIC_KEY } from "../constants";
import { IEncryptType } from "../models";

/**
 * @name createDid
 * @description
 * Generate, Create and Submit the DID URI on ION Network
 *
 * @returns {string} Returns DID in string format
 */
export const createDid = async (): Promise<string> => {
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

/**
 * @name resolveDid
 * @description
 * Resolve a DID URI string on ION Network
 *
 * @param {string} didUri DID URI string
 *
 * @returns {object} Returns the associated DID resolution response object
 */
export const resolveDid = async (didUri: string) => {
  return await window.ION.resolve(didUri);
};

/**
 * @name signDid
 * @description
 * Generates a signed JWS output of a provided payload
 *
 * @param {any} payload Any data that we whant to be signed
 *
 * @returns {string} Returns JWS token
 */
export const signDid = async (payload: any): Promise<string> => {
  const privateJwk = JSON.parse(sessionStorage.getItem(DID_PRIVATE_KEY)!);

  return await window.ION.signJws({
    payload,
    privateJwk,
  });
};

/**
 * @name verifyDid
 * @description
 * Verifies a signed JWS output
 *
 * @param {string} jws JWS to be verified
 *
 * @returns {boolean} Returns valid state
 */
export const verifyDid = async (jws: any): Promise<boolean> => {
  const publicJwk = JSON.parse(sessionStorage.getItem(DID_PUBLIC_KEY)!);

  return await window.ION.verifyJws({
    jws,
    publicJwk,
  });
};

/**
 * @private
 * @name verifyDid
 * @description
 * Generates the request and submits it
 *
 * @param {any} did DID object
 */
const _publishDidToIon = async (did: any) => {
  const requestBody = await did.generateRequest();
  const anchorRequest = new window.ION.AnchorRequest(requestBody);

  await anchorRequest.submit();
};
