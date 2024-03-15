require('dotenv').config();
const { Sequelize } = require('sequelize');

const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelAccess = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@localhost:${DB_HOST}`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});

async function checkDatabaseExists() {
  try {
    const query = `SELECT 1 FROM pg_database WHERE datname = 'dogs';`;
    const result = await sequelAccess.query(query, { raw: true });
    return result[0].length > 0;
  } catch (error) {
    console.error('Error checking database existence:', error);
    return false;
  }
}
async function createDatabase() {
  try {
    const databaseExists = await checkDatabaseExists();
    if (databaseExists) {
      console.log('Database already exists.');
    } else {
      await sequelAccess.query(`CREATE DATABASE dogs;`);
      console.log('Database created successfully.');
    }
  } catch (error) {
    console.error('Error creating database:', error);
  }
}

module.exports = createDatabase;
