declare global {
  interface Window {
    ION: {
      DID: any;
      generateKeyPair: (type?: IEncryptType) => {
        publicJwk: any;
        privateJwk: any;
      };
      resolve: (didUri: string, options?: { nodeEndpoint: string }) => any;
      AnchorRequest: any;
      signJws: (params: { payload: any; privateJwk: any }) => any;
      verifyJws: (params: { jws: any; publicJwk: any }) => any;
    };
  }
}

export enum IEncryptType {
  ED25519 = "Ed25519",
  EDDSA = "EdDSA",
  SECP256K1 = "secp256k1",
  ES256K = "ES256K",
}
