import path from 'path';
import { fileURLToPath } from 'url';
import { showLocalNetworkIP } from './shownet.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 8080;
showLocalNetworkIP(PORT);

import fastify from 'fastify';

const app = fastify({
  logger: false,
});

import fastifyStatic from '@fastify/static';

app.register(fastifyStatic.default, {
  root: path.join(__dirname, 'public'),
});

app.get('/register', (req, res) => {
  res.sendFile('index.html');
});

const start = async () => {
  try {
    await app.listen({ port: PORT, host: '::' });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
start();
