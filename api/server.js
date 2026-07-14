const path = require('path');
const jsonServer = require('json-server');

const server = jsonServer.create();
const dbPath = path.join(__dirname, '..', 'db.json');
const router = jsonServer.router(dbPath);
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3500;

server.use(middlewares);
server.use(router);

server.listen(port, '0.0.0.0', () => {
  console.log(`JSON Server running on port ${port}`);
  console.log(`Serving data from ${dbPath}`);
});
