import express, { Request, Response , Application } from 'express';
import dotenv from 'dotenv';
import { AsymmetricEncryption } from './AsymmetricEncryption';

//For env File 
dotenv.config();

const app: Application = express();
const port = process.env.PORT ?? 8000;
const value = "TYPESCRIPT"
const asymmetricEncryption = new AsymmetricEncryption()

app.get('/', (req: Request, res: Response) => {
  res.send(`------ WELCOME TO ENCRYPTION WITH NODE JOSE 🚀 ------`);
});

app.get('/encrypt', async (req: Request, res: Response) => {
  const encrypt = await asymmetricEncryption.encrypt(value)
  res.send(`------ ENCRYPTED ${encrypt} ------`);
});

app.get('/decrypt', async (req: Request, res: Response) => {
  const { value } = req.query;
  const decrypt = await asymmetricEncryption.decrypt<string>(value as string)
  res.send(`------ DECRYPTED ${decrypt} ------`);
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});