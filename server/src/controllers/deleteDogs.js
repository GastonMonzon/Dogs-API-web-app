const { Op } = require('sequelize');
const { Dog } = require('../db.js');

async function deleteDogs(request, response) {
  try {
    const { name } = request.query;
    const deletedCount = await Dog.destroy({
      where: {
        name: { [Op.iLike]: name }
      }
    });
    if (deletedCount === 0) {
      return response.status(404).send({ message: 'No dog was found with that name' });
    }
    response.status(200).send({ deletedCount, message: 'Dog deleted successfully' });
  } catch (error) {
    response.status(500).send({ error, message: 'Error at deleating dog' });
  }
}

module.exports = deleteDogs;
