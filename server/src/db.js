require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { DB_USER, DB_PASSWORD, DB_HOST, API_KEY } = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@localhost:${DB_HOST}/dogs`, {
  logging: false,
  native: false,
});

const basename = path.basename(__filename);
const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

const { Dog, Temperament } = sequelize.models;

Dog.belongsToMany(Temperament, { through: 'Dog_temperament' });
Temperament.belongsToMany(Dog, { through: 'Dog_temperament' });

(async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();
(async function createTables() {
  try {
    await sequelize.sync();
    console.log('Tables created successfully.');
    const dogCount = await Dog.count();
    const temperamentCount = await Temperament.count();
    if (dogCount === 0 && temperamentCount === 0) {
      await populateTables();
      console.log('Tables populated successfully.');
    } else {
      console.log('Tables are not empty. Skipping population.');
    }
  } catch (error) {
    console.error('Error creating tables:', error);
  }
})();
async function populateTables() {
  try {
    const { data } = await axios(`https://api.thedogapi.com/v1/breeds/?api_key=${API_KEY}`);
    const temperaments = [];
    data.forEach((dog) => {
      const { id, name, bred_for, breed_group, life_span, temperament, origin, weight, height, image } = dog;
      const lifeSpanArray = life_span.match(/\d+/g);

      let metricWeightString;
      const metricWeightRange = weight.metric.match(/(\d+(\.\d+)?)/g);
      let metricWeightArray = metricWeightRange?.map(Number);
      if (metricWeightArray?.length === 1) {
        metricWeightString = toString(metricWeightArray[0]);
      } else {
        metricWeightString = weight.metric;
      }

      const imperialWeightString = weight.imperial;
      const imperialWeightRange = weight.imperial.match(/(\d+(\.\d+)?)/g);
      const imperialWeightArray = imperialWeightRange?.map(Number);

      const metricHeightString = height.metric;
      const metricHeightRange = height.metric.match(/(\d+(\.\d+)?)/g);
      const metricHeightArray = metricHeightRange?.map(Number);

      const imperialHeightString = height.imperial;
      const imperialHeightRange = height.imperial.match(/(\d+(\.\d+)?)/g);
      const imperialHeightArray = imperialHeightRange?.map(Number);

      if (!metricWeightRange) {
        metricWeightString = imperialWeightRange?.map(weight => Math.ceil(Number(weight) * 0.453592))[0];
        metricWeightArray = imperialWeightRange?.map(weight => Math.ceil(Number(weight) * 0.453592));
      }
      const imageUrl = image.url;

      let temperamentArray = temperament ? temperament.split(", ") : [];
      temperamentArray = temperamentArray.map(item => item === 'Hard-working' ? 'Hardworking' : item);
      temperamentArray.forEach((temp) => {
        if (!temperaments.includes(temp)) temperaments.push(temp);
      })
      Dog.create({
        id: id,
        name: name,
        bredFor: bred_for || null,
        breedGroup: breed_group || null,
        lifeSpanString: life_span || null,
        minlifeSpan: lifeSpanArray[0] || null,
        maxlifeSpan: lifeSpanArray[1] || lifeSpanArray[0] || null,
        temperament: temperamentArray || null,
        origin: origin || null,
        metricWeightString: (metricWeightString + ' kg') || null,
        minMetricWeight: metricWeightArray[0] || null,
        maxMetricWeight: metricWeightArray[1] || metricWeightArray[0] || null,
        imperialWeightString: (imperialWeightString + ' lb') || null,
        minImperialWeight: imperialWeightArray[0] || null,
        maxImperialWeight: imperialWeightArray[1] || imperialWeightArray[0] || null,
        metricHeightString: (metricHeightString + ' cm') || null,
        minMetricHeight: metricHeightArray[0] || null,
        maxMetricHeight: metricHeightArray[1] || metricHeightArray[0] || null,
        imperialHeightString: (imperialHeightString + ' in') || null,
        minImperialHeight: imperialHeightArray[0] || null,
        maxImperialHeight: imperialHeightArray[1] || imperialHeightArray[0] || null,
        image: imageUrl || null,
        source: 'API'
      });
    });
    temperaments.forEach(temp => {
      Temperament.create({
        name: temp
      })
    });
  } catch (error) {
    console.error('Error obtaining data:', error);
  }
}
module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importar la conexión { conn } = require('./db.js');
  apiKey: API_KEY
};
