const { Dog } = require('../db.js');

async function getDogs(request, response) {
  try {
    const dogs = await Dog.findAll();
    response.status(200).json(dogs);
  } catch (error) {
    console.error(error);
    response.status(404).send({error, message: 'Error at obtaining all dogs'});
  }
}

module.exports = getDogs;
