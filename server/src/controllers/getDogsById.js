const axios = require('axios');
const { Dog, Temperament, apiKey } = require('../db.js');

async function getDogsById(request, response) {
  try {
    const { id } = request.params;
    const { data } = await axios(`https://api.thedogapi.com/v1/breeds/${id}?api_key=${apiKey}`);
    const userDog = await Dog.findByPk(id, { include: Temperament });
    if (data) {
      const { name, bred_for, breed_group, life_span, temperament, origin, weight, height, reference_image_id } = data;
      const metricWeight = weight.metric;
      const imperialWeight = weight.imperial;
      const metricHeight = height.metric;
      const imperialHeight = height.imperial;
      const imageUrl = `https://cdn2.thedogapi.com/images/${reference_image_id}.jpg`;
      let temperamentArray = temperament ? temperament.split(", ") : [];
      temperamentArray = temperamentArray.map(item => item === 'Hard-working' ? 'Hardworking' : item);
      const temperaments = await Dog.findByPk(id, {
        attributes: [],
        include: {
          model: Temperament
        }
      });
      const dog = {
        name: name,
        bredFor: bred_for || null,
        breedGroup: breed_group || null,
        lifeSpan: life_span || null,
        temperament: temperamentArray || null,
        origin: origin || null,
        metricWeightString: (metricWeight + ' kg') || null,
        imperialWeightString: (imperialWeight + ' lb') || null,
        metricHeightString: (metricHeight + ' cm') || null,
        imperialHeightString: (imperialHeight + ' in') || null,
        image: imageUrl || null,
        source: 'API',
        temperaments: temperaments.temperaments
      }
      return response.status(200).json(dog);
    } else if (userDog) {
      return response.status(200).json(userDog);
    } else {
      response.status(404).send('No dog was found with that id');
    }
  } catch (error) {
    response.status(500).send({error, message: 'Error at searching dog by id'});
  }
}

module.exports = getDogsById;
