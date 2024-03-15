const createDatabase = require('./createDatabase.js');
const { createTables } = require('./createTables.js');
const associateTables = require('./associateTables.js');

(async function main() {
  try {
    await createDatabase();
    await createTables();
    await associateTables();
  } catch (error) {
    console.error('An error initializing the database:', error);
  }
})();