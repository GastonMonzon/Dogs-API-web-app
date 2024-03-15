require('dotenv').config();
const server = require('./src/app.js');
const { conn } = require('./src/db.js');

const port = process.env.PORT || 3000;

conn.sync({ alter: true })
  .then(() => {
    server.listen(port, "0.0.0.0", () => {
      console.log(`Server listening on port ${port}`);
    })
  })
  .catch(error => console.error(error));
