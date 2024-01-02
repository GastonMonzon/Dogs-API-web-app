const { Op } = require('sequelize');
const { Dog } = require('../db.js');

async function getDogsByExactName(request, response) {
  try {
    const { name } = request.query;
    const dog = await Dog.findAll({
      where: {
        name: { [Op.iLike]: name } // Search for exact case-insensitive match
      }
    });
    if (dog.length === 0) {
      return response.status(404).send({ message: 'No dog was found with that name' });
    }
    response.status(200).json(dog);
  } catch (error) {
    response.status(500).send({ error, message: 'Error at searching dog by exact name'});
  }
}

module.exports = getDogsByExactName;