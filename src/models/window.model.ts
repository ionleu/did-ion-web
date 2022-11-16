declare global {
  interface Window {
    ION: {
      DID: any;
      generateKeyPair: (type?: IEncryptType) => {
        publicJwk: any;
        privateJwk: any;
      };
    };
  }
}

export enum IEncryptType {
  ED25519 = "Ed25519",
  EDDSA = "EdDSA",
  SECP256K1 = "secp256k1",
  ES256K = "ES256K",
}
