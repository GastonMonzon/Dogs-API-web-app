const axios = require('axios');
const { Op } = require('sequelize');
const { Dog, apiKey } = require('../db.js');

async function getDogsByName(request, response) {
  try {
    const { name } = request.query;
    const dogs = await Dog.findAll({
      where: {
        name: { [Op.iLike]: `%${name}%` } // Search for case-insensitive match
      }
    });
    response.status(200).json(dogs);
  } catch (error) {
    console.error(error);
    response.status(500).send('Error at searching dogs by name');
  }
}

module.exports = getDogsByName;