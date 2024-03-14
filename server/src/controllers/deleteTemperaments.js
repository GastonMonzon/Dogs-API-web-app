const { Op } = require('sequelize');
const { Temperament } = require('../db.js');

async function deleteTemperaments(request, response) {
  try {
    const { name } = request.query;
    const deletedCount = await Temperament.destroy({
      where: {
        name: { [Op.iLike]: name }
      }
    });
    if (deletedCount === 0) {
      return response.status(404).send({ message: 'No temperament was found with that name' });
    }
    response.status(200).send({ deletedCount, message: 'temperament deleted successfully' });
  } catch (error) {
    console.error(error);
    response.status(500).send({ error, message: 'Error at deleating temperament' });
  }
}

module.exports = deleteTemperaments;
