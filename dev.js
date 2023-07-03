/** This file is only added to run a development static server. */

import path from 'path';
import { fileURLToPath } from 'url';
import os from 'os';
import fastify from 'fastify';
import fastifyStatic from '@fastify/static';

const networkInterfaces = os.networkInterfaces();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 3000;
const app = fastify({
  logger: false,
});

app.register(fastifyStatic.default, {
  root: path.join(__dirname, 'lib'),
});

app.get('/register', (req, res) => {
  res.sendFile('index.html');
});

start();
showlocalNetAddress(PORT);

function showlocalNetAddress(PORT) {
  console.log(`local   : localhost:${PORT}/`);

  const localNetAddress =
    networkInterfaces?.wlp2s0?.[0]?.address ||
    networkInterfaces?.enp3s0f1?.[0]?.address ||
    networkInterfaces?.['Wi-Fi']?.[1]?.address ||
    networkInterfaces?.Ethernet?.[1]?.address ||
    null;
  
  if (localNetAddress) {
    console.log(`network : ${localNetAddress}:${PORT}/`);
  } else {
    console.log('network : Not Available');
  }
}

async function start () {
  try {
    await app.listen({ port: PORT, host: '::' });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
