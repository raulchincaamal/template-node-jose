import express, { Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import { AsymmetricEncryption } from './AsymmetricEncryption';

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT ?? 8000;
const stringToEncrypt = 'TYPESCRIPT';
const objectToEncrypt = {
  id: '353543h5k3h45kh3k5h3k5hk53',
  name: 'JORGE',
};
const asymmetricEncryption = new AsymmetricEncryption();

app.get('/', (req: Request, res: Response) => {
  res.send(`------ WELCOME TO ENCRYPTION WITH NODE JOSE 🚀 ------`);
});

app.get('/encrypt-string', async (req: Request, res: Response) => {
  const encrypt = await asymmetricEncryption.encrypt(stringToEncrypt);
  res.send(`------ ENCRYPTED ${encrypt} ------`);
});

app.get('/encrypt-object', async (req: Request, res: Response) => {
  const encrypt = await asymmetricEncryption.encrypt(objectToEncrypt);
  res.send(`------ ENCRYPTED ${encrypt} ------`);
});

app.get('/decrypt', async (req: Request, res: Response) => {
  const { value } = req.query;
  const decrypt = await asymmetricEncryption.decrypt<{
    id: string;
    name: string;
  }>(value as string);
  res.send(`------ DECRYPTED ${JSON.stringify(decrypt)} ------`);
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
