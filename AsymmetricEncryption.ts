import nodeJose, { JWK, JWE } from 'node-jose';

export class AsymmetricEncryption {
  private signatureKey: JWK.Key | undefined;

  constructor() {
    console.log(
      `------ SECRET SIGNATURE ${process.env.SECRET_SIGNATURE} ------`
    );

    const SECRET_SIGNATURE = process.env.SECRET_SIGNATURE;

    if (!SECRET_SIGNATURE)
      throw new Error('Define a SECRET_SIGNATURE from `.env`');

    /**
     * Generate a key with `Secret signature`
     * from `.env` file
     */
    JWK.asKey({
      kty: 'oct',
      k: nodeJose.util.base64url.encode(SECRET_SIGNATURE),
    }).then((key) => (this.signatureKey = key));
  }

  async encrypt<T>(payload: T) {
    if (!this.signatureKey)
      throw new Error('PLEASE CREATE A KEY TO ENCRYPT 🙂');

    const encrypted = await JWE.createEncrypt(
      { format: 'compact' } /** Use Compact Serialization */,
      this.signatureKey
    )
      .update(payload)
      .final();

    return encrypted;
  }

  async decrypt<T>(encrypted: string) {
    if (!this.signatureKey)
      throw new Error('PLEASE CREATE A KEY TO DECRYPT 🙂');

    const { payload } = await JWE.createDecrypt(this.signatureKey).decrypt(
      encrypted
    );

    return payload.toString() as T;
  }
}

