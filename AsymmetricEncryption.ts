import nodeJose from 'node-jose';

export class AsymmetricEncryption {
  signatureAsKey = nodeJose.JWK.asKey({
    kty: 'oct',
    k: nodeJose.util.base64url.encode(
      process.env.SECRET_SIGNATURE ?? '' /** HERE ENTER YOUR SECRET SIGNATURE */
    ),
  });

  constructor() {
    console.log(
      `------ SECRET SIGNATURE ${process.env.SECRET_SIGNATURE} ------`
    );
  }

  async encrypt<T>(payload: T) {
    const key = await this.signatureAsKey;
    const encrypted = await nodeJose.JWE.createEncrypt(
      { format: 'compact' },
      key
    )
      .update(payload)
      .final();

    return encrypted;
  }

  async decrypt<T>(encrypted: string) {
    const key = await this.signatureAsKey;
    const { payload } = await nodeJose.JWE.createDecrypt(key).decrypt(
      encrypted
    );

    return payload.toString() as T;
  }
}

