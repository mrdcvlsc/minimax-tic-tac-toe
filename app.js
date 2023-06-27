const path = require('path');
const fastify = require('fastify')({
  logger: true
});

const fastifyStatic = require('@fastify/static');

fastify.register(fastifyStatic.default, {
  root: path.join(__dirname, 'public')
});

fastify.get('/register', (req,res) => {
  res.sendFile('index.html');
});

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await fastify.listen({port: PORT, host:'::'});
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}
start();