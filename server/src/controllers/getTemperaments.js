const { Temperament } = require('../db.js');

async function getTemperaments(request, response) {
  try {
    const temperaments = await Temperament.findAll();
    response.json(temperaments);
  } catch (error) {
    console.error(error);
    response.status(404).send({ error, message: 'Error at obtaining all temperaments' });
  }
}

module.exports = getTemperaments;
