require('dotenv').config();
const { Sequelize } = require('sequelize');

const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelAccess = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@localhost:${DB_HOST}`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});

(async function deleteDatabase() {
  try {
    const query = `DROP DATABASE IF EXISTS dogs;`;
    await sequelAccess.query(query, { raw: true });
    console.log('Database "dogs" deleted.');
    return true;
  } catch (error) {
    console.error('Error deleting database dogs:', error);
    return false;
  }
})();