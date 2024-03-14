const { Dog, Temperament } = require('../db.js');

async function getDogsById(request, response) {
  try {
    const { id } = request.params;
    const foundDog = await Dog.findByPk(id, { include: Temperament });
    if (foundDog) {
      return response.status(200).json(foundDog);
    } else {
      response.status(404).send('No dog was found with that id');
    }
  } catch (error) {
    console.error(error);
    response.status(500).send({ error, message: 'Error at searching dog by id' });
  }
}

module.exports = getDogsById;
