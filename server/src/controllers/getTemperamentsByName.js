const { Op } = require('sequelize');
const { Temperament } = require('../db.js');

async function getTemperamentsByName(request, response) {
  try {
    const { name } = request.query;
    const temperaments = await Temperament.findAll({
      where: {
        name: { [Op.iLike]: `%${name}%` } // Search for case-insensitive match
      }
    });
    response.status(200).json(temperaments);
  } catch (error) {
    response.status(404).send({ error, message: 'Error at searching temperaments by name'});
  }
}

module.exports = getTemperamentsByName;